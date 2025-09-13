
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ✅ GET /api/line/balance/[id]
// @ts-ignore
export async function GET(
  req: Request,
  context: { params: { id: string } }   // 👈 ต้องเป็น context แบบนี้
) {
  const { id } = context.params;

  try {
    const user = await prisma.line_Noti_API.findUnique({
      where: { id: Number(id) },
      select: { id: true, name: true, points: true },
    });

    if (!user) {
      return NextResponse.json(
        { status: "failed", msg: "ไม่พบผู้ใช้งาน" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: "success",
        balance: user.points?.toNumber() ?? 0,
        user: {
          id: user.id,
          name: user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET Balance Error:", error);
    return NextResponse.json(
      { status: "error", msg: "ไม่สามารถตรวจสอบยอดเงินได้" },
      { status: 500 }
    );
  }
}
