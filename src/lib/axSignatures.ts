/**
 * Model input/output signatures for the demo.
 * These define the expected JSON contract the LLM should accept and return.
 */

export type ModelInput = {
  imageBase64?: string | null; // base64 image data (data:image/...)
  patientAge?: string | null;
  skinType?: string | null;
  duration?: string | null;
  symptoms?: string | null;
  triggers?: string | null;
  familyHistory?: string | null;
  extraContext?: string | null;
};

export type Differential = {
  condition: string;
  probability: number; // 0-100
  rationale?: string;
};

export type PrimaryDiagnosis = {
  condition: string;
  confidence: number; // 0-100
  severity?: string;
  description?: string;
};

export type ModelOutput = {
  summary: string; // brief summary statement
  primaryDiagnosis: PrimaryDiagnosis;
  differentials: Differential[];
  culturalConsiderations: string[];
  recommendations: string[];
};

/**
 * Build a deterministic prompt asking the model to respond ONLY with JSON
 * that conforms to the ModelOutput shape. The prompt includes the provided
 * ModelInput as JSON so the model can reason over it and produce structured output.
 */
export function buildPrompt(input: ModelInput) {
  const instruction = `You are a dermatology assistant. Receive the following input JSON describing an image and clinical context. Analyze and return a single JSON object that exactly matches the schema specified below in valid JSON. Do NOT include any extra commentary or markdown.\n\n`;

  const schema = `Schema (ModelOutput):
{
  "summary": string,
  "primaryDiagnosis": { "condition": string, "confidence": number, "severity": string, "description": string },
  "differentials": [ { "condition": string, "probability": number, "rationale": string } ],
  "culturalConsiderations": [ string ],
  "recommendations": [ string ]
}`;

  const payload = JSON.stringify(input);

  return `${instruction}${schema}\n\nInput:\n${payload}\n\nRespond with valid JSON only.`;
}
