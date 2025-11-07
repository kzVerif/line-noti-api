import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

// ประเภทของธุรกรรม
interface LineTransaction {
  transactionid: string;
  bank_sender: string;
  amount: string;
  status: "เงินเข้า" | "เงินออก";
  timestamp: number;
  time: string;
}

// Flex message format
interface FlexContentElement {
  text?: string;
  contents?: FlexContentElement[];
}

interface FlexContentItem {
  layout: string;
  contents: FlexContentElement[];
}

interface LineMessage {
  id: string;
  createdTime: number;
  contentMetadata: {
    FLEX_JSON?: string;
  };
}

interface LineApiResponse {
  data: LineMessage[];
}

// ✅ ฟังก์ชันหลัก: ดึงข้อมูลและแปลง
async function fetchLineTransactions(
  hmac: string,
  accessToken: string,
  bodyTokens: (string | number)[]
): Promise<LineTransaction[]> {
  try {
    const response = await fetch(
      "https://line-chrome-gw.line-apps.com/api/talk/thrift/Talk/TalkService/getRecentMessagesV2",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
          "x-hmac": hmac,
          "x-lal": "en_US",
          "x-line-access": accessToken,
          "x-line-chrome-version": "3.7.1",
          cookie: "lct=YOUR_COOKIE",
        },
        body: JSON.stringify(bodyTokens),
      }
    );

    if (!response.ok) {
      throw new Error(`LINE API Error: ${response.status}`);
    }

    const res = await response.json();

    if (!res || !Array.isArray(res.data)) {
      throw new Error("Invalid LINE API response structure");
    }

    const result = res.data
      .map((msg: any) => {
        const meta = msg.contentMetadata;
        const alt = meta?.ALT_TEXT || "";

        // ✅ ดึงยอดเงินจาก ALT_TEXT เช่น “รายการเงินเข้า 50.00 บาท ...”
        const matchAmount = alt.match(/([\d,]+\.\d{2}) บาท/);
        const matchDate = alt.match(
          /วันที่ (\d{2}\/\d{2}\/\d{4}) @(\d{2}:\d{2})/
        );
        const matchAccount = alt.match(/เข้าบัญชี ([A-Z0-9-]+)/);

        if (!matchAmount) return null; // ถ้าไม่พบยอดเงินให้ข้าม

        const timestamp = Number(msg.createdTime);

        return {
          transactionid: msg.id,
          bank_sender: null, // ถ้ามีชื่อผู้โอนใน FLEX_JSON จะ parse เพิ่มได้ภายหลัง
          amount: matchAmount[1].replace(/,/g, ""),
          status: "เงินเข้า",
          timestamp,
          time: matchDate
            ? `${matchDate[1].replace(/\//g, "-")} ${matchDate[2]}:00`
            : new Date(timestamp).toISOString().replace("T", " ").split(".")[0],
        };
      })
      .filter(Boolean);

    return result;
  } catch (err) {
    console.error("Fetch error:", err);
    return [];
  }
}

export async function POST(req: NextRequest) {
  try {
    const { xkey, account } = await req.json();
    const user = await prisma.line_Noti_API.findUnique({
      where: { account: account },
    });

    if (!user) {
      return NextResponse.json(
        { status: "failed", msg: "ไม่พบผู้ใช้" },
        { status: 404 }
      );
    }

    if (user?.xkey !== xkey) {
      return NextResponse.json(
        { status: "failed", msg: "xkey ไม่ถูกต้อง" },
        { status: 404 }
      );
    }

    if (!account || !xkey) {
      return NextResponse.json(
        { status: "failed", msg: "ข้อมูลไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    if (!user || !user.points || user.points.toNumber() < 0.5) {
      return NextResponse.json(
        { status: "failed", msg: "ยอดเงินไม่เพียงพอ" },
        { status: 400 }
      );
    }

    // ✅ Fix: Check for required fields before calling the function
    if (!user.hmac || !user.line_access_token || !user.body_token) {
      return NextResponse.json(
        { status: "failed", msg: "ข้อมูลการเชื่อมต่อไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    const transactions = await fetchLineTransactions(
      user.hmac,
      user.line_access_token,
      [user.body_token, 50]
    );

    // 🔍 ถ้า transactions ว่าง = ดึงข้อมูลจาก LINE ไม่ได้
    if (transactions.length === 0) {
      return NextResponse.json(
        { status: "error", message: "ข้อมูล .har ผิดพลาดกรุณาอัพโหลดใหม่" },
        { status: 400 }
      );
    }

    await prisma.line_Noti_API.update({
      where: { id: user.id },
      data: {
        points: {
          decrement: 0.3, // ลดลง 0.5
        },
      },
    });

    return NextResponse.json({ status: "success", data: transactions });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
