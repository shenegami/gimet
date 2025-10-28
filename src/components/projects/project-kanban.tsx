"use client";

import { useMemo, useState } from "react";
import { Project } from "@/src/lib/types";
import { formatPercent } from "@/src/lib/utils";
import { Dialog } from "./project-modal";

interface ProjectKanbanProps {
  projects: Project[];
}

const columnLabels: Record<Project["status"], string> = {
  "on-track": "على المسار",
  "at-risk": "معرّض للخطر",
  delayed: "متأخر"
};

export function ProjectKanban({ projects }: ProjectKanbanProps) {
  const grouped = useMemo(() => {
    return projects.reduce<Record<Project["status"], Project[]>>(
      (acc, project) => {
        acc[project.status] = [...acc[project.status], project];
        return acc;
      },
      { "on-track": [], "at-risk": [], delayed: [] }
    );
  }, [projects]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {(Object.keys(grouped) as Project["status"][]).map((status) => (
        <div key={status} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">{columnLabels[status]}</h3>
            <span className="text-xs text-slate-400">{grouped[status].length} مشروع</span>
          </div>
          <div className="mt-3 space-y-3">
            {grouped[status].map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-start transition hover:-translate-y-0.5 hover:border-brand hover:bg-white"
              >
                <p className="text-sm font-semibold text-slate-900">{project.name}</p>
                <p className="mt-1 text-xs text-slate-500">التقدم {formatPercent(project.progress)}</p>
              </button>
            ))}
          </div>
        </div>
      ))}
      {selectedProject && <Dialog project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
}
