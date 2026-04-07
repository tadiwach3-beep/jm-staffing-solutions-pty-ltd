import { motion } from "framer-motion";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
  description?: string;
  light?: boolean;
}

const SectionHeading = ({ subtitle, title, description, light }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6 }}
    className="text-center max-w-2xl mx-auto mb-14"
  >
    {subtitle && (
      <span className="font-body text-sm uppercase tracking-[0.2em] text-gold font-medium">
        {subtitle}
      </span>
    )}
    <h2
      className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4 ${
        light ? "text-primary-foreground" : "text-navy"
      }`}
    >
      {title}
    </h2>
    <div className="w-16 h-0.5 bg-gold mx-auto mb-4" />
    {description && (
      <p className={`font-body text-base leading-relaxed ${light ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeading;
