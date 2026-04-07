import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/SectionHeading";
import teamImg from "@/assets/about-team.jpg";
import { Award, Heart, Target, Users } from "lucide-react";

const values = [
  { icon: Award, title: "Excellence", desc: "We hold ourselves to the highest standard in every detail of service delivery." },
  { icon: Heart, title: "Passion", desc: "Our team genuinely loves creating memorable experiences for your guests." },
  { icon: Target, title: "Precision", desc: "From timing to presentation, every element is carefully orchestrated." },
  { icon: Users, title: "Teamwork", desc: "We work as an extension of your planning team, seamlessly and professionally." },
];

const About = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-20 bg-navy">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
          About <span className="text-gold">Us</span>
        </motion.h1>
        <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto">
          The story behind the region's most trusted event staffing team.
        </p>
      </div>
    </section>

    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <span className="font-body text-sm uppercase tracking-[0.2em] text-gold font-medium">Our Story</span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mt-2 mb-6">Built on Service, Driven by Excellence</h2>
            <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
              <p>Elite Event Staffing was founded with a simple mission: to provide event hosts and planners with reliable, polished, and professional service staff they can count on every time.</p>
              <p>What started as a small team of passionate hospitality professionals has grown into a full-service staffing agency trusted by wedding planners, corporate event managers, and private hosts across the region.</p>
              <p>We hand-select every member of our team, ensuring they meet our rigorous standards for professionalism, presentation, and personality. Because when your event is on the line, you deserve the best.</p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <img src={teamImg} alt="Our professional team" loading="lazy" width={1200} height={800} className="w-full rounded-lg shadow-xl" />
          </motion.div>
        </div>
      </div>
    </section>

    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading subtitle="Our Values" title="What We Stand For" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} className="text-center p-8">
              <v.icon className="text-gold mx-auto mb-4" size={36} />
              <h3 className="font-heading text-lg font-bold text-navy mb-2">{v.title}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;
