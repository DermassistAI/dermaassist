import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { 
  Brain, 
  Shield, 
  Award, 
  Users, 
  Camera, 
  FileText, 
  TrendingUp,
  CheckCircle,
  Globe,
  Lock,
  Zap,
  Star
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (view: 'landing' | 'submission' | 'feed' | 'admin', type?: 'provider' | 'admin') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation Header */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-foreground">DermAssist</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">AI-Powered Dermatology Research</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Button variant="ghost" size="sm" onClick={() => onNavigate('feed', 'provider')} className="hidden sm:inline-flex">
                Practice Feed
              </Button>
              <Button variant="outline" size="sm" onClick={() => onNavigate('admin', 'admin')}>
                Admin
              </Button>
              <Button size="sm" onClick={() => onNavigate('submission', 'provider')}>
                Submit Case
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background via-muted/30 to-secondary/10 py-12 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 text-xs sm:text-sm">
                  🌍 Advancing African Dermatology Research
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight">
                  Building the Largest Dataset of 
                  <span className="text-primary block">African Skin Conditions</span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl">
                  Empower healthcare providers to contribute de-identified dermatological data for AI-assisted research, 
                  advancing diagnosis and treatment for African and melanated skin.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  onClick={() => onNavigate('submission', 'provider')}
                >
                  <Camera className="mr-2 w-5 h-5" />
                  Submit Patient Case
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
                  onClick={() => onNavigate('feed', 'provider')}
                >
                  <Users className="mr-2 w-5 h-5" />
                  Practice Feed
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">De-identified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-muted-foreground">Secure</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square sm:aspect-[4/3] lg:aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1655720357761-f18ea9e5e7e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBZnJpY2FuJTIwd29tYW4lMjBkb2N0b3IlMjBkZXJtYXRvbG9neSUyMG1lZGljYWwlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU5ODY3OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="African healthcare professional"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6">
                <Card className="shadow-lg">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-6 h-6 text-primary" />
                      <div>
                        <p className="text-xl sm:text-2xl font-bold">5,000+</p>
                        <p className="text-xs text-muted-foreground">Cases Analyzed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6">
                <Card className="shadow-lg">
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-6 h-6 text-secondary" />
                      <div>
                        <p className="text-xl sm:text-2xl font-bold">23</p>
                        <p className="text-xs text-muted-foreground">Countries</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How DermAssist Works
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
              A simple, secure process to contribute valuable dermatological data while getting AI-powered insights.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">1. Capture & Upload</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Securely upload patient photos with automatic de-identification and metadata removal.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">2. De-identify</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Our system automatically removes all personally identifiable information to ensure complete privacy.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-2 hover:border-primary/50 transition-colors">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-accent" />
                </div>
                <CardTitle className="text-lg sm:text-xl">3. AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Multiple AI models analyze the case and provide insights while contributing to research.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Choose DermAssist?
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Earn CME Credits</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Contribute to research and earn continuing medical education credits for your professional development.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">AI-Powered Insights</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Get instant analysis from multiple state-of-the-art AI models specialized in dermatology.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Advance Research</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      Contribute to the largest dataset of African skin conditions, advancing healthcare for millions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Complete Privacy</h3>
                    <p className="text-muted-foreground text-sm sm:text-base">
                      HIPAA and GDPR compliant with automatic de-identification ensuring patient privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square sm:aspect-[4/3] lg:aspect-square relative rounded-2xl overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1659353886114-9aa119aef5aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVzZWFyY2glMjBkYXRhJTIwYW5hbHl0aWNzfGVufDF8fHx8MTc1OTg2Nzk5N3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medical research data analytics"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Making an Impact
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Join thousands of healthcare providers advancing dermatology research
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">5,000+</div>
              <div className="text-sm sm:text-base text-muted-foreground">Cases Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary mb-2">847</div>
              <div className="text-sm sm:text-base text-muted-foreground">Active Providers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-accent mb-2">23</div>
              <div className="text-sm sm:text-base text-muted-foreground">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-2">89%</div>
              <div className="text-sm sm:text-base text-muted-foreground">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Contribute to Dermatology Research?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8">
            Join the movement to advance healthcare for African and melanated skin conditions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4"
              onClick={() => onNavigate('submission', 'provider')}
            >
              <Zap className="mr-2 w-5 h-5" />
              Get Started Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border-white/30 text-white hover:bg-white/20"
              onClick={() => onNavigate('feed', 'provider')}
            >
              <Star className="mr-2 w-5 h-5" />
              Explore Practice Feed
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-bold">DermAssist</h3>
                <p className="text-xs text-background/70">Advancing African Dermatology</p>
              </div>
            </div>
            <div className="text-sm text-background/70 text-center md:text-right">
              <p>© 2024 DermAssist. All rights reserved.</p>
              <p className="mt-1">HIPAA Compliant • GDPR Compliant • Secure</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}