import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen">
    <Navbar />
    <section className="pt-32 pb-20 bg-navy">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground">Terms of Service</h1>
      </div>
    </section>
    <section className="py-24 bg-cream">
      <div className="container mx-auto px-4 max-w-3xl prose prose-sm font-body text-muted-foreground">
        <h2 className="font-heading text-2xl text-navy">Booking & Cancellation</h2>
        <p>All bookings are subject to availability. A deposit may be required to confirm your reservation. Cancellations made within 48 hours of the event may incur a fee.</p>
        <h2 className="font-heading text-2xl text-navy">Service Terms</h2>
        <p>Our staff will arrive at the agreed-upon time in professional attire. Overtime beyond the contracted hours will be billed at an additional rate.</p>
        <h2 className="font-heading text-2xl text-navy">Liability</h2>
        <p>Elite Event Staffing carries comprehensive liability insurance. We are not responsible for damages resulting from client-provided equipment or venues.</p>
        <h2 className="font-heading text-2xl text-navy">Changes</h2>
        <p>We reserve the right to update these terms. Continued use of our services constitutes acceptance of updated terms.</p>
      </div>
    </section>
    <Footer />
  </div>
);

export default Terms;
