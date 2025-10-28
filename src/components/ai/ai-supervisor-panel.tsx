"use client";

import { useEffect, useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { WorkspaceSnapshot, AIInsight } from "@/src/lib/types";
import { cn } from "@/src/lib/utils";

interface AISupervisorPanelProps {
  workspace: WorkspaceSnapshot;
}

interface AssistantMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function AISupervisorPanel({ workspace }: AISupervisorPanelProps) {
  const [insights, setInsights] = useState<AIInsight[]>(workspace.insights);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function refreshInsights() {
      try {
        const response = await fetch("/api/ai/analyzeProjects", { method: "POST" });
        if (response.ok) {
          const data = await response.json();
          setInsights(data.insights);
        }
      } catch (error) {
        console.error("Failed to update insights", error);
      }
    }
    void refreshInsights();
  }, []);

  async function handleSend() {
    if (!input.trim()) return;
    const userMessage: AssistantMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: input
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/assist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage.content })
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.answer
        }
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "تعذر الحصول على رد من الذكاء الاصطناعي."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">المشرف الذكي</h3>
          <p className="text-sm text-slate-500">تحليل مستمر لكل المشاريع وإرشادات فورية</p>
        </div>
        <Sparkles className="h-6 w-6 text-brand" />
      </div>
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-800">أهم الاستنتاجات</h4>
          {insights.map((insight) => (
            <article
              key={insight.id}
              className={cn(
                "rounded-xl border border-slate-100 p-4 text-sm shadow-sm",
                insight.type === "risk" && "bg-rose-50/60 text-rose-700",
                insight.type === "recommendation" && "bg-emerald-50/60 text-emerald-700",
                insight.type === "summary" && "bg-slate-50 text-slate-700"
              )}
            >
              <p className="font-semibold">{insight.title}</p>
              <p className="mt-1 leading-6">{insight.description}</p>
            </article>
          ))}
        </div>
        <div className="flex flex-col rounded-xl border border-slate-100 bg-slate-50/60">
          <div className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
            {messages.length === 0 ? (
              <p className="text-slate-500">
                اسأل المشرف: "ما هو المشروع الأكثر تأخرًا؟" أو "لخص التحديثات لهذا الأسبوع".
              </p>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "whitespace-pre-wrap rounded-lg px-4 py-2",
                    message.role === "assistant"
                      ? "bg-white text-slate-800"
                      : "bg-brand-subtle text-brand-bold"
                  )}
                >
                  {message.content}
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>يتم التفكير...</span>
              </div>
            )}
          </div>
          <div className="border-t border-slate-200 bg-white p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="اكتب سؤالك للمشرف الذكي"
                className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-bold"
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
