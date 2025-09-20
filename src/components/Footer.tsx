import { Stethoscope, Mail, MapPin, Phone, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-deep-earth text-warm-ivory">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">DermAssist</span>
            </div>
            <p className="text-warm-ivory/80 mb-6 max-w-md">
              Advancing equitable dermatological care through Afrocentric AI technology. 
              Building trust, improving outcomes, and fostering inclusive healthcare across Africa.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-warm-ivory/10 flex items-center justify-center hover:bg-warm-ivory/20 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-warm-ivory/10 flex items-center justify-center hover:bg-warm-ivory/20 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Platform</h4>
            <nav className="space-y-4">
              <a href="/demo" className="block text-warm-ivory/80 hover:text-warm-ivory transition-colors">
                Demo
              </a>
            </nav>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-warm-ivory/80">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">KNH, Nairobi</span>
              </div>
              <div className="flex items-center gap-3 text-warm-ivory/80">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">info@dermassistai.com</span>
              </div>
              <div className="flex items-center gap-3 text-warm-ivory/80">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm">+254 740 695944</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-warm-ivory/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-warm-ivory/60 text-sm">
            © 2024 DermAssist. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-warm-ivory/60">
            <a href="/privacy" className="hover:text-warm-ivory transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-warm-ivory transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-warm-ivory transition-colors">Data Protection</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;