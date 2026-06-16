import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { logAudit } from "@/lib/audit";
import { Trash2, Eye } from "lucide-react";

type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  event_type: string;
  event_date: string;
  guests: string | null;
  staff_needed: string;
  details: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
};

const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

export default function Bookings() {
  const [rows, setRows] = useState<Booking[] | null>(null);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [open, setOpen] = useState<Booking | null>(null);

  const load = async () => {
    const { data, error } = await supabase
      .from("booking_requests")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data ?? []) as Booking[]);
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("booking_requests").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    await logAudit("booking.status_change", { id, status });
    toast.success("Status updated");
    load();
  };

  const saveNotes = async (id: string, admin_notes: string) => {
    const { error } = await supabase.from("booking_requests").update({ admin_notes }).eq("id", id);
    if (error) return toast.error(error.message);
    await logAudit("booking.notes_update", { id });
    toast.success("Notes saved");
    setOpen(null);
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this booking?")) return;
    const { error } = await supabase.from("booking_requests").delete().eq("id", id);
    if (error) return toast.error(error.message);
    await logAudit("booking.delete", { id });
    toast.success("Deleted");
    load();
  };

  const filtered = (rows ?? []).filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (!q) return true;
    const s = q.toLowerCase();
    return r.name.toLowerCase().includes(s) || r.email.toLowerCase().includes(s) || r.event_type.toLowerCase().includes(s);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <h1 className="font-heading text-2xl">Bookings</h1>
        <div className="flex gap-2">
          <Input placeholder="Search name, email, event…" value={q} onChange={(e) => setQ(e.target.value)} className="w-64" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {rows === null ? <Skeleton className="h-64" /> : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Staff</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Received</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No bookings</TableCell></TableRow>
              ) : filtered.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <div className="font-medium">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.email}</div>
                  </TableCell>
                  <TableCell>{r.event_type}</TableCell>
                  <TableCell>{r.event_date}</TableCell>
                  <TableCell>{r.staff_needed}</TableCell>
                  <TableCell>
                    <Select value={r.status} onValueChange={(v) => updateStatus(r.id, v)}>
                      <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" onClick={() => setOpen(r)}><Eye className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => del(r.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-2xl">
          {open && (
            <>
              <DialogHeader>
                <DialogTitle>{open.name} — {open.event_type}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 text-sm">
                <div className="grid grid-cols-2 gap-3">
                  <div><span className="text-muted-foreground">Email:</span> {open.email}</div>
                  <div><span className="text-muted-foreground">Phone:</span> {open.phone || "—"}</div>
                  <div><span className="text-muted-foreground">Date:</span> {open.event_date}</div>
                  <div><span className="text-muted-foreground">Guests:</span> {open.guests || "—"}</div>
                  <div><span className="text-muted-foreground">Staff:</span> {open.staff_needed}</div>
                  <div><span className="text-muted-foreground">Status:</span> <Badge>{open.status}</Badge></div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Details</div>
                  <div className="rounded border p-2 bg-muted/50 whitespace-pre-wrap">{open.details || "—"}</div>
                </div>
                <div>
                  <div className="text-muted-foreground mb-1">Internal notes</div>
                  <Textarea
                    defaultValue={open.admin_notes ?? ""}
                    rows={4}
                    onBlur={(e) => {
                      if (e.target.value !== (open.admin_notes ?? "")) saveNotes(open.id, e.target.value);
                    }}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Saves when you click outside the box.</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
