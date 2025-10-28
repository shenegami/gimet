"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, FolderKanban, FileText, Bell, Settings } from "lucide-react";
import { cn } from "@/src/lib/utils";

const links = [
  { href: "/", label: "لوحة القيادة", icon: BarChart3 },
  { href: "/projects", label: "المشاريع", icon: FolderKanban },
  { href: "/reports", label: "التقارير", icon: FileText },
  { href: "/notifications", label: "التنبيهات", icon: Bell },
  { href: "/settings", label: "الإعدادات", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-72 flex-col border-l border-slate-200 bg-white/90 p-6 shadow-sm lg:flex">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wide text-slate-400">Omni Supervisor</span>
        <h1 className="text-2xl font-bold text-slate-900">المشرف الذكي</h1>
        <p className="mt-1 text-sm text-slate-500">إدارة ذكية لمشاريعك بواسطة الذكاء الاصطناعي</p>
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-brand-subtle text-brand-bold"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 rounded-lg bg-slate-100 p-4 text-sm text-slate-600">
        <p className="font-semibold text-slate-800">دعم مباشر</p>
        <p className="mt-1">تواصل مع المشرف الذكي عبر الدردشة للحصول على توجيهات فورية.</p>
      </div>
    </aside>
  );
}
