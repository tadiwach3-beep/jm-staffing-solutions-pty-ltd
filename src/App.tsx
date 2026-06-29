import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Forbidden from "./pages/Forbidden";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Bookings from "./pages/admin/Bookings";
import Contacts from "./pages/admin/Contacts";
import AuditLogs from "./pages/admin/AuditLogs";
import EmailTemplates from "./pages/admin/EmailTemplates";
import Users from "./pages/admin/Users";
import { AdminAuthProvider } from "./hooks/useAdminAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Sonner />
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/403" element={<Forbidden />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="contacts" element={<Contacts />} />
            <Route path="email-templates" element={<EmailTemplates />} />
            <Route path="users" element={<Users />} />
            <Route path="audit-logs" element={<AuditLogs />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
