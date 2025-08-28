import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart } from "lucide-react";
import heroImage from "@/assets/hero-dermatology.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--golden-sand))_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--terra-cotta))_0%,transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <Shield className="h-6 w-6 text-primary-foreground" />
              <span className="text-primary-foreground/90 font-medium">Equitable Dermatological Care</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
              DermAssist
              <span className="block text-3xl lg:text-4xl font-semibold text-primary-foreground/90 mt-2">
                AI for African Skin
              </span>
            </h1>
            
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl">
              The first Afrocentric digital dermatology assistant designed specifically for melanated skin. 
              Bridging the gap in dermatological care with culturally-aware AI and localized expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button variant="secondary" size="lg" className="group">
                <a href="/demo" className="flex items-center">
                  Try Demo
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
                For Healthcare Providers
                <Heart className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-3 gap-8 text-center lg:text-left">
              <div>
                <div className="text-2xl font-bold text-primary-foreground">10K+</div>
                <div className="text-sm text-primary-foreground/80">Cases Analyzed</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-foreground">95%</div>
                <div className="text-sm text-primary-foreground/80">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary-foreground">24/7</div>
                <div className="text-sm text-primary-foreground/80">Availability</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-medium">
              <img 
                src={heroImage} 
                alt="African healthcare professional using DermAssist for dermatology consultation"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-golden-sand/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-terra-cotta/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;