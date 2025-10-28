"use client";

import { BellDot, CircleUserRound } from "lucide-react";

export function TopBar() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white/80 px-6 py-4 backdrop-blur">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">مرحبًا بك في المشرف الذكي</h2>
        <p className="text-sm text-slate-500">يتابع الذكاء الاصطناعي كل تفاصيل مشاريعك.</p>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200">
          <BellDot className="h-5 w-5" />
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-rose-500" />
        </button>
        <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
          <CircleUserRound className="h-6 w-6 text-slate-500" />
          <div className="text-sm">
            <p className="font-semibold text-slate-800">ليان السالم</p>
            <p className="text-slate-500">مديرة العمليات</p>
          </div>
        </div>
      </div>
    </header>
  );
}
