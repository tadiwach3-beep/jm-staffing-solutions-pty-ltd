import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { sendTemplatedEmail } from "@/lib/sendTemplatedEmail";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });
      if (error) throw error;
      sendTemplatedEmail("contact_received", form.email, {
        name: form.name,
        subject: form.subject,
        message: form.message,
      });
      toast.success("Message sent! We'll respond within 24 hours.");
      setForm({ name: "", email: "", subject: "", message: "" });
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
            Get in <span className="text-gold">Touch</span>
          </motion.h1>
          <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto">We'd love to hear about your event. Reach out and let's make it extraordinary.</p>
        </div>
      </section>

      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h3 className="font-heading text-2xl font-bold text-navy mb-6">Contact Information</h3>
                <div className="space-y-5">
                  <a href="tel:+1234567890" className="flex items-center gap-4 font-body text-muted-foreground hover:text-navy transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><Phone size={20} className="text-gold" /></div>
                    (123) 456-7890
                  </a>
                  <a href="mailto:info@eliteeventstaffing.com" className="flex items-center gap-4 font-body text-muted-foreground hover:text-navy transition-colors">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><Mail size={20} className="text-gold" /></div>
                    info@eliteeventstaffing.com
                  </a>
                  <div className="flex items-center gap-4 font-body text-muted-foreground">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center"><MapPin size={20} className="text-gold" /></div>
                    New York, NY
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-heading text-lg font-semibold text-navy mb-3">Follow Us</h4>
                <div className="flex gap-3">
                  <a href="https://www.instagram.com/jmstaffingsolution" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all">
                    <Instagram size={18} />
                  </a>
                  <a href="https://www.facebook.com/people/JM-Staffing-Solutions/61584550227501/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center text-gold hover:bg-gold hover:text-navy transition-all">
                    <Facebook size={18} />
                  </a>
                </div>
              </div>
            </div>

            <motion.form initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} onSubmit={handleSubmit} className="lg:col-span-3 bg-card p-8 md:p-10 rounded-lg shadow-lg border border-border space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-body text-sm font-medium text-foreground block mb-2">Name *</label>
                  <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="Your name" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-foreground block mb-2">Email *</label>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="you@email.com" />
                </div>
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Subject *</label>
                <input type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50" placeholder="How can we help?" />
              </div>
              <div>
                <label className="font-body text-sm font-medium text-foreground block mb-2">Message *</label>
                <textarea rows={5} required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded border border-input bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none" placeholder="Tell us about your event..." />
              </div>
              <button type="submit" disabled={submitting} className="w-full py-4 bg-gold text-navy font-body font-semibold uppercase tracking-wider rounded hover:bg-gold-dark transition-colors text-sm disabled:opacity-50">
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </motion.form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
