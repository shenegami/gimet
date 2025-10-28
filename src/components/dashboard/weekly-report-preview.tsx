import { Report } from "@/src/lib/types";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface WeeklyReportPreviewProps {
  report: Report;
}

export function WeeklyReportPreview({ report }: WeeklyReportPreviewProps) {
  return (
    <section className="rounded-2xl bg-gradient-to-b from-white to-brand-subtle p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">ملخص أسبوعي جاهز</h3>
          <p className="text-sm text-slate-500">
            الأسبوع المنتهي في {format(new Date(report.weekOf), "d MMMM", { locale: ar })}
          </p>
        </div>
        <span className="rounded-full bg-brand text-xs font-semibold text-white px-3 py-1">PDF</span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-700">{report.summary}</p>
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <p className="font-semibold text-slate-800">أبرز الإنجازات</p>
          <ul className="mt-2 list-disc space-y-1 pr-5 text-slate-600">
            {report.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-slate-800">المخاطر</p>
          <ul className="mt-2 list-disc space-y-1 pr-5 text-rose-600">
            {report.risks.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
