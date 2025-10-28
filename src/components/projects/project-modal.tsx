"use client";

import { useMemo } from "react";
import { Project } from "@/src/lib/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { formatPercent } from "@/src/lib/utils";

interface DialogProps {
  project: Project;
  onClose: () => void;
}

export function Dialog({ project, onClose }: DialogProps) {
  const dueDate = useMemo(() => format(new Date(project.dueDate), "d MMMM yyyy", { locale: ar }), [project.dueDate]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 p-4">
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
            <p className="text-sm text-slate-500">تاريخ التسليم {dueDate}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 transition hover:text-slate-600">
            إغلاق
          </button>
        </div>
        <p className="mt-4 text-sm text-slate-600">{project.summary}</p>
        <div className="mt-4 rounded-xl bg-slate-50 p-4 text-sm">
          <p className="font-semibold text-slate-800">التقدم</p>
          <div className="mt-2 flex items-center justify-between">
            <span>مستوى الإنجاز</span>
            <span className="font-semibold">{formatPercent(project.progress)}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-brand" style={{ width: `${Math.round(project.progress * 100)}%` }} />
          </div>
        </div>
        {project.issues.length > 0 && (
          <div className="mt-4 rounded-xl border border-rose-100 bg-rose-50/60 p-4 text-sm text-rose-700">
            <p className="font-semibold">التحديات الحالية</p>
            <ul className="mt-2 space-y-2">
              {project.issues.map((issue) => (
                <li key={issue} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-rose-500" />
                  <span>{issue}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {project.files.length > 0 && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-800">الملفات المرفقة</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {project.files.map((file) => (
                <li key={file.id} className="flex items-center justify-between">
                  <span>{file.name}</span>
                  <a href={file.url} className="text-brand hover:underline" target="_blank" rel="noreferrer">
                    عرض
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
