import { BirdClient } from "npm:@messagebird/sdk";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { to, subject, html, from } = await req.json().catch(() => ({}));

    const apiKey = Deno.env.get("BIRD_API_KEY");
    if (!apiKey) throw new Error("BIRD_API_KEY not configured");

    const bird = new BirdClient({ apiKey });

    const result = await bird.email.send({
      from: from ?? "onboarding@messagebird.dev",
      to: Array.isArray(to) ? to : [to ?? "tadiwachigumadzi3@gmail.com"],
      subject: subject ?? "Hello World",
      html: html ?? "<p>You made your first email fly — congratulations!</p>",
    });

    return new Response(JSON.stringify({ success: true, result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("send-bird-email error:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
