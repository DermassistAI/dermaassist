"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, User, Brain } from "lucide-react";
import Header from "@/components/Header";
import { toast } from "@/components/ui/sonner";
import ax from "@/lib/axClient";
import { callModelText } from "@/lib/axHelpers";
import type { ModelInput, ModelOutput } from "@/lib/axSignatures";
import { buildPrompt } from "@/lib/axSignatures";
import ProgressIndicator from "@/components/demo/ProgressIndicator";
import UploadStep from "@/components/demo/UploadStep";
import HistoryStep from "@/components/demo/HistoryStep";
import AnalyzingStep from "@/components/demo/AnalyzingStep";
import ResultsStep from "@/components/demo/ResultsStep";

type DemoStep = 'upload' | 'history' | 'analyzing' | 'results';

const Demo = () => {
  const [currentStep, setCurrentStep] = useState<DemoStep>('upload');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [modelOutput, setModelOutput] = useState<string | null>(null);
  const [parsedOutput, setParsedOutput] = useState<ModelOutput | null>(null);
  // using Sonner's toast (client component) instead of custom useToast

  // The demo uses live Azure OpenAI model output for results.
  // We keep a small textual fallback for the AI summary display if parsing fails.
  const mockSummaryFallback = `No structured model output was parsed. Ensure Azure OpenAI credentials are properly configured in environment variables.`;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        toast("Image uploaded successfully");
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
          setTimeout(async () => {
            // call Azure OpenAI model and store response
            try {
              const client = ax.createDefaultClient();

              const input: ModelInput = {
                imageBase64: uploadedImage,
                extraContext: "Demo run",
              };

              const prompt = buildPrompt(input);
              const text = await callModelText(client, prompt);
              setAnalysisProgress(100);
              setModelOutput(String(text));

              // Try to parse JSON output into ModelOutput; if parsing fails keep parsedOutput null
              let parsed: ModelOutput | null = null;
              try {
                parsed = JSON.parse(String(text)) as ModelOutput;
                setParsedOutput(parsed);
              } catch (e) {
                // leave parsedOutput null - ResultsStep will render a helpful fallback
                setParsedOutput(null);
              }

              // attempt to persist the (possibly unparsed) model output to the local server
              try {
                const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';
                await fetch(`${apiBase}/api/results`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ modelOutput: String(text), parsed })
                });
              } catch (e) {
                // non-fatal - log in browser console (server may not be running in dev)
                console.warn('failed to persist results', e);
              }

              setCurrentStep('results');
              } catch (e) {
              toast(String(e), { description: 'AI Error' });
              setCurrentStep('results');
            }
          }, 500);
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

          <ProgressIndicator currentStep={currentStep} />

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
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
                  <UploadStep uploadedImage={uploadedImage} onUpload={handleImageUpload} onContinue={() => setCurrentStep('history')} />
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
                  <HistoryStep onBack={() => setCurrentStep('upload')} onAnalyze={handleAnalyze} />
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
                  <AnalyzingStep progress={analysisProgress} />
                </CardContent>
              </Card>
            )}

            {/* Results Step */}
            {currentStep === 'results' && (
              <ResultsStep parsedOutput={parsedOutput} modelOutput={modelOutput} onReset={resetDemo} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;