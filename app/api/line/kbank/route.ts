/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

// ฟังก์ชันแปลง ALT_TEXT → Object
function parseAltText(text: string, index: number) {
  const match = text.match(
    /เข้าบัญชี (.+) วันที่ (.+) เวลา (.+) จำนวนเงิน ([\d,]+\.\d+)  บาท ยอดเงินคงเหลือ ([\d,]+\.\d+)  บาท/
  );
  if (!match) return null;

  return {
    transactionid: String(Date.now()) + index,
    bank_sender: match[1],
    amount: match[4].replace(/,/g, ""),
    status: "เงินเข้า",
    timestamp: String(Date.now()), // mock ไปก่อน
    time: `${match[2]} ${match[3]}`,
  };
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

    if (!user || !user.points || user.points.toNumber() < 0.5) {
      return NextResponse.json(
        { status: "failed", msg: "ยอดเงินไม่เพียงพอ" },
        { status: 400 }
      );
    }

    if (!account || !xkey) {
      return NextResponse.json(
        { status: "failed", msg: "ข้อมูลไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    if (!user.hmac || !user.line_access_token || !user.body_token) {
      return NextResponse.json(
        { status: "failed", msg: "ข้อมูลการเชื่อมต่อไม่ครบถ้วน" },
        { status: 400 }
      );
    }

    // 🔹 fetch จาก LINE API
    const response = await fetch(
      "https://line-chrome-gw.line-apps.com/api/talk/thrift/Talk/TalkService/getRecentMessagesV2",
      {
        method: "POST",
        headers: {
          accept: "application/json, text/plain, */*",
          "content-type": "application/json",
          "x-hmac": user.hmac,
          "x-lal": "en_US",
          "x-line-access": user.line_access_token,
          "x-line-chrome-version": "3.7.1",
        },
        body: JSON.stringify([user.body_token, 50]),
      }
    );

    const json = await response.json();
    console.log(user);
    console.log(json);

    // 🔹 ดึง ALT_TEXT ที่เป็น "รายการเงินเข้า"
    const result = (json.data ?? [])
      .map((item: any) => item.contentMetadata?.ALT_TEXT)
      .filter((text: string) => text && text.startsWith("รายการเงินเข้า"));

    const parsed = result
      .map((t: string, i: number) => parseAltText(t, i))
      .filter(Boolean);

    if (parsed.length === 0) {
      return NextResponse.json(
        { status: "failed", msg: "ไม่พบรายการเงินเข้า" },
        { status: 404 }
      );
    }

    await prisma.line_Noti_API.update({
      where: { id: user.id },
      data: {
        points: {
          decrement: 0.5, // ลดลง 0.5
        },
      },
    });

    return NextResponse.json({ status: "success", data: parsed });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: "error", message: "Failed to fetch ALT_TEXT transactions" },
      { status: 500 }
    );
  }
}
