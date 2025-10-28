import { NextResponse } from "next/server";
import { getDemoWorkspace } from "@/src/lib/demo-data";
import { sleep } from "@/src/lib/utils";

export async function POST() {
  const workspace = await getDemoWorkspace();
  await sleep(500);
  const report = workspace.reports[0];
  const markdown = [`# تقرير المشرف الذكي`, `الأسبوع المنتهي في ${new Date(report.weekOf).toLocaleDateString("ar-EG")}`, "\n## ملخص", report.summary, "\n## إنجازات", ...report.highlights.map((item) => `- ${item}`), "\n## المخاطر", ...report.risks.map((item) => `- ${item}`), "\n## التوصيات", ...report.recommendations.map((item) => `- ${item}`)].join("\n");
  return NextResponse.json({ format: "markdown", content: markdown });
}
