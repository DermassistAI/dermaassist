import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Shield } from "lucide-react";

const About = () => {
  const stats = [
    { number: "50+", label: "Healthcare Institutions", icon: Users },
    { number: "15", label: "African Countries", icon: Award },
    { number: "100K+", label: "Patient Records", icon: Shield },
    { number: "99.2%", label: "Data Security", icon: CheckCircle }
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Bridging the Healthcare Equity Gap
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              DermAssist was born from the recognition that traditional medical AI systems 
              have historically underrepresented melanated skin in their training data, 
              leading to diagnostic disparities and inequitable healthcare outcomes.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Culturally Aware Technology</h4>
                  <p className="text-muted-foreground">AI trained on diverse African skin types and conditions</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Local Expertise Integration</h4>
                  <p className="text-muted-foreground">Collaboration with African dermatologists and healthcare providers</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground">Accessible Healthcare</h4>
                  <p className="text-muted-foreground">Designed for low-resource settings with offline capabilities</p>
                </div>
              </div>
            </div>
            
            <Button variant="medical" size="lg" className="mb-8">
              Learn About Our Mission
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="text-center bg-background border-border/50 hover:shadow-soft transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <IconComponent className="h-8 w-8 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;