
import { useNavigate } from "react-router-dom";

// Existing homepage components
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Programs from "../components/Programs";
import BreathingWidget from "../components/BreathingWidget";
import Leaderboard from "../components/Leaderboard";
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

            <Navbar onRegister={() => navigate("/register")} />

            <main>
                <Hero onRegister={() => navigate("/register")} />

                <HowItWorks />

                <Programs />

                <BreathingWidget />

                <Leaderboard />

                <Notifications />

                <Testimonials />

                <Blog />

                <FAQ />

                <CTABanner />
            </main>

            <Footer />

        </div>
    );
}
