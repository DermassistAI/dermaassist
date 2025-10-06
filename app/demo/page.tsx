'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  Camera, 
  User, 
  Brain, 
  FileText, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowLeft,
  Download
} from "lucide-react";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

type DemoStep = 'upload' | 'history' | 'analyzing' | 'results';

interface PatientInfo {
  age?: string;
  gender?: string;
  skinTone?: string;
  location?: string;
  duration?: string;
  symptoms?: string;
  currentTreatments?: string;
  triggers?: string;
  familyHistory?: string;
}

interface AnalysisResults {
  primaryDiagnosis: {
    condition: string;
    confidence: number;
    severity: string;
    description: string;
  };
  differentials: Array<{
    condition: string;
    probability: number;
    rationale: string;
  }>;
  culturalConsiderations: string[];
  recommendations: string[];
  followUp?: string;
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState<DemoStep>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({});
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast({
          title: "Image uploaded successfully",
          description: "Ready to proceed to patient history",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    setCurrentStep('analyzing');
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientInfo,
          imageData: uploadedImage,
        }),
      });

      clearInterval(progressInterval);
      setAnalysisProgress(100);

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setAnalysisResults(data.analysis);
      
      setTimeout(() => {
        setCurrentStep('results');
        setIsAnalyzing(false);
      }, 500);

      toast({
        title: "Analysis complete",
        description: "AI has completed the diagnostic assessment",
      });
    } catch (error) {
      clearInterval(progressInterval);
      setIsAnalyzing(false);
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing the skin condition. Please try again.",
        variant: "destructive",
      });
      setCurrentStep('history');
    }
  };

  const resetDemo = () => {
    setCurrentStep('upload');
    setUploadedImage(null);
    setAnalysisProgress(0);
    setPatientInfo({});
    setAnalysisResults(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              DermAssist Clinical Demo
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience how DermAssist analyzes skin conditions with culturally-aware AI powered by Azure OpenAI. 
              This demo provides real AI-powered diagnostic workflow.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between relative">
                <div className={`flex items-center gap-2 ${currentStep === 'upload' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'upload' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Upload className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block font-medium">Upload</span>
                </div>
                
                <div className="flex-1 h-1 bg-muted mx-4" />
                
                <div className={`flex items-center gap-2 ${currentStep === 'history' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'history' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <User className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block font-medium">History</span>
                </div>
                
                <div className="flex-1 h-1 bg-muted mx-4" />
                
                <div className={`flex items-center gap-2 ${currentStep === 'analyzing' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'analyzing' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <Brain className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block font-medium">Analyzing</span>
                </div>
                
                <div className="flex-1 h-1 bg-muted mx-4" />
                
                <div className={`flex items-center gap-2 ${currentStep === 'results' ? 'text-primary' : 'text-muted-foreground'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep === 'results' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <FileText className="h-5 w-5" />
                  </div>
                  <span className="hidden md:block font-medium">Results</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Step */}
          {currentStep === 'upload' && (
            <Card className="max-w-2xl mx-auto bg-gradient-card border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Upload Skin Image
                </CardTitle>
                <CardDescription>
                  Upload a clear photo of the affected skin area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    {uploadedImage ? (
                      <div>
                        <img
                          src={uploadedImage}
                          alt="Uploaded skin condition"
                          className="max-h-64 mx-auto rounded-lg shadow-soft mb-4"
                        />
                        <p className="text-sm text-muted-foreground">Click to change image</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium text-foreground mb-2">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-muted-foreground">
                          PNG, JPG up to 10MB
                        </p>
                      </div>
                    )}
                  </label>
                </div>

                <Button
                  variant="hero"
                  size="lg"
                  className="w-full"
                  onClick={() => setCurrentStep('history')}
                  disabled={!uploadedImage}
                >
                  Continue to Patient History
                  <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Patient History Step */}
          {currentStep === 'history' && (
            <Card className="max-w-4xl mx-auto bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Patient History & Information
                </CardTitle>
                <CardDescription>
                  Provide patient details for more accurate diagnosis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input 
                      id="age" 
                      placeholder="e.g., 28"
                      value={patientInfo.age || ''}
                      onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="gender">Gender</Label>
                    <Select 
                      value={patientInfo.gender}
                      onValueChange={(value) => setPatientInfo({...patientInfo, gender: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                        <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="skin-tone">Skin Tone (Fitzpatrick Scale)</Label>
                    <Select
                      value={patientInfo.skinTone}
                      onValueChange={(value) => setPatientInfo({...patientInfo, skinTone: value})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select skin tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="type-1">Type I - Very Fair</SelectItem>
                        <SelectItem value="type-2">Type II - Fair</SelectItem>
                        <SelectItem value="type-3">Type III - Medium</SelectItem>
                        <SelectItem value="type-4">Type IV - Olive</SelectItem>
                        <SelectItem value="type-5">Type V - Brown</SelectItem>
                        <SelectItem value="type-6">Type VI - Dark Brown/Black</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g., Face, Arms, Legs"
                      value={patientInfo.location || ''}
                      onChange={(e) => setPatientInfo({...patientInfo, location: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration of Symptoms</Label>
                  <Input 
                    id="duration" 
                    placeholder="e.g., 2 weeks, 3 months"
                    value={patientInfo.duration || ''}
                    onChange={(e) => setPatientInfo({...patientInfo, duration: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="symptoms">Symptoms & Description</Label>
                  <Textarea 
                    id="symptoms"
                    placeholder="Describe the symptoms: itching, burning, pain, changes in appearance..."
                    className="min-h-24"
                    value={patientInfo.symptoms || ''}
                    onChange={(e) => setPatientInfo({...patientInfo, symptoms: e.target.value})}
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="treatments">Current Treatments</Label>
                    <Textarea 
                      id="treatments"
                      placeholder="e.g., topical creams, medications..."
                      className="min-h-20"
                      value={patientInfo.currentTreatments || ''}
                      onChange={(e) => setPatientInfo({...patientInfo, currentTreatments: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="triggers">Known Triggers</Label>
                    <Textarea 
                      id="triggers"
                      placeholder="e.g., stress, weather, products, foods..."
                      className="min-h-20"
                      value={patientInfo.triggers || ''}
                      onChange={(e) => setPatientInfo({...patientInfo, triggers: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="family-history">Family History</Label>
                  <Textarea 
                    id="family-history"
                    placeholder="Any relevant family history of skin conditions..."
                    className="min-h-16"
                    value={patientInfo.familyHistory || ''}
                    onChange={(e) => setPatientInfo({...patientInfo, familyHistory: e.target.value})}
                  />
                </div>
                
                <Separator />
                
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    onClick={() => setCurrentStep('upload')}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Upload
                  </Button>
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                  >
                    Analyze with AI
                    <Brain className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Analysis Step */}
          {currentStep === 'analyzing' && (
            <Card className="max-w-4xl mx-auto bg-gradient-card border-border/50">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Brain className="h-5 w-5 text-primary animate-pulse" />
                  AI Analysis in Progress
                </CardTitle>
                <CardDescription>
                  DermAssist is analyzing with Azure OpenAI GPT-4 mini and culturally-aware models
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Progress value={analysisProgress} className="w-full" />
                  <p className="text-center text-muted-foreground">
                    {Math.round(analysisProgress)}% complete
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Image Processing</p>
                        <p className="text-sm text-muted-foreground">Analyzing skin condition patterns</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1 animate-pulse" />
                      <div>
                        <p className="font-medium">AI Assessment</p>
                        <p className="text-sm text-muted-foreground">Comparing with medical knowledge base</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Cultural Analysis</p>
                        <p className="text-sm text-muted-foreground">Considering melanated skin characteristics</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-1 animate-pulse" />
                      <div>
                        <p className="font-medium">Generating Report</p>
                        <p className="text-sm text-muted-foreground">Creating comprehensive assessment</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Step */}
          {currentStep === 'results' && analysisResults && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Diagnostic Assessment</h2>
                <Button onClick={resetDemo} variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  New Analysis
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Primary Diagnosis */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                      Primary Diagnosis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {analysisResults.primaryDiagnosis.condition}
                      </h3>
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="outline" className="text-base">
                          Confidence: {analysisResults.primaryDiagnosis.confidence}%
                        </Badge>
                        <Badge variant="secondary" className="text-base">
                          {analysisResults.primaryDiagnosis.severity}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {analysisResults.primaryDiagnosis.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Uploaded Image */}
                {uploadedImage && (
                  <Card className="bg-gradient-card border-border/50">
                    <CardHeader>
                      <CardTitle>Analyzed Image</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <img
                        src={uploadedImage}
                        alt="Analyzed skin condition"
                        className="w-full rounded-lg shadow-soft"
                      />
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Differential Diagnoses */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-primary" />
                    Differential Diagnoses
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analysisResults.differentials.map((diff, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border bg-background/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{diff.condition}</h4>
                        <Badge variant="outline">{diff.probability}%</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{diff.rationale}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Cultural Considerations */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-golden-sand" />
                    Cultural & Demographic Considerations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {analysisResults.culturalConsiderations.map((consideration, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-golden-sand rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-muted-foreground">{consideration}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-medical-blue" />
                    Treatment Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {analysisResults.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-medical-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-sm font-medium text-medical-blue">{index + 1}</span>
                        </div>
                        <span className="text-muted-foreground flex-1">{rec}</span>
                      </li>
                    ))}
                  </ol>

                  {analysisResults.followUp && (
                    <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        Follow-up Recommendation
                      </h4>
                      <p className="text-sm text-muted-foreground">{analysisResults.followUp}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Disclaimer */}
              <Card className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                        Medical Disclaimer
                      </p>
                      <p className="text-sm text-amber-800 dark:text-amber-200">
                        This AI analysis is for educational and informational purposes only and should not replace professional medical advice. 
                        Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center gap-4">
                <Button variant="outline" size="lg">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                <Button variant="hero" size="lg" onClick={resetDemo}>
                  Start New Analysis
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
