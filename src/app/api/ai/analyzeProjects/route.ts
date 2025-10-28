import { NextResponse } from "next/server";
import { getDemoWorkspace } from "@/src/lib/demo-data";
import { sleep } from "@/src/lib/utils";

export async function POST() {
  const workspace = await getDemoWorkspace();
  await sleep(500);
  const recalculatedInsights = workspace.projects.map((project) => {
    const trend = project.progress >= 0.6 ? "تقدم جيد" : project.progress >= 0.4 ? "يحتاج دعم" : "خطر";
    return {
      id: `risk-${project.id}`,
      type: project.status === "on-track" ? "summary" : "risk",
      title: `تقييم ${project.name}`,
      description: `المشروع ${trend} بمعدل إنجاز ${Math.round(project.progress * 100)}% وموعد تسليم ${new Date(
        project.dueDate
      ).toLocaleDateString("ar-EG")}.`
    };
  });

  return NextResponse.json({ insights: recalculatedInsights });
}
