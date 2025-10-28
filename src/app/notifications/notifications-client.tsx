"use client";

import { useEffect, useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import { NotificationItem } from "@/src/lib/types";
import { getDemoWorkspace } from "@/src/lib/demo-data";

export default function NotificationsClient() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    void getDemoWorkspace().then((workspace) => setNotifications(workspace.notifications));
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">لوحة التنبيهات</h1>
          <p className="text-sm text-slate-500">المشرف الذكي يرسل تنبيهات ذكية عندما تنحرف المشاريع عن الخطة.</p>
        </div>
        <button
          onClick={() => setNotifications([])}
          className="inline-flex items-center gap-2 rounded-lg bg-slate-100 px-4 py-2 text-sm text-slate-600 hover:bg-slate-200"
        >
          <CheckCircle2 className="h-4 w-4" /> تعيين كمقروء
        </button>
      </header>
      <section className="space-y-4">
        {notifications.map((notification) => (
          <article key={notification.id} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-brand-subtle p-3 text-brand">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-900">{notification.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{notification.description}</p>
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(notification.createdAt).toLocaleString("ar-EG", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              </div>
            </div>
          </article>
        ))}
        {notifications.length === 0 && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500">
            لا توجد تنبيهات جديدة.
          </div>
        )}
      </section>
    </div>
  );
}
