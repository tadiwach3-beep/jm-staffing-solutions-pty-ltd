import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Privacy = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-20 bg-navy">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Privacy Policy</h1>
      </div>
    </section>
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 max-w-3xl prose prose-sm font-body text-muted-foreground">
        <h2 className="font-heading text-2xl text-navy">Information We Collect</h2>
        <p>We collect information you provide directly to us, such as your name, email address, phone number, and event details when you submit a booking or contact form.</p>
        <h2 className="font-heading text-2xl text-navy">How We Use Your Information</h2>
        <p>We use the information to process your booking requests, communicate with you about our services, and improve our offerings. We do not sell your personal data.</p>
        <h2 className="font-heading text-2xl text-navy">Data Security</h2>
        <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, or destruction.</p>
        <h2 className="font-heading text-2xl text-navy">Contact</h2>
        <p>For questions about this policy, please contact us at info@eliteeventstaffing.com.</p>
      </div>
    </section>
    <Footer />
  </div>
);

export default Privacy;
