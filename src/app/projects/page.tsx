import { getDemoWorkspace } from "@/src/lib/demo-data";
import { ProjectKanban } from "@/src/components/projects/project-kanban";
import { ProjectEditor } from "@/src/components/projects/project-editor";

export default async function ProjectsPage() {
  const workspace = await getDemoWorkspace();
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">إدارة المشاريع</h1>
          <p className="text-sm text-slate-500">أضف مشاريع جديدة ودع المشرف الذكي يتولى التحليل والمتابعة.</p>
        </div>
        <ProjectEditor members={workspace.members} />
      </header>
      <ProjectKanban projects={workspace.projects} />
    </div>
  );
}
