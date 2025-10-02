import React from "react";
import { CheckCircle, AlertCircle, FileText, User, FileText as FileTextIcon, ArrowLeft, Download, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ModelOutput } from "@/lib/axSignatures";

export default function ResultsStep({ parsedOutput, modelOutput, onReset }: { parsedOutput: ModelOutput | null; modelOutput?: string | null; onReset: () => void; }) {
  // If parsedOutput is missing, we show a friendly fallback message and
  // surface the raw modelOutput (if available) so the user can inspect it.
  const primary = parsedOutput ? parsedOutput.primaryDiagnosis : null;
  const differentials = parsedOutput ? parsedOutput.differentials : [];
  const cultural = parsedOutput ? parsedOutput.culturalConsiderations : [];
  const recommendations = parsedOutput ? parsedOutput.recommendations : [];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-sage-green" /> Primary Diagnosis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            {primary ? (
              <>
                <h3 className="text-2xl font-bold text-foreground">{primary.condition}</h3>
                <Badge variant="secondary" className="text-lg px-3 py-1">{primary.confidence}% confidence</Badge>
              </>
            ) : (
              <h3 className="text-2xl font-bold text-foreground">No structured diagnosis parsed</h3>
            )}
          </div>
          <p className="text-muted-foreground">{primary ? primary.description : "The model did not return a valid structured diagnosis. See AI Summary below for raw output."}</p>
          <div className="flex items-center gap-4">
            {primary ? <Badge variant="outline">Severity: {primary.severity}</Badge> : null}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-terra-cotta" /> Differential Diagnoses</CardTitle>
          <CardDescription>Alternative conditions to consider based on the clinical presentation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {differentials.map((diff, index) => (
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

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-golden-sand" /> Cultural & Demographic Considerations</CardTitle>
        </CardHeader>
        <CardContent>
                    <ul className="space-y-2">
            {cultural.length > 0 ? cultural.map((c: string, i: number) => (
              <li key={i} className="flex items-start gap-2"><div className="w-2 h-2 bg-golden-sand rounded-full mt-2 flex-shrink-0"></div><span className="text-muted-foreground">{c}</span></li>
            )) : <li className="text-muted-foreground">No cultural considerations parsed.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FileTextIcon className="h-5 w-5 text-medical-blue" /> Treatment Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {recommendations.length > 0 ? recommendations.map((rec: string, index: number) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-medical-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-sm font-medium text-medical-blue">{index+1}</span></div>
                <span className="text-muted-foreground">{rec}</span>
              </li>
            )) : <li className="text-muted-foreground">No treatment recommendations parsed.</li>}
          </ol>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {modelOutput ? (
          <div className="mb-4 p-4 rounded bg-background/60 border border-border">
            <h4 className="font-semibold">AI Summary (raw)</h4>
            <pre className="text-sm text-muted-foreground whitespace-pre-wrap">{modelOutput}</pre>
          </div>
        ) : (
          <div className="mb-4 p-4 rounded bg-background/60 border border-border text-muted-foreground">No AI output available yet.</div>
        )}

        <div className="flex justify-between">
          <Button variant="outline" onClick={onReset}>Try Another Case</Button>
          <div className="space-x-4">
            <Button variant="secondary">Export Report</Button>
            <Button variant="medical">Schedule Follow-up</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
