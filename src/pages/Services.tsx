import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import waitstaffImg from "@/assets/service-waitstaff.jpg";
import bartenderImg from "@/assets/service-bartender.jpg";
import chefImg from "@/assets/service-chef.jpg";
import { CheckCircle } from "lucide-react";

const serviceDetails = [
  {
    title: "Professional Waitstaff",
    img: waitstaffImg,
    desc: "Our experienced servers bring polish and precision to every table. Trained in fine dining etiquette, they ensure seamless service from appetizers to dessert.",
    features: ["Formal dinner service", "Buffet & station management", "Plated course service", "Wine & beverage pairing", "Table setting & breakdown"],
  },
  {
    title: "Expert Bartenders",
    img: bartenderImg,
    desc: "From classic cocktails to custom drink menus, our bartenders bring flair and expertise to your event's bar service.",
    features: ["Custom cocktail menus", "Full bar setup & management", "Wine & champagne service", "Non-alcoholic specialties", "Bar inventory management"],
  },
  {
    title: "Private Event Chefs",
    img: chefImg,
    desc: "Our culinary professionals craft bespoke menus tailored to your event theme, dietary requirements, and guest preferences.",
    features: ["Custom menu creation", "On-site food preparation", "Dietary accommodation", "Food presentation & plating", "Kitchen coordination"],
  },
];

const packages = [
  { name: "Essentials", price: "Starting at $35/hr per staff", desc: "Perfect for intimate gatherings", features: ["Professional waitstaff", "Standard formal attire", "Up to 4 hours of service", "Setup & cleanup included"] },
  { name: "Premium", price: "Starting at $55/hr per staff", desc: "Ideal for weddings & galas", features: ["Waitstaff + bartenders", "Custom attire coordination", "Up to 8 hours of service", "Event coordinator on-site", "Setup & breakdown"], highlight: true },
  { name: "Elite", price: "Custom Quote", desc: "Full-service luxury events", features: ["Complete staffing solution", "Private chef included", "Unlimited service hours", "Dedicated event manager", "Custom bar & menu design", "Multi-day event support"] },
];

const Services = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-20 bg-navy">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
          Our <span className="text-gold">Services</span>
        </motion.h1>
        <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto">
          Comprehensive event staffing tailored to your occasion.
        </p>
      </div>
    </section>

    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        {serviceDetails.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className={`grid lg:grid-cols-2 gap-12 items-center ${i > 0 ? "mt-24" : ""}`}>
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full rounded-lg shadow-lg" />
            </div>
            <div>
              <h2 className="font-heading text-3xl font-bold text-navy mb-4">{s.title}</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-6">{s.desc}</p>
              <ul className="space-y-3">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-foreground">
                    <CheckCircle size={16} className="text-gold shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="py-24 bg-navy">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading subtitle="Packages" title="Choose Your Package" description="Flexible staffing packages designed for events of every size." light />
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {packages.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }} className={`rounded-lg p-8 ${p.highlight ? "bg-gold/10 border-2 border-gold" : "bg-navy-light border border-gold/20"}`}>
              {p.highlight && <span className="font-body text-xs uppercase tracking-wider text-gold bg-gold/20 px-3 py-1 rounded-full">Most Popular</span>}
              <h3 className="font-heading text-2xl font-bold text-primary-foreground mt-3 mb-1">{p.name}</h3>
              <p className="font-body text-gold font-semibold text-sm mb-2">{p.price}</p>
              <p className="font-body text-primary-foreground/60 text-sm mb-6">{p.desc}</p>
              <ul className="space-y-3 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 font-body text-sm text-primary-foreground/80">
                    <CheckCircle size={14} className="text-gold shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/booking" className={`block text-center py-3 rounded font-body font-semibold text-sm uppercase tracking-wider transition-colors ${p.highlight ? "bg-gold text-navy hover:bg-gold-dark" : "border border-gold text-gold hover:bg-gold/10"}`}>
                Get Started
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Services;
