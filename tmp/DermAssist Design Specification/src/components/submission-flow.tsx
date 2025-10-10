import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  ArrowRight, 
  Upload, 
  Camera, 
  Shield, 
  Brain, 
  FileText, 
  Globe, 
  Activity, 
  Stethoscope,
  Download,
  Home,
  Users
} from 'lucide-react';

interface SubmissionFlowProps {
  onNavigate: (view: 'landing' | 'submission' | 'feed' | 'admin', type?: 'provider' | 'admin') => void;
}

type Step = 'license' | 'photo' | 'model' | 'clinical' | 'social' | 'diagnosis' | 'treatment' | 'review' | 'analysis' | 'results';

interface FormData {
  license: {
    number: string;
    issuingBody: string;
    document?: File;
  };
  photo?: File;
  selectedModel: string;
  clinical: {
    duration: string;
    treatments: string;
    pain: number;
    familyHistory: string;
  };
  social: {
    geography: string;
    climate: string;
    occupation: string;
    sunExposure: string;
    skincare: string;
  };
  diagnosis: {
    icd11: string;
    suggestions: string[];
  };
  treatment: {
    options: string[];
    tried: string[];
    current: string[];
    planned: string[];
  };
}

const aiModels = [
  {
    id: 'claude',
    name: 'Claude 4.5',
    speed: 'Fast',
    accuracy: 'High',
    strengths: 'Complex reasoning, detailed analysis',
    description: 'Advanced language model with excellent medical knowledge'
  },
  {
    id: 'gemini',
    name: 'Gemini',
    speed: 'Very Fast',
    accuracy: 'High',
    strengths: 'Multi-modal analysis, visual understanding',
    description: 'Google\'s flagship model with strong visual capabilities'
  },
  {
    id: 'gpt5',
    name: 'GPT-5',
    speed: 'Medium',
    accuracy: 'Very High',
    strengths: 'Comprehensive analysis, latest training',
    description: 'OpenAI\'s most advanced model with medical fine-tuning'
  },
  {
    id: 'gpt5-mini',
    name: 'GPT-5 Mini',
    speed: 'Very Fast',
    accuracy: 'Medium',
    strengths: 'Quick diagnosis, efficient processing',
    description: 'Lightweight version optimized for speed'
  },
  {
    id: 'qwen',
    name: 'Qwen',
    speed: 'Fast',
    accuracy: 'High',
    strengths: 'Multilingual, diverse training data',
    description: 'Alibaba\'s model with strong international perspective'
  }
];

const commonDiagnoses = [
  'Atopic dermatitis',
  'Psoriasis',
  'Contact dermatitis',
  'Seborrheic dermatitis',
  'Vitiligo',
  'Melasma',
  'Acne vulgaris',
  'Eczema',
  'Keloid scars',
  'Post-inflammatory hyperpigmentation'
];

const treatmentOptions = [
  { id: 'topical', name: 'Topical Medications', icon: '💊' },
  { id: 'systemic', name: 'Systemic Therapy', icon: '💉' },
  { id: 'phototherapy', name: 'Phototherapy', icon: '💡' },
  { id: 'lifestyle', name: 'Lifestyle Changes', icon: '🌱' },
  { id: 'surgery', name: 'Surgical Intervention', icon: '🔬' },
  { id: 'laser', name: 'Laser Therapy', icon: '⚡' }
];

