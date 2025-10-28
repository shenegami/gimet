import { NextResponse } from "next/server";
import { getDemoWorkspace } from "@/src/lib/demo-data";
import { sleep } from "@/src/lib/utils";

const fallback = "لا يوجد رد متاح حاليًا.";

export async function POST(request: Request) {
  const workspace = await getDemoWorkspace();
  const { question } = await request.json();
  await sleep(400);
  const normalizedQuestion: string = question?.toString()?.toLowerCase() ?? "";

  if (normalizedQuestion.includes("متأخر") || normalizedQuestion.includes("delayed")) {
    const delayed = workspace.projects.filter((project) => project.status === "delayed");
    if (delayed.length === 0) {
      return NextResponse.json({ answer: "لا توجد مشاريع متأخرة حاليًا." });
    }
    const summary = delayed
      .map((project) => `${project.name} متأخر بموعد تسليم ${new Date(project.dueDate).toLocaleDateString("ar-EG")}`)
      .join("\n");
    return NextResponse.json({ answer: summary });
  }

  if (normalizedQuestion.includes("ملخص") || normalizedQuestion.includes("summary")) {
    const highlights = workspace.reports[0]?.highlights.join("\n - ") ?? "";
    return NextResponse.json({
      answer: `أبرز المستجدات:\n - ${highlights}\nنسبة الإنجاز الكلية ${Math.round(
        workspace.metrics.completionRate * 100
      )}%`
    });
  }

  return NextResponse.json({ answer: fallback });
}
