import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import TechStack from "../components/landing/TechStack";
import Stats from "../components/landing/Stats";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="bg-gray-950 text-white overflow-x-hidden">
      <Navbar />
      <Hero />
      <Features />
      <TechStack />
      <Stats />
      <CTA />
      <Footer />
    </div>
  );
}