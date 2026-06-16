import { supabase } from "@/integrations/supabase/client";

export async function logAudit(action: string, details?: Record<string, unknown>) {
  const { data } = await supabase.auth.getUser();
  if (!data.user) return;
  await supabase.from("audit_logs").insert({
    user_id: data.user.id,
    user_email: data.user.email ?? null,
    action,
    details: (details ?? {}) as never,
    user_agent: navigator.userAgent,
  });
}
