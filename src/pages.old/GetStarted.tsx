import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Stethoscope, ArrowLeft, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
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
        
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center">
                <Stethoscope className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">Get Started with DermAssist</h1>
            <p className="text-primary-foreground/90">Join the future of equitable dermatological care</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Heart className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>For Patients</CardTitle>
                    <CardDescription>Get personalized skin care guidance</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• AI-powered skin analysis</li>
                  <li>• Educational resources</li>
                  <li>• Dermatologist referrals</li>
                </ul>
                <Button variant="medical" className="w-full">Create Patient Account</Button>
              </CardContent>
            </Card>

            <Card className="shadow-medium">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <CardTitle>For Healthcare Providers</CardTitle>
                    <CardDescription>Clinical decision support tools</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                  <li>• Advanced diagnostic tools</li>
                  <li>• Patient management</li>
                  <li>• Research collaboration</li>
                </ul>
                <Link to="/providers">
                  <Button variant="outline" className="w-full bg-white/10 border-white/30 text-foreground hover:bg-white/20">
                    Provider Access
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Create Your Account</CardTitle>
              <CardDescription>Already have an account? <Link to="/sign-in" className="text-primary hover:underline">Sign in here</Link></CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
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
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <Button className="w-full" variant="medical">
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;