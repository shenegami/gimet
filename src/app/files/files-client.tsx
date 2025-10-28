"use client";

import { useEffect, useState } from "react";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { getDemoWorkspace } from "@/src/lib/demo-data";
import { FileAttachment } from "@/src/lib/types";

export default function FilesClient() {
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    void getDemoWorkspace().then((workspace) => setFiles(workspace.projects.flatMap((project) => project.files)));
  }, []);

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
    } finally {
      setIsUploading(false);
    }
  }

  function handleDelete(id: string) {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">إدارة الملفات</h1>
        <p className="text-sm text-slate-500">ارفع المرفقات وسيتم حفظها في Supabase Storage.</p>
      </header>
      <form
        onSubmit={handleUpload}
        className="rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-center text-sm text-slate-500"
      >
        <Upload className="mx-auto mb-3 h-8 w-8 text-brand" />
        <p>اسحب الملفات أو اخترها من جهازك.</p>
        <button
          type="submit"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-bold"
          disabled={isUploading}
        >
          {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          رفع الملفات
        </button>
      </form>
      <section className="space-y-3">
        {files.map((file) => (
          <article
            key={file.id}
            className="flex items-center justify-between rounded-xl bg-white p-4 text-sm shadow-sm ring-1 ring-slate-100"
          >
            <div>
              <p className="font-semibold text-slate-800">{file.name}</p>
              <p className="text-xs text-slate-400">
                {new Date(file.uploadedAt).toLocaleDateString("ar-EG")} · {(file.size / 1024).toFixed(1)} كيلوبايت
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a href={file.url} className="text-sm text-brand hover:underline" target="_blank" rel="noreferrer">
                عرض
              </a>
              <button onClick={() => handleDelete(file.id)} className="text-rose-500 hover:text-rose-700">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
        {files.length === 0 && <p className="text-center text-sm text-slate-500">لا توجد ملفات معروضة حاليًا.</p>}
      </section>
    </div>
  );
}
