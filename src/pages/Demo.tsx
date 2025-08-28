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

const Demo = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const { toast } = useToast();

  const mockResults = {
    primaryDiagnosis: {
      condition: "Seborrheic Dermatitis",
      confidence: 92,
      severity: "Moderate",
      description: "Inflammatory skin condition commonly affecting areas rich in sebaceous glands, particularly prevalent in individuals with darker skin tones."
    },
    differentials: [
      { condition: "Atopic Dermatitis", probability: 78, rationale: "Similar presentation with scaling and inflammation" },
      { condition: "Tinea Versicolor", probability: 65, rationale: "Hypopigmented patches in similar distribution" },
      { condition: "Post-inflammatory Hyperpigmentation", probability: 45, rationale: "Secondary to chronic inflammation" }
    ],
    culturalConsiderations: [
      "Higher prevalence in African populations due to genetic factors",
      "Often presents with more pronounced hyperpigmentation",
      "May be misdiagnosed due to underrepresentation in medical literature"
    ],
    recommendations: [
      "Ketoconazole 2% shampoo twice weekly",
      "Gentle, fragrance-free moisturizer",
      "Avoid harsh soaps and hot water",
      "Consider dermatology referral if no improvement in 4-6 weeks"
    ]
  };

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

  const handleAnalyze = () => {
    setCurrentStep('analyzing');
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => setCurrentStep('results'), 500);
      }
      setAnalysisProgress(progress);
    }, 300);
  };

  const resetDemo = () => {
    setCurrentStep('upload');
    setUploadedImage(null);
    setAnalysisProgress(0);
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
              Experience how DermAssist analyzes skin conditions with culturally-aware AI. 
              This demo simulates the complete diagnostic workflow.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 'upload' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Upload className="h-4 w-4" />
                <span className="font-medium">Upload</span>
              </div>
              <div className="h-px w-12 bg-border"></div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 'history' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <User className="h-4 w-4" />
                <span className="font-medium">History</span>
              </div>
              <div className="h-px w-12 bg-border"></div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 'analyzing' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <Brain className="h-4 w-4" />
                <span className="font-medium">Analysis</span>
              </div>
              <div className="h-px w-12 bg-border"></div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === 'results' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                <FileText className="h-4 w-4" />
                <span className="font-medium">Results</span>
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {/* Image Upload Step */}
            {currentStep === 'upload' && (
              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Camera className="h-5 w-5 text-primary" />
                    Upload Skin Image
                  </CardTitle>
                  <CardDescription>
                    Upload a clear, well-lit image of the skin condition. Ensure good lighting and focus.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded skin condition"
                          className="max-h-64 mx-auto rounded-lg shadow-soft"
                        />
                        <div className="flex items-center justify-center gap-2 text-sage-green">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Image uploaded successfully</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
                        <div>
                          <p className="text-lg font-medium text-foreground mb-2">
                            Drag and drop your image here
                          </p>
                          <p className="text-muted-foreground">
                            Supports JPG, PNG up to 10MB
                          </p>
                        </div>
                        <Label htmlFor="image-upload" className="cursor-pointer">
                          <Button variant="medical" asChild>
                            <span>Browse Files</span>
                          </Button>
                        </Label>
                        <Input 
                          id="image-upload" 
                          type="file" 
                          accept="image/*" 
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </div>
                    )}
                  </div>
                  
                  {uploadedImage && (
                    <div className="flex justify-center">
                      <Button 
                        onClick={() => setCurrentStep('history')}
                        variant="hero"
                        size="lg"
                      >
                        Continue to Patient History
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Patient History Step */}
            {currentStep === 'history' && (
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-primary" />
                    Patient History & Clinical Information
                  </CardTitle>
                  <CardDescription>
                    Provide relevant clinical context to enhance diagnostic accuracy
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="age">Patient Age</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select age range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-18">0-18 years</SelectItem>
                            <SelectItem value="19-35">19-35 years</SelectItem>
                            <SelectItem value="36-50">36-50 years</SelectItem>
                            <SelectItem value="51-65">51-65 years</SelectItem>
                            <SelectItem value="65+">65+ years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="skin-type">Fitzpatrick Skin Type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select skin type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IV">Type IV - Moderate brown</SelectItem>
                            <SelectItem value="V">Type V - Dark brown</SelectItem>
                            <SelectItem value="VI">Type VI - Very dark</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label htmlFor="duration">Duration of Condition</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="How long present?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="days">Few days</SelectItem>
                            <SelectItem value="weeks">Few weeks</SelectItem>
                            <SelectItem value="months">Few months</SelectItem>
                            <SelectItem value="years">Years</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="symptoms">Associated Symptoms</Label>
                        <Textarea 
                          id="symptoms"
                          placeholder="e.g., itching, burning, pain, scaling..."
                          className="min-h-20"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="triggers">Known Triggers</Label>
                        <Textarea 
                          id="triggers"
                          placeholder="e.g., stress, weather, products, foods..."
                          className="min-h-20"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="family-history">Family History</Label>
                    <Textarea 
                      id="family-history"
                      placeholder="Any relevant family history of skin conditions..."
                      className="min-h-16"
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
              <Card className="bg-gradient-card border-border/50">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Brain className="h-5 w-5 text-primary animate-pulse" />
                    AI Analysis in Progress
                  </CardTitle>
                  <CardDescription>
                    DermAssist is analyzing the image with culturally-aware AI models
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
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-sage-green rounded-full animate-pulse"></div>
                        <span className="text-sm">Image preprocessing and enhancement</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-sage-green rounded-full animate-pulse"></div>
                        <span className="text-sm">Feature extraction and pattern recognition</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-sage-green rounded-full animate-pulse"></div>
                        <span className="text-sm">Comparing with melanated skin database</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm">Cultural context integration</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm">Differential diagnosis generation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        <span className="text-sm">Treatment recommendations</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Step */}
            {currentStep === 'results' && (
              <div className="space-y-6">
                {/* Primary Diagnosis */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-sage-green" />
                      Primary Diagnosis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-foreground">
                        {mockResults.primaryDiagnosis.condition}
                      </h3>
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {mockResults.primaryDiagnosis.confidence}% confidence
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">
                      {mockResults.primaryDiagnosis.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">
                        Severity: {mockResults.primaryDiagnosis.severity}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Differential Diagnoses */}
                <Card className="bg-gradient-card border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="h-5 w-5 text-terra-cotta" />
                      Differential Diagnoses
                    </CardTitle>
                    <CardDescription>
                      Alternative conditions to consider based on the clinical presentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {mockResults.differentials.map((diff, index) => (
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
                      {mockResults.culturalConsiderations.map((consideration, index) => (
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
                      {mockResults.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-medical-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-sm font-medium text-medical-blue">{index + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{rec}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex justify-between">
                  <Button variant="outline" onClick={resetDemo}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Try Another Case
                  </Button>
                  <div className="space-x-4">
                    <Button variant="secondary">
                      <Download className="h-4 w-4 mr-2" />
                      Export Report
                    </Button>
                    <Button variant="medical">
                      Schedule Follow-up
                      <Clock className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;