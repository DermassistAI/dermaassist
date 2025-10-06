import { NextRequest, NextResponse } from 'next/server';
import { AxAIAzureOpenAI } from '@ax-llm/ax';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Lazy initialize AX AI client with Azure OpenAI
function getAIClient() {
  if (!process.env.AZURE_OPENAI_API_KEY) {
    throw new Error('Azure OpenAI API key is not configured');
  }
  
  const ai = new AxAIAzureOpenAI({
    apiKey: process.env.AZURE_OPENAI_API_KEY,
    resourceName: process.env.AZURE_OPENAI_ENDPOINT?.replace('https://', '').replace('.openai.azure.com/', '') || '',
    deploymentName: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini',
    version: process.env.AZURE_OPENAI_API_VERSION || '2024-02-15-preview',
  });
  
  return ai;
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
    const userPrompt = `Analyze the following patient information and provide a detailed diagnostic assessment:

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

    // Call Azure OpenAI via AX
    const ai = getAIClient();
    
    const result = await ai.chat({
      model: process.env.AZURE_OPENAI_DEPLOYMENT_NAME || 'gpt-4o-mini',
      systemPrompt: 'You are a specialized dermatology AI assistant with expertise in diagnosing skin conditions in melanated skin. You provide culturally-aware, evidence-based diagnostic support. Always respond with valid JSON only.',
      prompt: userPrompt,
      maxTokens: 2000,
      temperature: 0.7,
    });

    const content = result.results?.[0]?.content || result.content;
    
    if (!content) {
      throw new Error('No response from AI model');
    }

    // Parse the JSON response
    let analysis;
    try {
      analysis = JSON.parse(content);
    } catch (parseError) {
      // If parsing fails, try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Failed to parse AI response as JSON');
      }
    }

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
