import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/src/lib/utils";
import { Sidebar } from "@/src/components/dashboard/sidebar";
import { TopBar } from "@/src/components/dashboard/top-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Omni-Supervisor",
  description: "AI-powered operations supervisor for modern teams"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cn("min-h-screen bg-slate-50 text-slate-900", inter.className)}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <TopBar />
            <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-slate-50">
              <div className="mx-auto max-w-7xl space-y-6">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
