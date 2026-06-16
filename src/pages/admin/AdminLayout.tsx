import { NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
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
import { LayoutDashboard, CalendarCheck, Mail, ScrollText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard, end: true },
  { title: "Bookings", url: "/admin/bookings", icon: CalendarCheck },
  { title: "Contact Messages", url: "/admin/contacts", icon: Mail },
  { title: "Audit Logs", url: "/admin/audit-logs", icon: ScrollText },
];

function AppSidebar() {
  const { signOut, user } = useAdminAuth();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>SiteCore Pro</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((i) => (
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
            <div className="px-2 py-2 text-xs text-muted-foreground truncate">{user?.email}</div>
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
  const { session, isAdmin, loading } = useAdminAuth();
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
  if (!isAdmin) return <Navigate to="/403" replace />;

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
