import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import heroImg from "@/assets/hero-event.jpg";
import waitstaffImg from "@/assets/service-waitstaff.jpg";
import bartenderImg from "@/assets/service-bartender.jpg";
import chefImg from "@/assets/service-chef.jpg";

const images = [
  { src: gallery1, label: "Wedding Reception" },
  { src: gallery2, label: "Corporate Gala" },
  { src: gallery3, label: "Garden Party" },
  { src: gallery4, label: "Cocktail Hour" },
  { src: heroImg, label: "Black-Tie Event" },
  { src: waitstaffImg, label: "Dinner Service" },
  { src: bartenderImg, label: "Bar Service" },
  { src: chefImg, label: "Culinary Excellence" },
];

const Gallery = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-20 bg-navy">
      <div className="container mx-auto px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground mb-4">
          Event <span className="text-gold">Gallery</span>
        </motion.h1>
        <p className="font-body text-lg text-primary-foreground/70 max-w-2xl mx-auto">A showcase of events we've elevated with our premium staffing services.</p>
      </div>
    </section>

    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className="group relative aspect-[4/3] overflow-hidden rounded-lg">
              <img src={img.src} alt={img.label} loading="lazy" width={800} height={600} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/50 transition-colors duration-300 flex items-end">
                <span className="font-heading text-lg font-bold text-primary-foreground p-6 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">{img.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default Gallery;
