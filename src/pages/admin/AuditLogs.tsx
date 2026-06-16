import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

type Log = {
  id: string;
  user_email: string | null;
  action: string;
  details: Record<string, unknown> | null;
  user_agent: string | null;
  ip_address: string | null;
  created_at: string;
};

export default function AuditLogs() {
  const [rows, setRows] = useState<Log[] | null>(null);
  const [q, setQ] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      setRows((data ?? []) as Log[]);
    })();
  }, []);

  const filtered = (rows ?? []).filter((r) => {
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      (r.user_email ?? "").toLowerCase().includes(s) ||
      r.action.toLowerCase().includes(s) ||
      JSON.stringify(r.details ?? {}).toLowerCase().includes(s)
    );
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-heading text-2xl">Audit Logs</h1>
        <Input placeholder="Search action, user, details…" value={q} onChange={(e) => setQ(e.target.value)} className="w-72" />
      </div>
      {rows === null ? <Skeleton className="h-64" /> : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>When</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Device</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No logs</TableCell></TableRow>
              ) : filtered.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{r.user_email ?? "—"}</TableCell>
                  <TableCell className="text-sm font-medium">{r.action}</TableCell>
                  <TableCell className="text-xs font-mono max-w-xs truncate">{r.details ? JSON.stringify(r.details) : "—"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-xs truncate">{r.user_agent ?? "—"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
