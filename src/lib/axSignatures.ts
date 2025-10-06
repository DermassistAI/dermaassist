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

  // Sanitize imageBase64 if present to avoid sending huge base64 blobs to the model
  const safeInput: ModelInput = { ...input };
  if (safeInput.imageBase64 && typeof safeInput.imageBase64 === 'string') {
    const raw = safeInput.imageBase64;
    // If it's a data URL, estimate size from base64 length
    const isDataUrl = raw.startsWith('data:');
    if (isDataUrl) {
      // Extract only the first 64 chars for debugging and provide length info
      const b64 = raw.split(',')[1] ?? '';
      const byteLength = Math.floor((b64.length * 3) / 4);
      safeInput.imageBase64 = `"<BASE64_OMITTED; bytes=${byteLength}>"`;
    } else {
      // Non-data-url long strings: replace with a short placeholder
      safeInput.imageBase64 = '"<IMAGE_OMITTED>"';
    }
  }

  const payload = JSON.stringify(safeInput);

  return `${instruction}${schema}\n\nInput:\n${payload}\n\nRespond with valid JSON only.`;
}
