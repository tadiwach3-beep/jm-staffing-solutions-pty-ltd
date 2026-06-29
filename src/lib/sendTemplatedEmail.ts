import { supabase } from "@/integrations/supabase/client";

/**
 * Render a stored email template with {{variable}} substitution and send via Bird.
 */
export async function sendTemplatedEmail(
  templateKey: string,
  to: string,
  variables: Record<string, string | number | null | undefined> = {},
) {
  const { data: tpl, error } = await supabase
    .from("email_templates")
    .select("subject, html")
    .eq("key", templateKey)
    .maybeSingle();

  if (error || !tpl) {
    console.warn("sendTemplatedEmail: template not found", templateKey, error);
    return { success: false, error: error?.message ?? "template not found" };
  }

  const render = (s: string) =>
    s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_m, k) => {
      const v = variables[k];
      return v === null || v === undefined || v === "" ? "—" : String(v);
    });

  const subject = render(tpl.subject);
  const html = render(tpl.html);

  const { error: invokeError } = await supabase.functions.invoke("send-bird-email", {
    body: { to, subject, html },
  });

  if (invokeError) {
    console.warn("sendTemplatedEmail: invoke failed", invokeError);
    return { success: false, error: invokeError.message };
  }
  return { success: true };
}
