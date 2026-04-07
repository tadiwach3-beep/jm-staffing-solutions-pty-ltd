import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Clock, Shield, ChevronDown, ChevronUp, CheckCircle } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import heroImg from "@/assets/hero-event.jpg";
import waitstaffImg from "@/assets/service-waitstaff.jpg";
import bartenderImg from "@/assets/service-bartender.jpg";
import chefImg from "@/assets/service-chef.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6 },
};

const services = [
  { title: "Professional Waitstaff", desc: "Trained servers who ensure seamless dinner service with poise and attentiveness.", img: waitstaffImg },
  { title: "Expert Bartenders", desc: "Skilled mixologists creating craft cocktails and managing beverage service flawlessly.", img: bartenderImg },
  { title: "Private Event Chefs", desc: "Culinary artists preparing exquisite menus tailored to your event's theme and dietary needs.", img: chefImg },
];

const benefits = [
  { icon: Users, title: "Vetted Professionals", desc: "Every team member is background-checked, trained, and experienced in high-end event service." },
  { icon: Clock, title: "24/7 Availability", desc: "Day or night, we staff events on your schedule — weekends, holidays, last-minute bookings." },
  { icon: Shield, title: "Fully Insured", desc: "Complete liability coverage for your peace of mind at every event." },
  { icon: Star, title: "5-Star Rated", desc: "Consistently rated top-tier by event planners and hosts across the region." },
];

const testimonials = [
  { name: "Sarah Mitchell", role: "Wedding Planner", text: "Elite Event Staffing transformed our reception. The team was professional, attentive, and our guests couldn't stop complimenting the service.", rating: 5 },
  { name: "James Rodriguez", role: "Corporate Event Manager", text: "We've used them for three consecutive galas. Impeccable bartending service and the waitstaff are always perfectly presented.", rating: 5 },
  { name: "Angela Chen", role: "Private Host", text: "From the first call to the last champagne glass, everything was handled with care. I'll never host without them again.", rating: 5 },
];

const faqs = [
  { q: "How far in advance should I book?", a: "We recommend booking at least 2-4 weeks in advance for best availability. However, we do accommodate last-minute requests when possible." },
  { q: "What types of events do you staff?", a: "We staff weddings, corporate galas, private parties, holiday events, fundraisers, product launches, and more. If it's an event, we can staff it." },
  { q: "Are your staff insured?", a: "Yes, all our staff are fully insured with comprehensive liability coverage for your peace of mind." },
  { q: "Can I request specific staff members?", a: "Absolutely. If you've worked with a team member before and loved their service, we'll do our best to assign them to your event." },
  { q: "What attire do your staff wear?", a: "Our standard is formal black attire. We can also accommodate custom dress codes or themed uniforms upon request." },
];

const Index = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Elegant event service" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-navy/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block font-body text-sm uppercase tracking-[0.3em] text-gold mb-6"
          >
            Premium Event Staffing Solutions
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto"
          >
            Elevate Every Event with{" "}
            <span className="text-gold">Elite Service</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="font-body text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10"
          >
            Professional waitstaff, bartenders, and chefs for weddings, galas, corporate events, and private celebrations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/booking"
              className="px-8 py-4 bg-gold text-navy font-body font-semibold uppercase tracking-wider rounded hover:bg-gold-dark transition-colors text-sm"
            >
              Book Your Staff
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 border border-gold/60 text-gold font-body font-semibold uppercase tracking-wider rounded hover:bg-gold/10 transition-colors text-sm"
            >
              Our Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-navy-light py-6 border-y border-gold/20">
        <div className="container mx-auto px-4 flex flex-wrap items-center justify-center gap-8 md:gap-16 font-body text-sm text-primary-foreground/70 uppercase tracking-wider">
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-gold" /> 500+ Events Staffed</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-gold" /> Fully Licensed & Insured</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-gold" /> 5-Star Client Rating</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-gold" /> Same-Day Booking Available</span>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="What We Offer" title="Our Services" description="From elegant dinner service to creative cocktail bars, our trained professionals deliver exceptional experiences." />
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }} className="group bg-card rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">{s.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                  <Link to="/services" className="font-body text-sm text-gold font-medium hover:text-gold-dark transition-colors uppercase tracking-wider">Learn More →</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-navy">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="Why Choose Us" title="The Elite Difference" description="We don't just staff events — we elevate them." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, i) => (
              <motion.div key={b.title} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center p-8 rounded-lg border border-gold/20 hover:border-gold/50 transition-colors">
                <b.icon className="text-gold mx-auto mb-4" size={36} />
                <h3 className="font-heading text-lg font-bold text-primary-foreground mb-2">{b.title}</h3>
                <p className="font-body text-sm text-primary-foreground/60 leading-relaxed">{b.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="Our Work" title="Event Gallery" description="A glimpse into the elegance and excellence we bring to every occasion." />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[gallery1, gallery2, gallery3, gallery4].map((img, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="aspect-square overflow-hidden rounded-lg">
                <img src={img} alt={`Event gallery ${i + 1}`} loading="lazy" width={800} height={600} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/gallery" className="px-8 py-3 border-2 border-navy text-navy font-body font-semibold uppercase tracking-wider rounded hover:bg-navy hover:text-primary-foreground transition-all text-sm">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading subtitle="Client Love" title="What Our Clients Say" />
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ duration: 0.6, delay: i * 0.15 }} className="bg-card p-8 rounded-lg border border-border shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} className="text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <p className="font-heading text-base font-bold text-navy">{t.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-cream">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <SectionHeading subtitle="FAQ" title="Frequently Asked Questions" />
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={i} {...fadeUp} className="bg-card rounded-lg border border-border overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-heading text-base font-semibold text-navy">{f.q}</span>
                  {openFaq === i ? <ChevronUp size={20} className="text-gold shrink-0" /> : <ChevronDown size={20} className="text-gold shrink-0" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={heroImg} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Ready to Elevate Your Next Event?
            </h2>
            <p className="font-body text-lg text-primary-foreground/70 max-w-xl mx-auto mb-8">
              Let us handle the service so you can enjoy the celebration. Get in touch today for a custom quote.
            </p>
            <Link to="/booking" className="inline-block px-10 py-4 bg-gold text-navy font-body font-semibold uppercase tracking-wider rounded hover:bg-gold-dark transition-colors text-sm">
              Get a Free Quote
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
