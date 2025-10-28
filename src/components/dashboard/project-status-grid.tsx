import { Project } from "@/src/lib/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { formatPercent } from "@/src/lib/utils";

interface ProjectStatusGridProps {
  projects: Project[];
}

const statusStyles: Record<Project["status"], string> = {
  "on-track": "bg-emerald-50 text-emerald-600",
  "at-risk": "bg-amber-50 text-amber-600",
  delayed: "bg-rose-50 text-rose-600"
};

export function ProjectStatusGrid({ projects }: ProjectStatusGridProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">حالة المشاريع</h3>
          <p className="text-sm text-slate-500">ملخص سريع عن تقدم المبادرات الاستراتيجية</p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <article key={project.id} className="rounded-xl border border-slate-100 bg-slate-50/50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-semibold text-slate-900">{project.name}</h4>
                <p className="text-sm text-slate-500">
                  تسليم: {format(new Date(project.dueDate), "d MMMM", { locale: ar })}
                </p>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[project.status]}`}>
                {project.status === "on-track"
                  ? "على المسار"
                  : project.status === "at-risk"
                  ? "معرّض للخطر"
                  : "متأخر"}
              </span>
            </div>
            <p className="mt-3 text-sm text-slate-600">{project.summary}</p>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-700">التقدم</span>
              <span className="font-semibold text-slate-900">{formatPercent(project.progress)}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-brand"
                style={{ width: `${Math.round(project.progress * 100)}%` }}
              />
            </div>
            {project.issues.length > 0 && (
              <ul className="mt-4 space-y-2 text-sm text-rose-600">
                {project.issues.map((issue) => (
                  <li key={issue} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
