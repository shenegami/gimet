import { NotificationItem } from "@/src/lib/types";
import { AlertCircle, Info, OctagonAlert } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface NotificationsPanelProps {
  notifications: NotificationItem[];
}

const severityIcon = {
  info: Info,
  warning: AlertCircle,
  critical: OctagonAlert
};

const severityStyles = {
  info: "bg-blue-50 text-blue-600",
  warning: "bg-amber-50 text-amber-600",
  critical: "bg-rose-50 text-rose-600"
};

export function NotificationsPanel({ notifications }: NotificationsPanelProps) {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">تنبيهات المشرف</h3>
          <p className="text-sm text-slate-500">رسائل ذكية بناءً على نشاط المشاريع</p>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {notifications.map((notification) => {
          const Icon = severityIcon[notification.severity];
          return (
            <article
              key={notification.id}
              className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50/40 p-4"
            >
              <div className={`rounded-full p-2 ${severityStyles[notification.severity]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-slate-900">{notification.title}</h4>
                <p className="text-sm text-slate-600">{notification.description}</p>
                <p className="text-xs text-slate-400">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    locale: ar,
                    addSuffix: true
                  })}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
