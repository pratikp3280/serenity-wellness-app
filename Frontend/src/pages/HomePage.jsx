
import { useNavigate } from "react-router-dom";

// Homepage components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import BreathingWidget from "../components/BreathingWidget";
import Programs from "../components/Programs";
import Notifications from "../components/Notifications";
import Testimonials from "../components/Testimonials";
import Blog from "../components/Blog";
import FAQ from "../components/FAQ";
import CTABanner from "../components/CTABanner";
import Footer from "../components/Footer";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-midnight">

      {/* Navigation */}
      <Navbar onRegister={() => navigate("/register")} />

      <main>

        {/* 1. Hero - Introduce Serenity */}
        <Hero onRegister={() => navigate("/register")} />

        {/* 2. How It Works - Explain the value */}
        <HowItWorks />

        {/* 3. Quick Experience - Let visitors try Serenity */}
        <BreathingWidget />

        {/* 4. Programs - Explore mindful experiences */}
        <Programs />

        {/* 5. Notifications - Encourage consistent practice */}
        <Notifications />

        {/* 6. Testimonials - Build trust through real reviews */}
        <Testimonials />

        {/* 7. Blog - Provide useful wellness knowledge */}
        <Blog />

        {/* 8. FAQ - Answer visitor questions */}
        <FAQ />

        {/* 9. Final CTA - Encourage visitors to get started */}
        <CTABanner />

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
