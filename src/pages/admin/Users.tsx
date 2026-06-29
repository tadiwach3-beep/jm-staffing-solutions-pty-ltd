import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { useAdminAuth, AppRole } from "@/hooks/useAdminAuth";
import { logAudit } from "@/lib/audit";
import { X, UserPlus, ShieldAlert } from "lucide-react";

type Row = {
  user_id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
  roles: AppRole[];
};

const ASSIGNABLE: AppRole[] = ["admin", "manager", "viewer"];

const ROLE_DESC: Record<AppRole, string> = {
  admin: "Full access — manage users, bookings, contacts, templates, audit logs",
  manager: "Bookings, contact messages, and email templates",
  viewer: "Read-only access to bookings and contact messages",
  user: "No dashboard access",
};

export default function Users() {
  const { user, isAdmin } = useAdminAuth();
  const [rows, setRows] = useState<Row[] | null>(null);
  const [q, setQ] = useState("");
  const [adding, setAdding] = useState<Record<string, AppRole>>({});

  const load = async () => {
    const { data, error } = await supabase.rpc("admin_list_users");
    if (error) return toast.error(error.message);
    setRows((data ?? []) as Row[]);
  };

  useEffect(() => { if (isAdmin) load(); }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="rounded-md border p-8 text-center space-y-2">
        <ShieldAlert className="h-8 w-8 mx-auto text-muted-foreground" />
        <p className="font-medium">Admins only</p>
        <p className="text-sm text-muted-foreground">You need the admin role to manage users.</p>
      </div>
    );
  }

  const assign = async (uid: string, role: AppRole) => {
    const { error } = await supabase.rpc("admin_assign_role", { _target: uid, _role: role });
    if (error) return toast.error(error.message);
    await logAudit("user.role_assign", { user_id: uid, role });
    toast.success(`Granted ${role}`);
    setAdding((p) => ({ ...p, [uid]: undefined as unknown as AppRole }));
    load();
  };

  const revoke = async (uid: string, role: AppRole) => {
    const { error } = await supabase.rpc("admin_revoke_role", { _target: uid, _role: role });
    if (error) return toast.error(error.message);
    await logAudit("user.role_revoke", { user_id: uid, role });
    toast.success(`Removed ${role}`);
    load();
  };

  const filtered = (rows ?? []).filter((r) =>
    !q ? true : r.email.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl">Users & Access</h1>
          <p className="text-sm text-muted-foreground">
            New sign-ups appear here with no roles. Assign a role to grant them dashboard access.
          </p>
        </div>
        <Input placeholder="Search email…" value={q} onChange={(e) => setQ(e.target.value)} className="w-64" />
      </div>

      <div className="rounded-md border bg-muted/30 p-4 text-xs grid sm:grid-cols-3 gap-3">
        {ASSIGNABLE.map((r) => (
          <div key={r}>
            <Badge variant="outline" className="mb-1 capitalize">{r}</Badge>
            <p className="text-muted-foreground">{ROLE_DESC[r]}</p>
          </div>
        ))}
      </div>

      {rows === null ? <Skeleton className="h-64" /> : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Signed up</TableHead>
                <TableHead>Last sign-in</TableHead>
                <TableHead className="text-right">Grant role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No users</TableCell></TableRow>
              ) : filtered.map((r) => {
                const isPending = r.roles.length === 0;
                const isSelf = r.user_id === user?.id;
                return (
                  <TableRow key={r.user_id}>
                    <TableCell>
                      <div className="font-medium">{r.email} {isSelf && <span className="text-xs text-muted-foreground">(you)</span>}</div>
                      {isPending && <Badge variant="destructive" className="mt-1">Pending approval</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {r.roles.length === 0 ? <span className="text-xs text-muted-foreground">— none —</span> : r.roles.map((role) => (
                          <Badge key={role} variant="secondary" className="gap-1 capitalize">
                            {role}
                            <button
                              type="button"
                              onClick={() => revoke(r.user_id, role)}
                              className="hover:text-destructive"
                              title="Remove role"
                            ><X className="h-3 w-3" /></button>
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {r.last_sign_in_at ? new Date(r.last_sign_in_at).toLocaleString() : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Select value={adding[r.user_id] ?? ""} onValueChange={(v) => setAdding((p) => ({ ...p, [r.user_id]: v as AppRole }))}>
                          <SelectTrigger className="w-32 h-8"><SelectValue placeholder="Choose role" /></SelectTrigger>
                          <SelectContent>
                            {ASSIGNABLE.filter((role) => !r.roles.includes(role)).map((role) => (
                              <SelectItem key={role} value={role} className="capitalize">{role}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          size="sm"
                          disabled={!adding[r.user_id]}
                          onClick={() => adding[r.user_id] && assign(r.user_id, adding[r.user_id])}
                        >
                          <UserPlus className="h-4 w-4 mr-1" /> Grant
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
