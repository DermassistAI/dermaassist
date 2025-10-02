import React from "react";
import { User, ArrowLeft, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

export default function HistoryStep({ onBack, onAnalyze }: { onBack: () => void; onAnalyze: () => void; }) {
  return (
    <div>
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
            <Textarea id="symptoms" placeholder="e.g., itching, burning, pain, scaling..." className="min-h-20" />
          </div>
          
          <div>
            <Label htmlFor="triggers">Known Triggers</Label>
            <Textarea id="triggers" placeholder="e.g., stress, weather, products, foods..." className="min-h-20" />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="family-history">Family History</Label>
        <Textarea id="family-history" placeholder="Any relevant family history of skin conditions..." className="min-h-16" />
      </div>
      
      <Separator />
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Upload
        </Button>
        <Button variant="hero" size="lg" onClick={onAnalyze}>
          Analyze with AI
          <Brain className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
