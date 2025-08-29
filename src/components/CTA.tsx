import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--golden-sand))_0%,transparent_40%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,hsl(var(--terra-cotta))_0%,transparent_40%)]"></div>
      </div>
      
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Transform Dermatological Care?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-12">
            Join the movement toward equitable healthcare. Partner with DermAssist to bring 
            culturally-aware dermatological AI to your practice or community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Link to="/demo">
              <Button variant="secondary" size="lg" className="group">
                Schedule a Demo
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/partnership">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20">
                Request Partnership Info
              </Button>
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <Mail className="h-5 w-5" />
              <span>partnerships@dermassist.africa</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/90">
              <Phone className="h-5 w-5" />
              <span>+234 (0) 123 456 7890</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;