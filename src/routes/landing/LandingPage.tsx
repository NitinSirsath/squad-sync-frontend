import CTABanner from "./components/cta-banner";
import FAQ from "./components/faq";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import { Navbar } from "./components/navbar";
import Pricing from "./components/pricing";
import Testimonials from "./components/testimonials";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Testimonials />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default LandingPage;