export function SubmissionFlow({ onNavigate }: SubmissionFlowProps) {
  const [currentStep, setCurrentStep] = useState<Step>('license');
  const [formData, setFormData] = useState<FormData>({
    license: { number: '', issuingBody: '' },
    selectedModel: '',
    clinical: { duration: '', treatments: '', pain: 3, familyHistory: '' },
    social: { geography: '', climate: '', occupation: '', sunExposure: '', skincare: '' },
    diagnosis: { icd11: '', suggestions: [] },
    treatment: { options: [], tried: [], current: [], planned: [] }
  });
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const steps: Step[] = ['license', 'photo', 'model', 'clinical', 'social', 'diagnosis', 'treatment', 'review', 'analysis', 'results'];
  const currentStepIndex = steps.indexOf(currentStep);
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const nextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      const nextStepName = steps[nextIndex];
      setCurrentStep(nextStepName);
      
      if (nextStepName === 'analysis') {
        // Simulate analysis progress
        setAnalysisProgress(0);
        const interval = setInterval(() => {
          setAnalysisProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              setTimeout(() => setCurrentStep('results'), 1000);
              return 100;
            }
            return prev + 2;
          });
        }, 100);
      }
    }
  };

  const prevStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex]);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'license':
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Verify Medical License</CardTitle>
              <CardDescription>
                We need to verify your medical license to ensure data quality and compliance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="license-number">License Number</Label>
                <Input
                  id="license-number"
                  placeholder="Enter your medical license number"
                  value={formData.license.number}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    license: { ...prev.license, number: e.target.value }
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="issuing-body">Issuing Body</Label>
                <Select
                  value={formData.license.issuingBody}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    license: { ...prev.license, issuingBody: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select issuing authority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="state-medical-board">State Medical Board</SelectItem>
                    <SelectItem value="national-medical-council">National Medical Council</SelectItem>
                    <SelectItem value="specialty-board">Specialty Board</SelectItem>
                    <SelectItem value="international">International Authority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Upload License Document (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, JPG, PNG up to 10MB</p>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent-data" />
                  <label htmlFor="consent-data" className="text-sm leading-5">
                    I consent to contributing anonymized case data to dermatology research
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent-hipaa" />
                  <label htmlFor="consent-hipaa" className="text-sm leading-5">
                    I confirm this data will be completely de-identified per HIPAA guidelines
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="consent-terms" />
                  <label htmlFor="consent-terms" className="text-sm leading-5">
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'photo':
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Capture Patient Photo</CardTitle>
              <CardDescription>
                Upload a clear photo of the skin condition. Our system will automatically de-identify the image.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium">Upload or Take Photo</p>
                  <p className="text-sm text-muted-foreground">
                    Ensure good lighting and clear visibility of the condition
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
                  <Button variant="outline">
                    <Upload className="mr-2 w-4 h-4" />
                    Upload File
                  </Button>
                  <Button variant="outline">
                    <Camera className="mr-2 w-4 h-4" />
                    Take Photo
                  </Button>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Automatic De-identification</h4>
                    <p className="text-xs text-muted-foreground">
                      • All metadata will be automatically removed<br />
                      • Facial features will be blurred if detected<br />
                      • Location data will be stripped<br />
                      • Image will be processed for anonymization
                    </p>
                  </div>
                </div>
              </div>

              {formData.photo && (
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Uploaded Image</span>
                      <Badge variant="secondary">De-identified</Badge>
                    </div>
                    <div className="bg-muted/50 rounded h-32 flex items-center justify-center">
                      <p className="text-sm text-muted-foreground">Image Preview (De-identified)</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <p className="font-medium">Quality Check</p>
                      <p className="text-green-600">✓ Image resolution: Good</p>
                      <p className="text-green-600">✓ Lighting: Adequate</p>
                      <p className="text-green-600">✓ Focus: Sharp</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Privacy Status</p>
                      <p className="text-green-600">✓ Metadata removed</p>
                      <p className="text-green-600">✓ No faces detected</p>
                      <p className="text-green-600">✓ Location stripped</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'model':
        return (
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Choose AI Analysis Model</CardTitle>
              <CardDescription>
                Select the AI model that best fits your analysis needs. Each model has different strengths and processing speeds.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiModels.map((model) => (
                  <Card 
                    key={model.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      formData.selectedModel === model.id ? 'ring-2 ring-primary bg-primary/5' : ''
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, selectedModel: model.id }))}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{model.name}</CardTitle>
                        {formData.selectedModel === model.id && (
                          <Badge className="bg-primary">Selected</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">{model.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Speed:</span>
                          <Badge variant="outline" className="text-xs">{model.speed}</Badge>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-muted-foreground">Accuracy:</span>
                          <Badge variant="outline" className="text-xs">{model.accuracy}</Badge>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium">Strengths:</span> {model.strengths}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'clinical':
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Clinical History</CardTitle>
              <CardDescription>
                Provide relevant clinical information to help with accurate analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>How long has this condition been present?</Label>
                <Select
                  value={formData.clinical.duration}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    clinical: { ...prev.clinical, duration: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">Days</SelectItem>
                    <SelectItem value="weeks">Weeks</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                    <SelectItem value="years">Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Previous treatments tried</Label>
                <Textarea
                  placeholder="List any medications, treatments, or remedies previously used..."
                  value={formData.clinical.treatments}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    clinical: { ...prev.clinical, treatments: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-4">
                <Label>Pain/Discomfort Level (0-10)</Label>
                <div className="px-3">
                  <Slider
                    value={[formData.clinical.pain]}
                    onValueChange={([value]) => setFormData(prev => ({
                      ...prev,
                      clinical: { ...prev.clinical, pain: value }
                    }))}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>No pain</span>
                    <span className="font-medium">{formData.clinical.pain}</span>
                    <span>Severe pain</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Family history of skin conditions</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['None', 'Eczema', 'Psoriasis', 'Vitiligo', 'Skin cancer', 'Other'].map((condition) => (
                    <Button
                      key={condition}
                      variant={formData.clinical.familyHistory === condition ? "default" : "outline"}
                      size="sm"
                      className="text-xs sm:text-sm"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        clinical: { ...prev.clinical, familyHistory: condition }
                      }))}
                    >
                      {condition}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'social':
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Social & Environmental Factors</CardTitle>
              <CardDescription>
                Environmental and lifestyle factors can significantly impact skin conditions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Geographic region</Label>
                <Select
                  value={formData.social.geography}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    social: { ...prev.social, geography: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tropical">Tropical</SelectItem>
                    <SelectItem value="subtropical">Subtropical</SelectItem>
                    <SelectItem value="temperate">Temperate</SelectItem>
                    <SelectItem value="arid">Arid/Desert</SelectItem>
                    <SelectItem value="polar">Polar/Cold</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Climate characteristics</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: '☀️', label: 'Sunny' },
                    { icon: '💧', label: 'Humid' },
                    { icon: '🌬️', label: 'Dry' },
                    { icon: '❄️', label: 'Cold' },
                    { icon: '🌡️', label: 'Hot' },
                    { icon: '🌧️', label: 'Rainy' }
                  ].map((climate) => (
                    <Button
                      key={climate.label}
                      variant={formData.social.climate === climate.label ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, climate: climate.label }
                      }))}
                    >
                      {climate.icon} {climate.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Occupation type</Label>
                <Select
                  value={formData.social.occupation}
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    social: { ...prev.social, occupation: value }
                  }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select occupation type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indoor">Indoor work</SelectItem>
                    <SelectItem value="outdoor">Outdoor work</SelectItem>
                    <SelectItem value="mixed">Mixed indoor/outdoor</SelectItem>
                    <SelectItem value="healthcare">Healthcare worker</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Sun exposure level</Label>
                <div className="grid grid-cols-4 gap-2">
                  {['Minimal', 'Low', 'Moderate', 'High'].map((level) => (
                    <Button
                      key={level}
                      variant={formData.social.sunExposure === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, sunExposure: level }
                      }))}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Skincare routine</Label>
                <Textarea
                  placeholder="Describe daily skincare products and routine..."
                  value={formData.social.skincare}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    social: { ...prev.social, skincare: e.target.value }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        );

      case 'diagnosis':
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Stethoscope className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>ICD-11 Diagnosis Suggestion</CardTitle>
              <CardDescription>
                Provide your preliminary diagnosis or select from common conditions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>ICD-11 Code or Condition Name</Label>
                <Input
                  placeholder="Search ICD-11 codes or condition names..."
                  value={formData.diagnosis.icd11}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    diagnosis: { ...prev.diagnosis, icd11: e.target.value }
                  }))}
                />
              </div>

              <div className="space-y-3">
                <Label>Quick-pick common diagnoses</Label>
                <div className="grid grid-cols-2 gap-2">
                  {commonDiagnoses.map((diagnosis) => (
                    <Button
                      key={diagnosis}
                      variant={formData.diagnosis.suggestions.includes(diagnosis) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          diagnosis: {
                            ...prev.diagnosis,
                            suggestions: prev.diagnosis.suggestions.includes(diagnosis)
                              ? prev.diagnosis.suggestions.filter(d => d !== diagnosis)
                              : [...prev.diagnosis.suggestions, diagnosis]
                          }
                        }));
                      }}
                    >
                      {diagnosis}
                    </Button>
                  ))}
                </div>
              </div>

              {formData.diagnosis.suggestions.length > 0 && (
                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Selected conditions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.diagnosis.suggestions.map((suggestion) => (
                      <Badge key={suggestion} variant="secondary">
                        {suggestion}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        );

      case 'treatment':
        return (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Treatment Options</CardTitle>
              <CardDescription>
                Indicate which treatments have been tried, are current, or are planned.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {treatmentOptions.map((treatment) => (
                  <Card key={treatment.id} className="p-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl">{treatment.icon}</span>
                      <h4 className="font-medium">{treatment.name}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`tried-${treatment.id}`}
                          checked={formData.treatment.tried.includes(treatment.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData(prev => ({
                                ...prev,
                                treatment: {
                                  ...prev.treatment,
                                  tried: [...prev.treatment.tried, treatment.id]
                                }
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                treatment: {
                                  ...prev.treatment,
                                  tried: prev.treatment.tried.filter(t => t !== treatment.id)
                                }
                              }));
                            }
                          }}
                        />
                        <label htmlFor={`tried-${treatment.id}`} className="text-sm">Previously tried</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`current-${treatment.id}`}
                          checked={formData.treatment.current.includes(treatment.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData(prev => ({
                                ...prev,
                                treatment: {
                                  ...prev.treatment,
                                  current: [...prev.treatment.current, treatment.id]
                                }
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                treatment: {
                                  ...prev.treatment,
                                  current: prev.treatment.current.filter(t => t !== treatment.id)
                                }
                              }));
                            }
                          }}
                        />
                        <label htmlFor={`current-${treatment.id}`} className="text-sm">Currently using</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`planned-${treatment.id}`}
                          checked={formData.treatment.planned.includes(treatment.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData(prev => ({
                                ...prev,
                                treatment: {
                                  ...prev.treatment,
                                  planned: [...prev.treatment.planned, treatment.id]
                                }
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                treatment: {
                                  ...prev.treatment,
                                  planned: prev.treatment.planned.filter(t => t !== treatment.id)
                                }
                              }));
                            }
                          }}
                        />
                        <label htmlFor={`planned-${treatment.id}`} className="text-sm">Planning to use</label>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );

      case 'review':
        return (
          <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>
                Please review all information before submitting for AI analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">License Information</h4>
                  <p className="text-sm text-muted-foreground">License: {formData.license.number}</p>
                  <p className="text-sm text-muted-foreground">Authority: {formData.license.issuingBody}</p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">AI Model Selected</h4>
                  <p className="text-sm text-muted-foreground">
                    {aiModels.find(m => m.id === formData.selectedModel)?.name || 'None selected'}
                  </p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Clinical History</h4>
                  <p className="text-sm text-muted-foreground">Duration: {formData.clinical.duration}</p>
                  <p className="text-sm text-muted-foreground">Pain level: {formData.clinical.pain}/10</p>
                  <p className="text-sm text-muted-foreground">Family history: {formData.clinical.familyHistory}</p>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-2">Environmental Factors</h4>
                  <p className="text-sm text-muted-foreground">Region: {formData.social.geography}</p>
                  <p className="text-sm text-muted-foreground">Climate: {formData.social.climate}</p>
                  <p className="text-sm text-muted-foreground">Sun exposure: {formData.social.sunExposure}</p>
                </Card>
              </div>

              <Card className="p-4">
                <h4 className="font-medium mb-2">Diagnosis Suggestions</h4>
                <div className="flex flex-wrap gap-2">
                  {formData.diagnosis.suggestions.map((suggestion) => (
                    <Badge key={suggestion} variant="secondary">{suggestion}</Badge>
                  ))}
                </div>
              </Card>

              <div className="bg-muted/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Privacy & De-identification Confirmed</h4>
                    <p className="text-xs text-muted-foreground">
                      All data has been de-identified and will be used solely for research purposes. 
                      No personally identifiable information will be stored or shared.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'analysis':
        return (
          <Card className="max-w-2xl mx-auto text-center">
            <CardContent className="pt-16 pb-16">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Brain className="w-12 h-12 text-primary animate-pulse" />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Analyzing with {aiModels.find(m => m.id === formData.selectedModel)?.name}...
              </h2>
              <p className="text-muted-foreground mb-8">
                Our AI model is carefully analyzing your case data. This typically takes 30-60 seconds.
              </p>
              
              <div className="max-w-md mx-auto space-y-4">
                <Progress value={analysisProgress} className="h-3" />
                <p className="text-sm text-muted-foreground">{analysisProgress}% complete</p>
              </div>

              <div className="mt-8 text-left max-w-md mx-auto">
                <h4 className="font-medium mb-2">What's happening:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Processing clinical history</li>
                  <li>• Analyzing image features</li>
                  <li>• Comparing with research database</li>
                  <li>• Generating recommendations</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        );

      case 'results':
        return (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>AI Analysis Results</CardTitle>
                    <CardDescription>
                      Analysis completed by {aiModels.find(m => m.id === formData.selectedModel)?.name}
                    </CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Analysis Complete</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Primary Diagnosis</h4>
                    <div className="space-y-2">
                      <p className="text-lg font-semibold">Atopic Dermatitis</p>
                      <p className="text-sm text-muted-foreground">ICD-11: EA85.0</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Confidence:</span>
                        <Badge variant="secondary">87%</Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-medium mb-3">Differential Diagnoses</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Contact Dermatitis</span>
                        <Badge variant="outline">12%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Seborrheic Dermatitis</span>
                        <Badge variant="outline">8%</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Psoriasis</span>
                        <Badge variant="outline">5%</Badge>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Treatment Recommendations</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium mb-2">First-line treatments:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Topical corticosteroids (moderate potency)</li>
                        <li>• Moisturizing creams (ceramide-based)</li>
                        <li>• Avoid known triggers</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium mb-2">Additional options:</h5>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Topical calcineurin inhibitors</li>
                        <li>• Antihistamines for itching</li>
                        <li>• Wet wrap therapy</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h4 className="font-medium mb-3">Key Findings</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Characteristic distribution pattern consistent with atopic dermatitis</li>
                    <li>• Evidence of chronic inflammation and lichenification</li>
                    <li>• Family history supports genetic predisposition</li>
                    <li>• Environmental factors may be contributing to flare-ups</li>
                  </ul>
                </Card>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Your Data Compares</CardTitle>
                <CardDescription>
                  Insights from similar cases in our research database
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">156</div>
                    <div className="text-sm text-muted-foreground">Similar cases</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary">78%</div>
                    <div className="text-sm text-muted-foreground">Treatment success rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">6-8 weeks</div>
                    <div className="text-sm text-muted-foreground">Average recovery time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Download className="mr-2 w-4 h-4" />
                Download PDF Report
              </Button>
              <Button variant="outline" size="lg" onClick={() => setCurrentStep('license')}>
                Submit Another Case
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate('feed', 'provider')}>
                <Users className="mr-2 w-4 h-4" />
                Go to Practice Feed
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button variant="ghost" onClick={() => onNavigate('landing')}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-semibold text-foreground">DermAssist</span>
              </div>
            </div>
            <div className="w-16 sm:w-20" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {currentStep !== 'results' && (
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs sm:text-sm font-medium">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
              <span className="text-xs sm:text-sm text-muted-foreground">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <Progress value={progress} className="h-1.5 sm:h-2" />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        {renderStep()}
      </div>

      {/* Navigation */}
      {currentStep !== 'analysis' && currentStep !== 'results' && (
        <div className="bg-white border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStepIndex === 0}
                className="px-3 sm:px-4"
              >
                <ArrowLeft className="mr-1 sm:mr-2 w-4 h-4" />
                <span className="hidden sm:inline">Previous</span>
                <span className="sm:hidden">Prev</span>
              </Button>
              <Button
                onClick={nextStep}
                disabled={currentStepIndex === steps.length - 1}
                className="px-3 sm:px-4"
              >
                <span className="hidden sm:inline">
                  {currentStep === 'review' ? 'Submit for Analysis' : 'Next'}
                </span>
                <span className="sm:hidden">
                  {currentStep === 'review' ? 'Submit' : 'Next'}
                </span>
                <ArrowRight className="ml-1 sm:ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}