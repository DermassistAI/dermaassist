import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Lazy initialize OpenAI client
function getOpenAIClient() {
  if (!process.env.AZURE_OPENAI_API_KEY) {
    throw new Error('Azure OpenAI API key is not configured');
  }
  
  return new OpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    baseURL: `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT_NAME}`,
    defaultQuery: { 'api-version': process.env.AZURE_OPENAI_API_VERSION },
    defaultHeaders: { 'api-key': process.env.AZURE_OPENAI_API_KEY },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { patientInfo, imageData } = body;

    if (!patientInfo) {
      return NextResponse.json(
        { error: 'Patient information is required' },
        { status: 400 }
      );
    }

    // Create a detailed prompt for dermatological analysis
    const prompt = `You are a dermatology AI assistant trained to analyze skin conditions with cultural awareness, particularly for melanated skin tones. Analyze the following patient information and provide a detailed diagnostic assessment:

Patient Information:
- Age: ${patientInfo.age || 'Not provided'}
- Gender: ${patientInfo.gender || 'Not provided'}
- Skin Tone: ${patientInfo.skinTone || 'Not provided'}
- Location: ${patientInfo.location || 'Not provided'}
- Duration: ${patientInfo.duration || 'Not provided'}
- Symptoms: ${patientInfo.symptoms || 'Not provided'}
- Current Treatments: ${patientInfo.currentTreatments || 'Not provided'}
- Known Triggers: ${patientInfo.triggers || 'Not provided'}
- Family History: ${patientInfo.familyHistory || 'Not provided'}

${imageData ? 'An image has been provided for analysis.' : 'No image provided.'}

Please provide:
1. Primary Diagnosis: Include condition name, confidence level (0-100), severity, and detailed description
2. Differential Diagnoses: List 3 alternative conditions with probability and rationale
3. Cultural Considerations: Specific factors relevant to melanated skin and African populations
4. Treatment Recommendations: 5 evidence-based recommendations prioritizing accessibility
5. Follow-up: Recommended timeframe and monitoring advice

Format your response as JSON with this structure:
{
  "primaryDiagnosis": {
    "condition": "string",
    "confidence": number,
    "severity": "string",
    "description": "string"
  },
  "differentials": [
    {
      "condition": "string",
      "probability": number,
      "rationale": "string"
    }
  ],
  "culturalConsiderations": ["string"],
  "recommendations": ["string"],
  "followUp": "string"
}`;

    // Call Azure OpenAI
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a specialized dermatology AI assistant with expertise in diagnosing skin conditions in melanated skin. You provide culturally-aware, evidence-based diagnostic support.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 2000,
      response_format: { type: 'json_object' },
    });

    const result = completion.choices[0]?.message?.content;
    
    if (!result) {
      throw new Error('No response from AI model');
    }

    const analysis = JSON.parse(result);

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error('Error in AI analysis:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze skin condition',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
