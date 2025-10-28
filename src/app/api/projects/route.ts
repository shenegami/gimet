import { NextResponse } from "next/server";
import { sleep } from "@/src/lib/utils";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Received project payload", body);
  await sleep(600);
  return NextResponse.json({ status: "ok" });
}

export async function GET() {
  return NextResponse.json({ message: "استخدم Supabase لاسترجاع المشاريع في بيئة الإنتاج." });
}
