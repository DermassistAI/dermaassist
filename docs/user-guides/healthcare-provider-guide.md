# Healthcare Provider Guide

Complete guide for medical professionals using DermAssist to contribute de-identified patient cases to dermatological research.

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Submitting Cases](#submitting-cases)
4. [Practice Feed](#practice-feed)
5. [Privacy & Compliance](#privacy--compliance)
6. [Best Practices](#best-practices)

## Introduction

### What is DermAssist?

DermAssist is a research platform that enables healthcare providers to:
- Submit de-identified dermatological cases for AI analysis
- Contribute to research on African and melanated skin conditions
- Practice diagnostic skills with anonymized cases
- Participate in consensus-based diagnostic challenges
- Earn CME credits for contributions

### Who Can Use DermAssist?

- Licensed healthcare providers (physicians, dermatologists, nurse practitioners)
- Medical professionals with current valid licenses
- Clinicians treating dermatological conditions

## Getting Started

### License Verification

Before submitting cases, your medical license must be verified:

1. Navigate to Provider Registration
2. Enter license details:
   - License number
   - Issuing state/country
   - Expiration date
3. Upload current license document (first-time users)
4. Verification typically completes within 24 hours

### System Requirements

- Secure device (phone, tablet, or computer)
- Camera for capturing patient photos
- Internet connection
- Modern web browser (Chrome, Safari, Firefox, Edge)

## Submitting Cases

### Step-by-Step Submission Process

#### 1. Capture Patient Photo

**Guidelines:**
- Ensure good lighting for clear visibility
- Focus on the affected area
- Remove all identifying features:
  - No faces visible
  - No unique tattoos or birthmarks
  - No jewelry or accessories
  - No backgrounds with identifying information
- Use the in-app blur tool if needed

**Technical Requirements:**
- Minimum resolution: 1024x1024 pixels
- Supported formats: JPEG, PNG, HEIC
- Maximum file size: 10MB

#### 2. Select AI Model

Choose from 6 AI providers based on your needs:

| Model | Best For | Speed | Cost |
|-------|----------|-------|------|
| **Claude Sonnet 3.5** | Complex clinical reasoning | Fast | $$$ |
| **GPT-4o** | Comprehensive analysis | Medium | $$$ |
| **GPT-4o-mini** | Quick screening | Fast | $ |
| **Gemini 2.0 Flash** | High-volume processing | Very Fast | $ |
| **Groq LLaMA 3.3** | Real-time applications | Ultra Fast | $$ |
| **Qwen** | Multilingual support | Fast | $$ |

See [AI Providers Reference](../reference/ai-providers-reference.md) for detailed comparison.

#### 3. Clinical History

Answer questions about the patient's condition:

- **Duration**: How long has the patient had this condition?
- **Treatments**: What treatments has the patient tried?
- **Symptoms**: What level of pain or discomfort does the patient report?
- **Family History**: Does the patient have a family history of similar skin conditions?

**Note**: All questions are about the patient, not first-person.

#### 4. Patient Context (Optional)

Provide environmental and social factors if known:

- Geographic region
- Climate zone
- Occupation (if relevant)
- Daily sun exposure
- Skin care routine

**Privacy Note**: Skip any fields you don't know. This information is optional.

#### 5. Clinical Assessment

Enter your diagnostic assessment:

- Search ICD-11 dermatological codes
- Select suspected condition(s)
- This helps validate AI analysis and improves accuracy

Common codes:
- **Atopic Dermatitis** (L20.9)
- **Psoriasis** (L40-L45)
- **Vitiligo** (L80)
- **Acne** (L70)
- **Contact Dermatitis** (L23-L25)

#### 6. Treatment Plan

Document treatment approaches:

- **Already tried**: Treatments the patient has used
- **Currently using**: Active treatment regimen
- **Considering**: Potential next steps

Categories:
- Topical treatments (corticosteroids, calcineurin inhibitors)
- Systemic medications (immunosuppressants, biologics)
- Phototherapy (UVB, PUVA)
- Procedural interventions
- Lifestyle modifications

#### 7. Review & Submit

- Review all entered information
- Verify image de-identification
- Confirm consent for research use
- Submit for AI analysis

### AI Analysis Results

After submission (30-90 seconds):

1. **Diagnosis**: AI-generated diagnosis with ICD-11 code
2. **Confidence Score**: Model's confidence level (0-100%)
3. **Differential Diagnoses**: Alternative conditions to consider
4. **Recommendations**: Suggested treatment approaches
5. **References**: Relevant clinical guidelines

**Important**: AI analysis is for research purposes only. Always use your clinical judgment for patient care.

## Practice Feed

### What is Practice Feed?

An educational feature where providers can:
- Review anonymized cases from other providers
- Practice diagnostic skills
- Compare assessments with AI and community consensus
- Earn badges and CME credits

### How to Use Practice Feed

1. Navigate to "Practice Feed"
2. Select a case to review
3. Make your diagnostic assessment
4. Submit your diagnosis
5. View AI analysis and community consensus
6. Compare your assessment with others

### Consensus Challenges

Participate in community diagnostic challenges:

- **Daily Challenges**: One case per day with community voting
- **Weekly Rounds**: Complex cases with expert discussion
- **Specialty Focus**: Cases by dermatological subspecialty

### Gamification & Recognition

- **Badges**: Earn badges for accuracy, participation, consistency
- **Leaderboards**: Compare performance with peers (anonymously)
- **Streaks**: Maintain daily practice streaks
- **CME Credits**: Earn continuing education credits (where available)

## Privacy & Compliance

### De-identification Process

All submissions undergo automatic de-identification:

1. **Image Processing**: 
   - AI-powered detection of faces, tattoos, unique features
   - Automatic blurring of identified regions
   - Metadata stripping (location, device, timestamp)

2. **Data Anonymization**:
   - No patient names or identifiers collected
   - Provider IDs encrypted
   - Geographic data generalized

3. **Secure Storage**:
   - Encrypted at rest and in transit
   - Access controls and audit logs
   - HIPAA/GDPR compliant

### Patient Consent

**Required**: Obtain patient consent before submitting cases.

Recommended consent language:
> "I consent to have de-identified photos and clinical information about my skin condition used for medical research purposes. No identifying information will be shared."

### Compliance Standards

DermAssist complies with:
- **HIPAA** (Health Insurance Portability and Accountability Act)
- **GDPR** (General Data Protection Regulation)
- **CCPA** (California Consumer Privacy Act)
- **IRB** guidelines for research

## Best Practices

### Image Quality

✅ **Do:**
- Use good lighting
- Focus clearly on affected area
- Capture appropriate scale (include ruler if helpful)
- Take multiple angles if needed

❌ **Don't:**
- Submit blurry or dark images
- Include identifying information
- Use filters or editing
- Capture irrelevant areas

### Clinical Information

✅ **Do:**
- Provide accurate, detailed history
- Document all treatments tried
- Include relevant family history
- Note environmental factors

❌ **Don't:**
- Include patient names or identifiers
- Make assumptions if information unknown
- Skip important clinical details
- Submit duplicate cases

### Diagnostic Assessment

✅ **Do:**
- Use specific ICD-11 codes
- Consider differential diagnoses
- Document confidence level
- Provide clinical reasoning

❌ **Don't:**
- Rely solely on AI for patient care
- Submit uncertain cases as definitive
- Skip your own assessment
- Use outdated diagnostic codes

## Frequently Asked Questions

### Can I submit cases from telemedicine consultations?

Yes, as long as you have proper patient consent and the image quality is sufficient.

### How long does AI analysis take?

Typically 30-90 seconds, depending on the model selected and current system load.

### Are my submissions anonymous?

Yes, your identity is encrypted. Only your contribution statistics are visible in leaderboards.

### Can I edit or delete submitted cases?

You can view your submission history. Contact support to request case removal if needed.

### What happens if the AI diagnosis differs from mine?

This is valuable research data! Discordance helps improve AI models. Always use your clinical judgment for patient care.

### Do I need to submit cases regularly?

No, submissions are voluntary. However, regular participation helps build the research dataset and improves your practice skills.

## Support

- **Technical Issues**: support@dermassist.com
- **Clinical Questions**: clinical@dermassist.com  
- **Privacy Concerns**: privacy@dermassist.com

---

**Next Steps**: 
- Review [Submission Guide](./submission-guide.md) for detailed walkthrough
- Explore [Practice Feed Guide](./practice-feed-guide.md) for educational features
- Check [Privacy Guide](./privacy-guide.md) for compliance information
