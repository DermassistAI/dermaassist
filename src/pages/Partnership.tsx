import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, ArrowLeft, Handshake, Building, Globe, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Partnership = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-6 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary-foreground/90 hover:text-primary-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center">
                <Handshake className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-primary-foreground mb-4">Partner with DermAssist</h1>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Join us in revolutionizing dermatological care across Africa through strategic partnerships
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <Building className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Healthcare Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Hospital system integration</li>
                  <li>• Staff training programs</li>
                  <li>• Custom deployment</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Government & NGOs</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Public health initiatives</li>
                  <li>• Community outreach</li>
                  <li>• Policy development</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Research Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Clinical trials</li>
                  <li>• Data collaboration</li>
                  <li>• Academic partnerships</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Partnership Inquiry</CardTitle>
              <CardDescription>Tell us about your organization and how we can work together</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name</Label>
                  <Input id="organizationName" placeholder="Your Organization" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="partnershipType">Partnership Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select partnership type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="healthcare">Healthcare Institution</SelectItem>
                      <SelectItem value="government">Government/NGO</SelectItem>
                      <SelectItem value="research">Research Partner</SelectItem>
                      <SelectItem value="technology">Technology Partner</SelectItem>
                      <SelectItem value="funding">Funding Partner</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Person</Label>
                  <Input id="contactName" placeholder="Full Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Title/Position</Label>
                  <Input id="title" placeholder="Your Title" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@organization.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ng">Nigeria</SelectItem>
                      <SelectItem value="ke">Kenya</SelectItem>
                      <SelectItem value="gh">Ghana</SelectItem>
                      <SelectItem value="za">South Africa</SelectItem>
                      <SelectItem value="et">Ethiopia</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationSize">Organization Size</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">1-50 employees</SelectItem>
                    <SelectItem value="medium">51-500 employees</SelectItem>
                    <SelectItem value="large">500+ employees</SelectItem>
                    <SelectItem value="government">Government Agency</SelectItem>
                    <SelectItem value="academic">Academic Institution</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Partnership Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Please describe your organization, your interest in partnering with DermAssist, and any specific collaboration ideas you have in mind..."
                  rows={5}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Expected Timeline</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="When would you like to start?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediately</SelectItem>
                    <SelectItem value="1-3months">1-3 months</SelectItem>
                    <SelectItem value="3-6months">3-6 months</SelectItem>
                    <SelectItem value="6months+">6+ months</SelectItem>
                    <SelectItem value="flexible">Flexible</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" variant="medical">
                Submit Partnership Inquiry
              </Button>
            </CardContent>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-primary-foreground/90">
              For immediate inquiries, contact us at{" "}
              <a href="mailto:partnerships@dermassist.com" className="text-white hover:underline">
                partnerships@dermassist.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;