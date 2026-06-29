import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth, AppRole } from "@/hooks/useAdminAuth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { LayoutDashboard, CalendarCheck, Mail, MailOpen, ScrollText, Users as UsersIcon, LogOut, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const items: { title: string; url: string; icon: typeof LayoutDashboard; end?: boolean; roles: AppRole[] }[] = [
  { title: "Dashboard",        url: "/admin",                 icon: LayoutDashboard, end: true, roles: ["admin", "manager", "viewer"] },
  { title: "Bookings",         url: "/admin/bookings",        icon: CalendarCheck,             roles: ["admin", "manager", "viewer"] },
  { title: "Contact Messages", url: "/admin/contacts",        icon: Mail,                      roles: ["admin", "manager", "viewer"] },
  { title: "Email Templates",  url: "/admin/email-templates", icon: MailOpen,                  roles: ["admin", "manager"] },
  { title: "Users & Access",   url: "/admin/users",           icon: UsersIcon,                 roles: ["admin"] },
  { title: "Audit Logs",       url: "/admin/audit-logs",      icon: ScrollText,                roles: ["admin"] },
];

function AppSidebar() {
  const { signOut, user, roles, hasRole } = useAdminAuth();
  const visible = items.filter((i) => hasRole(...i.roles));
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SiteCore Pro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visible.map((i) => (
                <SidebarMenuItem key={i.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={i.url} end={i.end} className={({ isActive }) =>
                      isActive ? "bg-muted text-foreground font-medium" : ""
                    }>
                      <i.icon className="h-4 w-4" />
                      <span>{i.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="px-2 py-2 space-y-1">
              <div className="text-xs text-muted-foreground truncate">{user?.email}</div>
              <div className="flex flex-wrap gap-1">
                {roles.length === 0
                  ? <Badge variant="destructive" className="text-[10px]">pending</Badge>
                  : roles.map((r) => <Badge key={r} variant="secondary" className="text-[10px] capitalize">{r}</Badge>)}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-2" /> Sign out
            </Button>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

export default function AdminLayout() {
  const { session, loading, roles, signOut } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen p-6 space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }
  if (!session) return <Navigate to="/auth" state={{ from: location }} replace />;

  // Signed in but no role granted yet → pending screen
  if (roles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-lg border bg-card p-8 text-center space-y-4">
          <Clock className="h-10 w-10 mx-auto text-muted-foreground" />
          <h1 className="font-heading text-2xl">Awaiting approval</h1>
          <p className="text-sm text-muted-foreground">
            Your account was created successfully. An administrator must grant you a role before you can access the dashboard.
          </p>
          <Button variant="outline" onClick={signOut} className="w-full">Sign out</Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 border-b flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <span className="font-heading text-lg">Admin Dashboard</span>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
