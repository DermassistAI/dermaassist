This repo contains file and prototype material for the project dermassist
DermAssist is an Afrocentric digital dermatology assistant built to enhance the diagnosis, triage, and management of skin conditions—particularly those appearing on dark skin tones, which are historically underrepresented in medical datasets and diagnostic tools.

It combines AI-powered image analysis, localized knowledge, and clinical decision support to serve both healthcare providers and patients across Africa. DermAssist is not just a tool—it's a platform for equity in dermatological care, aiming to fill a critical gap in recognition, research, and access by:
- Offering accurate, inclusive diagnostic support for melanated skin
- Educating users (clinicians and patients) on common and neglected dermatoses
- Building the largest annotated dataset of Black and African skin conditions
- Facilitating early intervention and referral guidance in low-resource settings

At its core, DermAssist is a smart, culturally and clinically aware assistant that learns from African skin, speaks to African needs, and builds trust through data sovereignty, local validation, and accessibility.

## Tech Stack

This application has been converted from Vite to **Next.js 15** with the following technologies:

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **AI Integration**: Azure OpenAI (GPT-4 Omni Mini) via AX-LLM
- **AI Framework**: [AX-LLM](https://github.com/ax-llm/ax) for unified LLM interface
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (install with `npm install -g pnpm`)
- Azure OpenAI account with GPT-4 mini deployment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/DermassistAI/skin-equity-assistant.git
cd skin-equity-assistant
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Azure OpenAI credentials (see [SETUP.md](./SETUP.md) for details)

4. Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Building for Production

```bash
pnpm build
pnpm start
```

## Features

- **AI-Powered Analysis**: Real-time skin condition analysis using Azure OpenAI GPT-4 mini
- **Cultural Awareness**: Specialized prompts and considerations for melanated skin
- **Interactive Demo**: Upload images and receive detailed diagnostic assessments
- **Patient History**: Comprehensive patient information collection
- **Differential Diagnoses**: Multiple potential conditions with probabilities
- **Treatment Recommendations**: Evidence-based, accessible treatment suggestions
- **Responsive Design**: Works on desktop and mobile devices

## Documentation

- [SETUP.md](./SETUP.md) - Detailed Azure OpenAI setup instructions
- [API Documentation](#api-routes) - Information about the API routes

## API Routes

### POST /api/analyze

Analyzes skin conditions using Azure OpenAI.

**Request Body:**
```json
{
  "patientInfo": {
    "age": "string",
    "gender": "string",
    "skinTone": "string",
    "location": "string",
    "duration": "string",
    "symptoms": "string",
    "currentTreatments": "string",
    "triggers": "string",
    "familyHistory": "string"
  },
  "imageData": "string (base64)"
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "primaryDiagnosis": {
      "condition": "string",
      "confidence": "number",
      "severity": "string",
      "description": "string"
    },
    "differentials": [...],
    "culturalConsiderations": [...],
    "recommendations": [...],
    "followUp": "string"
  }
}
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is part of the DermAssist initiative for equitable healthcare in Africa.
