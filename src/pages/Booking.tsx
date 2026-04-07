import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const eventTypes = ["Wedding", "Corporate Gala", "Private Party", "Holiday Event", "Fundraiser", "Product Launch", "Other"];
const staffTypes = ["Waitstaff", "Bartenders", "Private Chef", "Event Coordinator", "All of the Above"];

const Booking = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", eventType: "", date: "", guests: "", staffNeeded: "", details: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.from("booking_requests").insert({
        id,
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        event_type: form.eventType,
        event_date: form.date,
        guests: form.guests || null,
        staff_needed: form.staffNeeded,
        details: form.details || null,
      });
      if (error) throw error;
      toast.success("Booking request submitted! We'll get back to you within 24 hours.");
      setForm({ name: "", email: "", phone: "", eventType: "", date: "", guests: "", staffNeeded: "", details: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 bg-navy">
        <div className="container mx-auto px-4 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
            Book <span className="text-gold">Your Staff</span>
          </motion.h1>
          <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto">Tell us about your event and we'll put together the perfect team.</p>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="bg-card p-8 md:p-10 rounded-lg shadow-lg border border-border space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Full Name *</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Your name" />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Email *</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="you@email.com" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Phone</label>
                <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="(123) 456-7890" />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Event Date *</label>
                <input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" />
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Event Type *</label>
                <select required value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50">
                  <option value="">Select type</option>
                  {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Estimated Guests</label>
                <input type="number" value={form.guests} onChange={(e) => setForm({ ...form, guests: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="e.g. 100" />
              </div>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-2">Staff Needed *</label>
              <select required value={form.staffNeeded} onChange={(e) => setForm({ ...form, staffNeeded: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50">
                <option value="">Select staff type</option>
                {staffTypes.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-2">Additional Details</label>
              <textarea rows={4} value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" placeholder="Tell us more about your event, special requests, theme, etc." />
            </div>
            <button type="submit" disabled={submitting} className="w-full py-4 bg-gold text-navy font-body font-semibold uppercase tracking-wider rounded hover:bg-gold-dark transition-colors text-sm disabled:opacity-50">
              {submitting ? "Submitting..." : "Submit Booking Request"}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Booking;
