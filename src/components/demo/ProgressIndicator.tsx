import React from "react";
import { Upload, User, Brain, FileText } from "lucide-react";

export type Step = "upload" | "history" | "analyzing" | "results";

export default function ProgressIndicator({ currentStep }: { currentStep: Step }) {
  return (
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === "upload" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          <Upload className="h-4 w-4" />
          <span className="font-medium">Upload</span>
        </div>
        <div className="h-px w-12 bg-border"></div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === "history" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          <User className="h-4 w-4" />
          <span className="font-medium">History</span>
        </div>
        <div className="h-px w-12 bg-border"></div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === "analyzing" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          <Brain className="h-4 w-4" />
          <span className="font-medium">Analysis</span>
        </div>
        <div className="h-px w-12 bg-border"></div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${currentStep === "results" ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
          <FileText className="h-4 w-4" />
          <span className="font-medium">Results</span>
        </div>
      </div>
    </div>
  );
}
