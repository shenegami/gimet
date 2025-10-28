import { LucideIcon, Sparkles, Target, ClipboardList } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  accent: string;
}

function MetricCard({ title, value, change, icon: Icon, accent }: MetricCardProps) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
        <p className="mt-1 text-sm text-slate-400">{change}</p>
      </div>
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${accent}`}>
        <Icon className="h-6 w-6" />
      </div>
    </div>
  );
}

interface OverviewProps {
  metrics: {
    totalProjects: number;
    activeAlerts: number;
    completionRate: number;
    aiReports: number;
  };
}

export function Overview({ metrics }: OverviewProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="إجمالي المشاريع"
        value={`${metrics.totalProjects}`}
        change="+2 هذا الشهر"
        icon={ClipboardList}
        accent="bg-brand-subtle text-brand-bold"
      />
      <MetricCard
        title="التقارير الذكية"
        value={`${metrics.aiReports}`}
        change="آخر تقرير منذ يوم"
        icon={Sparkles}
        accent="bg-indigo-100 text-indigo-600"
      />
      <MetricCard
        title="نسبة الإنجاز"
        value={`${Math.round(metrics.completionRate * 100)}%`
        }
        change="+8% عن الأسبوع الماضي"
        icon={Target}
        accent="bg-emerald-100 text-emerald-600"
      />
      <MetricCard
        title="تنبيهات نشطة"
        value={`${metrics.activeAlerts}`}
        change="-1 عن الأسبوع الماضي"
        icon={ClipboardList}
        accent="bg-rose-100 text-rose-600"
      />
    </section>
  );
}
