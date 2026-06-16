import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, Mail, Clock, ScrollText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type Stats = {
  bookingsTotal: number;
  bookingsPending: number;
  contactsTotal: number;
  contactsNew: number;
  recent: { action: string; user_email: string | null; created_at: string }[];
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    (async () => {
      const [b, bp, c, cn, recent] = await Promise.all([
        supabase.from("booking_requests").select("*", { count: "exact", head: true }),
        supabase.from("booking_requests").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("audit_logs").select("action,user_email,created_at").order("created_at", { ascending: false }).limit(10),
      ]);
      setStats({
        bookingsTotal: b.count ?? 0,
        bookingsPending: bp.count ?? 0,
        contactsTotal: c.count ?? 0,
        contactsNew: cn.count ?? 0,
        recent: recent.data ?? [],
      });
    })();
  }, []);

  if (!stats) {
    return (
      <div className="grid gap-4 md:grid-cols-4">
        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}
      </div>
    );
  }

  const cards = [
    { label: "Total Bookings", value: stats.bookingsTotal, icon: CalendarCheck },
    { label: "Pending Bookings", value: stats.bookingsPending, icon: Clock },
    { label: "Contact Messages", value: stats.contactsTotal, icon: Mail },
    { label: "New Messages", value: stats.contactsNew, icon: ScrollText },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Card key={c.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.label}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-heading">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <Button asChild><Link to="/admin/bookings">View Bookings</Link></Button>
        <Button asChild variant="outline"><Link to="/admin/contacts">View Messages</Link></Button>
        <Button asChild variant="outline"><Link to="/admin/audit-logs">Audit Logs</Link></Button>
      </div>

      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No activity yet.</p>
          ) : (
            <ul className="space-y-2">
              {stats.recent.map((r, i) => (
                <li key={i} className="text-sm flex justify-between border-b pb-2 last:border-0">
                  <span><span className="font-medium">{r.user_email ?? "system"}</span> — {r.action}</span>
                  <span className="text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
