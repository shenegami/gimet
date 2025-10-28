export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">الإعدادات</h1>
        <p className="text-sm text-slate-500">قم بتحديث صلاحيات المستخدمين ومفاتيح واجهات البرمجة.</p>
      </header>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">أدوار المستخدمين</h2>
        <p className="mt-2 text-sm text-slate-600">
          يدعم النظام أدوار المشرف (Admin) ومدير المشاريع (Manager) والمتابع (Viewer). يمكن إدارة هذه الأدوار عبر Supabase
          Auth.
        </p>
      </section>
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
        <h2 className="text-lg font-semibold text-slate-900">مفاتيح التكامل</h2>
        <p className="mt-2 text-sm text-slate-600">
          أضف قيم <code className="rounded bg-slate-100 px-1">OPENAI_API_KEY</code> و
          <code className="rounded bg-slate-100 px-1">NEXT_PUBLIC_SUPABASE_URL</code> في ملف البيئة لتفعيل التكامل الكامل.
        </p>
      </section>
    </div>
  );
}
