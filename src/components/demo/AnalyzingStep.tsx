import React from "react";
import { Brain } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function AnalyzingStep({ progress }: { progress: number }) {
  return (
    <div>
      <div className="space-y-4">
        <Progress value={progress} className="w-full" />
        <p className="text-center text-muted-foreground">{Math.round(progress)}% complete</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
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
    </div>
  );
}
