import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { logAudit } from "@/lib/audit";
import { Save, Eye, Code } from "lucide-react";

type Template = {
  id: string;
  key: string;
  name: string;
  subject: string;
  html: string;
  description: string | null;
  updated_at: string;
};

export default function EmailTemplates() {
  const [rows, setRows] = useState<Template[] | null>(null);
  const [active, setActive] = useState<string>("");
  const [draft, setDraft] = useState<Record<string, { subject: string; html: string }>>({});
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const { data, error } = await supabase
      .from("email_templates")
      .select("*")
      .order("name");
    if (error) return toast.error(error.message);
    const list = (data ?? []) as Template[];
    setRows(list);
    if (list.length && !active) setActive(list[0].key);
    const d: Record<string, { subject: string; html: string }> = {};
    list.forEach((t) => (d[t.key] = { subject: t.subject, html: t.html }));
    setDraft(d);
  };

  useEffect(() => { load(); }, []);

  const current = rows?.find((r) => r.key === active);
  const currentDraft = current ? draft[current.key] : null;

  const save = async () => {
    if (!current || !currentDraft) return;
    setSaving(true);
    const { error } = await supabase
      .from("email_templates")
      .update({ subject: currentDraft.subject, html: currentDraft.html })
      .eq("id", current.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    await logAudit("email_template.update", { key: current.key });
    toast.success("Template saved");
    load();
  };

  const sendTest = async () => {
    if (!current || !currentDraft) return;
    const to = prompt("Send test email to:");
    if (!to) return;
    const { error } = await supabase.functions.invoke("send-bird-email", {
      body: {
        to,
        subject: `[TEST] ${currentDraft.subject}`,
        html: currentDraft.html,
      },
    });
    if (error) return toast.error(error.message);
    toast.success(`Test sent to ${to}`);
  };

  if (rows === null) return <Skeleton className="h-96" />;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl">Email Templates</h1>
          <p className="text-sm text-muted-foreground">Branded HTML emails sent from your app. Use {`{{variable}}`} placeholders.</p>
        </div>
        {current && (
          <div className="flex gap-2">
            <Button variant="outline" onClick={sendTest}>Send test</Button>
            <Button onClick={save} disabled={saving}><Save className="h-4 w-4 mr-2" />Save</Button>
          </div>
        )}
      </div>

      <Tabs value={active} onValueChange={setActive}>
        <TabsList>
          {rows.map((t) => <TabsTrigger key={t.key} value={t.key}>{t.name}</TabsTrigger>)}
        </TabsList>

        {rows.map((t) => {
          const d = draft[t.key];
          if (!d) return null;
          return (
            <TabsContent key={t.key} value={t.key} className="space-y-4">
              {t.description && <p className="text-sm text-muted-foreground">{t.description}</p>}
              <div className="space-y-2">
                <label className="text-sm font-medium">Subject</label>
                <Input
                  value={d.subject}
                  onChange={(e) => setDraft((p) => ({ ...p, [t.key]: { ...p[t.key], subject: e.target.value } }))}
                />
              </div>

              <Tabs defaultValue="html">
                <TabsList>
                  <TabsTrigger value="html"><Code className="h-4 w-4 mr-1" />HTML</TabsTrigger>
                  <TabsTrigger value="preview"><Eye className="h-4 w-4 mr-1" />Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="html">
                  <Textarea
                    value={d.html}
                    onChange={(e) => setDraft((p) => ({ ...p, [t.key]: { ...p[t.key], html: e.target.value } }))}
                    rows={24}
                    className="font-mono text-xs"
                  />
                </TabsContent>
                <TabsContent value="preview">
                  <div className="rounded-md border overflow-hidden bg-white">
                    <iframe
                      title="preview"
                      srcDoc={d.html}
                      className="w-full"
                      style={{ height: 600, border: 0 }}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <p className="text-xs text-muted-foreground">Last updated {new Date(t.updated_at).toLocaleString()}</p>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
