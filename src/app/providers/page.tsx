"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stethoscope, ArrowLeft, Shield, Database, Users, BookOpen, ChartBar, Globe } from "lucide-react";
import Link from "next/link";

export default function ProvidersPage() {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-12">
        <Link 
          href="/" 
          className="inline-flex items-center text-primary-foreground/90 hover:text-primary-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center">
                <Shield className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">DermAssist for Healthcare Providers</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Advanced diagnostic tools and clinical decision support designed specifically for African dermatology
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground">Clinical Grade AI</Badge>
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground">HIPAA Compliant</Badge>
              <Badge variant="secondary" className="bg-white/20 text-primary-foreground">Research Ready</Badge>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Stethoscope className="h-6 w-6 text-primary" />
                  <CardTitle>Clinical Decision Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    AI-powered differential diagnosis with confidence scores
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Treatment recommendations based on local guidelines
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Referral pathway optimization
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="h-6 w-6 text-primary" />
                  <CardTitle>Patient Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Secure patient records and imaging
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Progress tracking and follow-ups
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Telemedicine integration
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Database className="h-6 w-6 text-primary" />
                  <CardTitle>Research & Analytics</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Contribute to African dermatology research
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Anonymized case study database
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Population health insights
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                  <CardTitle>Education & Training</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Continuing medical education modules
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Case-based learning library
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                    Cultural competency training
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Card className="shadow-medium max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Ready to Transform Your Practice?</CardTitle>
                <CardDescription>Join leading dermatologists across Africa who are using DermAssist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button variant="medical" className="flex-1">
                    Request Provider Access
                  </Button>
                  <Link href="/partnership" className="flex-1">
                    <Button variant="outline" className="w-full bg-white/10 border-white/30 text-foreground hover:bg-white/20">
                      Partnership Inquiry
                    </Button>
                  </Link>
                </div>
                <p className="text-sm text-muted-foreground">
                  Questions? Contact us at{" "}
                  <a href="mailto:providers@dermassist.com" className="text-primary hover:underline">
                    providers@dermassist.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
