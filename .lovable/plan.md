## Plan

**1. Add "Admin Dashboard" link in Footer**
- In `src/components/Footer.tsx`, add an "Admin Dashboard" link to the bottom bar alongside Privacy Policy / Terms of Service.
- Link points to `/admin` (visible to everyone — actual access is gated by the route guard).
- Styled subtly to match existing footer links.

**2. Route guards for /admin**
- `src/pages/admin/AdminLayout.tsx` already uses `useAdminAuth`. Harden it so:
  - While loading → show a loading state.
  - Not signed in → redirect to `/auth`.
  - Signed in but not admin (no `admin` role in `user_roles`) → redirect to `/forbidden` (403 page already exists at `src/pages/Forbidden.tsx`).
  - Signed-in admin → render the dashboard.
- Confirm `/forbidden` route is registered in `src/App.tsx` and the 403 page renders a clear "Access Denied" message with a link back to home.
- Ensure the guard runs on every `/admin/*` sub-route via the layout wrapper.

No database or business-logic changes — frontend only.
