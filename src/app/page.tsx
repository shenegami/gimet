import { Suspense } from "react";
import { Overview } from "@/src/components/dashboard/overview";
import { ProjectStatusGrid } from "@/src/components/dashboard/project-status-grid";
import { AISupervisorPanel } from "@/src/components/ai/ai-supervisor-panel";
import { NotificationsPanel } from "@/src/components/dashboard/notifications-panel";
import { WeeklyReportPreview } from "@/src/components/dashboard/weekly-report-preview";
import { getDemoWorkspace } from "@/src/lib/demo-data";

export default async function DashboardPage() {
  const workspace = await getDemoWorkspace();
  return (
    <div className="grid gap-6 xl:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <Overview metrics={workspace.metrics} />
        <ProjectStatusGrid projects={workspace.projects} />
        <Suspense fallback={<div className="rounded-lg bg-white p-6 shadow">يتم تحميل المساعد...</div>}>
          <AISupervisorPanel workspace={workspace} />
        </Suspense>
      </div>
      <div className="space-y-6">
        <NotificationsPanel notifications={workspace.notifications} />
        <WeeklyReportPreview report={workspace.reports[0]} />
      </div>
    </div>
  );
}
