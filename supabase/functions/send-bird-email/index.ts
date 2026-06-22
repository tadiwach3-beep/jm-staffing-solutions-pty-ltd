const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const body = await req.json().catch(() => ({}));
    const to = body.to ?? "tadiwachigumadzi3@gmail.com";
    const subject = body.subject ?? "Hello World";
    const html = body.html ?? "<p>You made your first email fly — congratulations!</p>";
    const from = body.from ?? "onboarding@messagebird.dev";

    const apiKey = Deno.env.get("BIRD_API_KEY");
    if (!apiKey) throw new Error("BIRD_API_KEY not configured");

    // Parse region from key: bk_{region}_{token}
    const region = apiKey.split("_")[1] ?? "us1";
    const baseUrl = `https://${region}.platform.bird.com`;

    const payload = {
      from: typeof from === "string" ? { email: from } : from,
      to: (Array.isArray(to) ? to : [to]).map((t: any) =>
        typeof t === "string" ? { email: t } : t
      ),
      subject,
      html,
    };

    const res = await fetch(`${baseUrl}/v1/email/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.text();
    console.log("Bird response:", res.status, data);

    return new Response(
      JSON.stringify({ success: res.ok, status: res.status, data: tryParse(data) }),
      {
        status: res.ok ? 200 : res.status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (err) {
    console.error("send-bird-email error:", err);
    return new Response(JSON.stringify({ success: false, error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function tryParse(s: string) {
  try { return JSON.parse(s); } catch { return s; }
}
