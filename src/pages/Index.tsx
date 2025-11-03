import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Video from "@/components/Video";
import GamePreview from "@/components/GamePreview";
import Consultation from "@/components/Consultation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Education />
      <Video />
      <GamePreview />
      <Consultation />
      <Footer />
    </div>
  );
};

export default Index;
