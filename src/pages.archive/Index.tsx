import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        {/* <div id="features">
          <Features />
        </div> */}
        {/* <div id="about">
          <About />
        </div> */}
        {/* <div id="contact">
          <CTA />
        </div> */}
      </main>
      <Footer />
    </div>
  );
};

export default Index;