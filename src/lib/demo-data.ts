import { addDays, subDays } from "date-fns";
import { WorkspaceSnapshot } from "./types";

const today = new Date();

export async function getDemoWorkspace(): Promise<WorkspaceSnapshot> {
  return {
    metrics: {
      totalProjects: 6,
      activeAlerts: 4,
      completionRate: 0.68,
      aiReports: 12
    },
    members: [
      { id: "m1", name: "ليان السالم", role: "admin" },
      { id: "m2", name: "سامي العبدالله", role: "manager" },
      { id: "m3", name: "نورا البديوي", role: "manager" },
      { id: "m4", name: "هيثم القحطاني", role: "viewer" }
    ],
    projects: [
      {
        id: "p1",
        name: "منصة التحليلات الموحدة",
        status: "on-track",
        progress: 0.82,
        dueDate: addDays(today, 18).toISOString(),
        summary:
          "المنصة تسير حسب الخطة مع اكتمال دمج مصادر البيانات الرئيسية وانتهاء إعداد لوحة التحكم الأولى.",
        ownerId: "m1",
        members: [],
        issues: ["ينقصنا اختبار التكامل النهائي مع مصدر بيانات العملاء."],
        files: [
          {
            id: "f1",
            name: "roadmap.pdf",
            type: "application/pdf",
            url: "https://example.com/roadmap.pdf",
            uploadedAt: subDays(today, 12).toISOString(),
            size: 220000
          }
        ]
      },
      {
        id: "p2",
        name: "تطبيق المحمول للمدراء",
        status: "at-risk",
        progress: 0.47,
        dueDate: addDays(today, 32).toISOString(),
        summary: "تم الانتهاء من تصميم الواجهة بينما ما زال التكامل مع خدمات المصادقة قيد العمل.",
        ownerId: "m2",
        members: [],
        issues: [
          "تأخر اعتماد تصميم شاشة الإشعارات.",
          "فريق البنية التحتية يحتاج أسبوعًا إضافيًا لإعداد البيئة التجريبية."
        ],
        files: []
      },
      {
        id: "p3",
        name: "ترقية نظم المبيعات",
        status: "delayed",
        progress: 0.31,
        dueDate: subDays(today, 5).toISOString(),
        summary: "المشروع متأخر بسبب نقص الموارد وتغيّر نطاق المتطلبات من الفريق التجاري.",
        ownerId: "m3",
        members: [],
        issues: [
          "لم يبدأ اختبار الأداء بعد.",
          "التوثيق ناقص للمكونات الجديدة."
        ],
        files: []
      }
    ],
    insights: [
      {
        id: "i1",
        type: "risk",
        title: "مشروع ترقية نظم المبيعات",
        description: "مستوى المخاطرة مرتفع بسبب تأخر أسبوعين ونقص أصحاب المصلحة.",
        relatedProjectId: "p3"
      },
      {
        id: "i2",
        type: "recommendation",
        title: "تعزيز التعاون في تطبيق المحمول",
        description: "يوصى بجدولة ورشة عمل تجمع فرق التصميم والهندسة لتسريع اعتماد الواجهة."
      },
      {
        id: "i3",
        type: "summary",
        title: "ملخص الأسبوع",
        description: "اكتمال 3 مهام حرجة وتحسن معدل الإنجاز بنسبة 8%."
      }
    ],
    notifications: [
      {
        id: "n1",
        title: "تنبيه تأخير",
        description: "مشروع ترقية نظم المبيعات متأخر عن الجدول الزمني بـ 14 يومًا.",
        severity: "critical",
        createdAt: subDays(today, 1).toISOString()
      },
      {
        id: "n2",
        title: "مهمة على وشك الانتهاء",
        description: "يقترب موعد تسليم منصة التحليلات الموحدة في أقل من 3 أسابيع.",
        severity: "info",
        createdAt: subDays(today, 2).toISOString()
      }
    ],
    reports: [
      {
        id: "r1",
        weekOf: subDays(today, 3).toISOString(),
        highlights: [
          "إطلاق نسخة تجريبية من منصة التحليلات الموحدة.",
          "إنهاء تدريب الفريق على نظام إدارة المعرفة."
        ],
        risks: ["تأخر مشروع ترقية نظم المبيعات عن الموعد المستهدف."],
        recommendations: ["تخصيص مطور إضافي لمشروع المبيعات لمدة أسبوعين."],
        summary:
          "شهد الأسبوع تقدمًا قويًا في المشاريع التحولية مع استمرار التحديات في مبادرات المبيعات."
      }
    ]
  };
}
