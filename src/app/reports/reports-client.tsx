"use client";

import { useState } from "react";
import { Loader2, Download } from "lucide-react";
import { getDemoWorkspace } from "@/src/lib/demo-data";
import { Report } from "@/src/lib/types";

export default function ReportsClient() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [content, setContent] = useState<string>("");

  async function handleGenerate() {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai/report", { method: "POST" });
      const data = await response.json();
      setContent(data.content);
      const workspace = await getDemoWorkspace();
      setReport(workspace.reports[0]);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">التقارير الذكية</h1>
        <p className="text-sm text-slate-500">إنشاء تقارير أسبوعية بتنسيق Markdown أو PDF بسهولة.</p>
      </header>
      <button
        onClick={handleGenerate}
        className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-bold"
        disabled={isGenerating}
      >
        {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        توليد تقرير جديد
      </button>
      {content && report && (
        <article className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
          <h2 className="text-lg font-semibold text-slate-900">{report.summary}</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-slate-50 p-4 text-sm text-slate-700">{content}</pre>
        </article>
      )}
    </div>
  );
}
