import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    console.warn("Supabase credentials غير متوفرة. تأكد من إعداد ملفات البيئة.");
  }
  return createClient(url ?? "", key ?? "");
}
