import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  Users, 
  Database, 
  MapPin, 
  BookOpen, 
  Stethoscope,
  Target,
  Globe
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Diagnosis",
      description: "Advanced machine learning trained specifically on melanated skin conditions for accurate diagnosis and triage.",
      color: "text-primary"
    },
    {
      icon: Users,
      title: "Inclusive Training Data",
      description: "Built with the largest annotated dataset of Black and African skin conditions for representative healthcare.",
      color: "text-accent"
    },
    {
      icon: Database,
      title: "Clinical Decision Support",
      description: "Evidence-based recommendations and treatment pathways tailored for African healthcare contexts.",
      color: "text-terra-cotta"
    },
    {
      icon: MapPin,
      title: "Localized Knowledge",
      description: "Regional expertise and cultural considerations integrated for contextually appropriate care delivery.",
      color: "text-sage-green"
    },
    {
      icon: BookOpen,
      title: "Educational Platform",
      description: "Comprehensive learning resources for both healthcare providers and patients about skin health.",
      color: "text-medical-blue"
    },
    {
      icon: Stethoscope,
      title: "Early Intervention",
      description: "Smart alerts and referral guidance to enable timely intervention in low-resource settings.",
      color: "text-deep-earth"
    },
    {
      icon: Target,
      title: "Precision Medicine",
      description: "Personalized treatment recommendations based on individual patient characteristics and local factors.",
      color: "text-primary"
    },
    {
      icon: Globe,
      title: "Data Sovereignty",
      description: "Local data ownership and privacy protection while contributing to global dermatological research.",
      color: "text-accent"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Revolutionizing Dermatological Care
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            DermAssist combines cutting-edge AI technology with deep cultural understanding 
            to deliver equitable, accurate, and accessible dermatological care across Africa.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="bg-gradient-card hover:shadow-soft transition-all duration-300 border-border/50">
                <CardHeader className="pb-4">
                  <div className={`w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 ${feature.color}`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;