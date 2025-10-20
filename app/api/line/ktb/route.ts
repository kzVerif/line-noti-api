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

    // ❌ ถ้า LINE ไม่ตอบกลับปกติ เช่น 401, 403, 500
    if (!response.ok) {
      throw new Error("LINE API Error");
    }

    const json: LineApiResponse = await response.json();

    // ❌ ถ้าไม่มี field data หรือโครงสร้างไม่ตรง
    if (!json || !Array.isArray(json.data)) {
      throw new Error("Invalid HAR data");
    }

    const messages = json.data ?? [];

    return messages
      .map((msg) => parseTransaction(msg))
      .filter((t): t is LineTransaction => !!t);
  } catch (err) {
    console.error("Fetch error:", err);
    // ✅ เมื่อ error — return array ว่าง เพื่อให้ POST ตรวจเจอและตอบกลับ error
    return [];
  }
}

function parseTransaction(msg: LineMessage): LineTransaction | null {
  const flex = msg.contentMetadata?.FLEX_JSON;
  if (!flex) return null;

  const { amount, status, bankSender } = extractDataFromFlexJson(flex);

  if (!amount || !status || !bankSender) return null;

  return {
    transactionid: msg.id,
    bank_sender: bankSender,
    amount,
    status: status as "เงินเข้า" | "เงินออก",
    timestamp: msg.createdTime,
    time: String(msg.createdTime),
  };
}

function extractDataFromFlexJson(flexJson: string): {
  amount: string;
  status: string;
  bankSender: string;
} {
  const json = JSON.parse(flexJson);
  const contents: FlexContentItem[] = json.body.contents;

  let amount = "";
  let status = "";
  let bankSender = "";

  for (const item of contents) {
    if (item.layout === "horizontal") {
      const firstText = item.contents?.[0]?.text;
      const second = item.contents?.[1]?.contents?.[0]?.text;

      if (firstText === "เงินเข้า" || firstText === "เงินออก") {
        status = firstText;
        amount = second?.replace("+", "").replace("-", "") ?? "";
      }
    }

    if (item.layout === "baseline") {
      const [label, value] = item.contents ?? [];
      const labelText = label?.text?.trim();
      const valueText = value?.text?.trim();

      if (labelText === "จากบัญชี" && valueText) {
        bankSender = valueText;
      }
    }
  }

  return { amount, status, bankSender };
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
