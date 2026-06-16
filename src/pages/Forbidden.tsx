import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export default function Forbidden() {
  const { signOut } = useAdminAuth();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="text-center max-w-md space-y-4">
        <ShieldAlert className="h-16 w-16 text-destructive mx-auto" />
        <h1 className="font-heading text-4xl">403 — Forbidden</h1>
        <p className="text-muted-foreground">
          Your account does not have access to this admin dashboard. If you believe this is a mistake,
          please contact the site owner.
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={signOut} variant="outline">Sign out</Button>
          <Button asChild><Link to="/">Back to site</Link></Button>
        </div>
      </div>
    </div>
  );
}
