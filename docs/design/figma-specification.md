# DermAssist Design Specification for Figma Make

## Application Overview

DermAssist is an Afrocentric digital dermatology research platform that enables secure, de-identified submission of skin condition data for research purposes. The platform combines AI-powered analysis with a conversational, game-like interface to collect clinical data while maintaining strict privacy and HIPAA/GDPR compliance.

### Core Mission
- Collect de-identified dermatological data for research on African and melanated skin
- Provide multi-AI model analysis capabilities (Claude Sonnet 4.5, Gemini, GPT-5, GPT-5 mini, Qwen)
- Ensure seamless, intuitive user experience through conversational UI
- Enable healthcare providers to monitor model health and submission issues

---

## User Personas

### 1. Healthcare Provider (Primary User)
- **Goal**: Capture patient skin conditions, de-identify data, and submit for AI analysis and research
- **Technical Skill**: Medium
- **Context**: Clinical setting with patients, using mobile or desktop
- **Profile**: Licensed healthcare provider with current valid medical license stored in system
- **Primary Activities**:
  - Take photos of patient skin conditions during consultations
  - De-identify patient data through conversational AI or gamified form interface
  - Answer diagnostic questions to aid AI analysis
  - Submit de-identified cases for research database
  - Practice diagnostic skills by reviewing anonymized cases in feed
  - Participate in consensus-based diagnostic challenges
- **Needs**: 
  - Quick, streamlined submission process
  - Secure license verification
  - Confidence in data de-identification
  - Educational/practice opportunities
  - Recognition for contributions

### 2. Admin User (Secondary User)
- **Goal**: Monitor system health, ensure data quality, and manage case distribution
- **Technical Skill**: High
- **Context**: Administrative dashboard, desktop workstation
- **Primary Activities**:
  - Monitor AI agent operational status
  - Check model health and performance
  - Review and flag malformed responses
  - Prepare quality-checked cases for random allocation to providers
  - Track system metrics and submission quality
  - Resolve technical issues
- **Needs**: 
  - Comprehensive monitoring dashboard
  - Health check tools for all models
  - Case review and quality control interface
  - Alert system for failures
  - Analytics and reporting tools

---

## Application Structure

### 1. Public Interface (Research Submission Portal)

#### 1.1 Landing Page
**Layout**: Hero section with clear value proposition

**Key Elements**:
- **Header**: Logo, "Submit Case", "Practice Feed", "Provider Login"
- **Hero Section**:
  - Headline: "Building the Largest Dataset of African Skin Conditions"
  - Subheadline: "For healthcare providers: Contribute de-identified patient data to advance equitable dermatological research"
  - CTA Button: "Submit Patient Case" (primary action)
  - Trust indicators: "100% De-identified", "HIPAA Compliant", "Secure License Verification"
- **How It Works** (3-step visual):
  1. Capture Patient Photo → 2. De-identify & Answer Questions → 3. Get AI Analysis & Contribute to Research
- **Privacy Promise**: Clear explanation of de-identification process and data security
- **Provider Benefits**: 
  - Contribute to research while maintaining patient privacy
  - Access AI-powered diagnostic assistance
  - Practice with anonymized cases
  - Earn CME credits for contributions
- **Statistics**: Number of providers, cases submitted, countries represented, conditions studied

**Design Notes**:
- Professional, clinical aesthetic with warm, inclusive accents
- Warm color palette reflecting African skin tones (deep browns, ochre, terracotta)
- High contrast for accessibility
- Photography featuring healthcare providers with diverse patients

#### 1.2 Submission Flow (Conversational Interface)

**Navigation Pattern**: Progressive disclosure, chat-like interface

**Step 1: Provider Authentication & License Verification**
- **Interface**: Professional login card
- **Content**: 
  - "Welcome, Healthcare Provider! Please verify your credentials."
  - License verification fields:
    - [ ] Medical license number
    - [ ] License issuing state/country
    - [ ] Upload current license document (optional for returning providers)
  - "Your current valid license information is securely stored and regularly verified"
  - Animated consent checkboxes:
    - [ ] I confirm I am a licensed healthcare provider
    - [ ] I understand data will be de-identified and used for research
    - [ ] I consent to submit de-identified patient cases
  - CTA: "Continue to Case Submission" button

**Step 2: Patient Photo Capture**
- **Interface**: Camera/upload card with de-identification guidance
- **Chat Prompt**: "Capture a clear photo of the patient's skin condition. Ensure NO identifying features are visible (no faces, tattoos, unique birthmarks, or backgrounds with identifying information)."
- **Capture Options**:
  - "Use Camera" (for in-clinic use)
  - "Upload Photo" (if photo already taken)
  - Drag & drop area
- **Auto-De-identification Features**:
  - AI-powered blur suggestions for potentially identifying regions
  - Metadata stripping (location, device info, timestamps)
  - Image quality check and recommendations
- **Preview**: De-identified image preview with blur overlay on flagged areas
- **Validation**: File size, format, quality, and de-identification completeness check
- **Progress Indicator**: "Step 2 of 8"

**Step 3: AI Model Selection (Game-like)**
- **Interface**: Interactive card carousel
- **Chat Prompt**: "Choose your AI assistant! Each model has unique strengths."
- **Model Cards** (swipeable on mobile, clickable on desktop):
  
  **Card Design for Each Model**:
  ```
  ┌─────────────────────────┐
  │   [Model Icon/Avatar]   │
  │                         │
  │     Claude Sonnet 4.5   │
  │                         │
  │ "Detailed clinical      │
  │  reasoning"             │
  │                         │
  │ ⚡ Speed: Fast          │
  │ 🎯 Accuracy: Very High  │
  │ 📊 Best for: Complex    │
  │              conditions │
  │                         │
  │     [Select Model]      │
  └─────────────────────────┘
  ```

  **Models to Display**:
  1. **Claude Sonnet 4.5**: Clinical reasoning, complex cases
  2. **Gemini 2.0 Flash**: Speed, common conditions
  3. **GPT-5**: Comprehensive analysis
  4. **GPT-5 Mini**: Quick screening
  5. **Qwen**: Multilingual support

**Step 4: Clinical History (Conversational)**
- **Interface**: Chat bubbles with progressive questions
- **Questions Flow** (Healthcare provider answering about patient):
  
  Q1: "How long has the patient had this condition?"
  - Pill-button options: "< 1 week", "1-4 weeks", "1-6 months", "6+ months", "Unknown"
  
  Q2: "What treatments has the patient tried?"
  - Text input with suggestions: "Over-the-counter creams", "Prescription medication", "Home remedies", "None", "Unknown"
  
  Q3: "What level of pain or discomfort does the patient report?"
  - Slider: 0 (None) to 10 (Severe)
  - Optional text: "Describe the patient's symptoms"
  
  Q4: "Does the patient have a family history of similar skin conditions?"
  - Pill-button options: "Yes", "No", "Unknown"
  - If "Yes": Dropdown with common heritable dermatological conditions (e.g., Atopic dermatitis, Psoriasis, Vitiligo)

**Step 5: Social & Environmental Factors (Patient Context)**
- **Interface**: Interactive form with visual elements
- **Chat Prompt**: "A few details about the patient's environment help identify patterns in skin health."
  
  **Fields** (all optional, provider can skip if unknown):
  - **Patient's Geographic Region** (dropdown): Continent → Country → Region
  - **Patient's Climate Zone**: Visual icons (Tropical, Arid, Temperate, etc.)
  - **Patient's Occupation** (if relevant): Free text with suggestions
  - **Patient's Daily Sun Exposure**: Slider (0-8+ hours) or "Unknown"
  - **Patient's Skin Care Routine**: Multiple choice tags or "Not discussed"

**Design Note**: Use friendly icons and visual representations to reduce text burden

**Step 6: ICD-11 Diagnosis Suggestion (Provider's Clinical Assessment)**
- **Interface**: Searchable, filterable table/cards
- **Chat Prompt**: "Based on your clinical assessment, what condition do you suspect? (This helps validate our AI analysis)"
  
  **ICD-11 Search Component**:
  ```
  ┌────────────────────────────────────────┐
  │ 🔍 Search ICD-11 Dermatological Codes  │
  │ [Search: "e.g., atopic dermatitis"]    │
  └────────────────────────────────────────┘
  
  Common Dermatological Conditions:
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ Atopic       │ │ Psoriasis    │ │ Acne         │
  │ Dermatitis   │ │ (L40-L45)    │ │ (L70)        │
  │ (L20.9)      │ └──────────────┘ └──────────────┘
  └──────────────┘
  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
  │ Vitiligo     │ │ Seborrheic   │ │ Contact      │
  │ (L80)        │ │ Dermatitis   │ │ Dermatitis   │
  └──────────────┘ │ (L21)        │ │ (L23-L25)    │
                   └──────────────┘ └──────────────┘
  
  [View Full ICD-11 Classification Tree]
  
  Your Assessment: None selected
  [Skip This Step]  [Confirm Diagnosis]
  ```

**Step 7: Treatment Options (Provider's Clinical Plan)**
- **Interface**: Card grid with checkbox overlay
- **Chat Prompt**: "What treatment approaches have been tried or are you considering for this patient? (Select all that apply)"
  
  **Treatment Cards**:
  ```
  ┌─────────────────────┐
  │ [Icon: Cream]       │
  │ Topical             │
  │ Corticosteroids     │
  │                     │
  │ ☐ Already tried     │
  │ ☐ Currently using   │
  │ ☐ Considering       │
  └─────────────────────┘
  ```
  
  Treatment Categories:
  - **Topical treatments**: Corticosteroids, Calcineurin inhibitors, Emollients, Antibiotics
  - **Systemic medications**: Oral corticosteroids, Immunosuppressants, Biologics, Antibiotics
  - **Phototherapy**: UVB, PUVA, Narrowband UVB
  - **Procedural**: Cryotherapy, Laser therapy, Chemical peels
  - **Lifestyle modifications**: Moisturizing regimen, Trigger avoidance, Dietary changes
  - **Alternative approaches**: Traditional remedies (specify), Herbal preparations

**Step 8: Review & Submit**
- **Interface**: Accordion summary
- **Chat Prompt**: "Let's review your submission before we send it for AI analysis."
  
  **Review Sections** (expandable):
  - ✓ Image uploaded
  - ✓ Model selected: [Model Name]
  - ✓ Clinical history: [Summary]
  - ✓ Social factors: [Summary]
  - ✓ Suggested diagnosis: [ICD-11 code]
  - ✓ Treatment options: [List]
  
  **Actions**:
  - [Edit Any Section]
  - [Submit for Analysis] (primary button)

**Step 9: Analysis in Progress**
- **Interface**: Animated loading state
- **Design**: 
  - Animated circular progress with model avatar
  - Status messages:
    - "Analyzing image with [Model Name]..."
    - "Reviewing clinical history..."
    - "Cross-referencing ICD-11 database..."
    - "Generating research report..."
  - Estimated time: "30-60 seconds"

**Step 10: Results Display**
- **Interface**: Card-based results dashboard
  
  **Layout**:
  ```
  ┌─────────────────────────────────────────────┐
  │        Analysis Complete! ✓                  │
  │                                              │
  │ Your submission has been recorded for        │
  │ research. Here's what the AI found:          │
  └─────────────────────────────────────────────┘
  
  ┌──────────────────────────────────────────────┐
  │ 🤖 AI Analysis ([Model Name])                │
  │                                               │
  │ Condition: [Detected Condition]               │
  │ ICD-11 Code: [Code]                          │
  │ Confidence: ████████░░ 85%                   │
  │                                               │
  │ Description:                                  │
  │ [AI-generated clinical description]          │
  │                                               │
  │ Recommended Next Steps:                       │
  │ • [Action 1]                                 │
  │ • [Action 2]                                 │
  │ • [Action 3]                                 │
  │                                               │
  │ ⚠️  Note: This is for research only.         │
  │    Consult a healthcare provider.            │
  └──────────────────────────────────────────────┘
  
  ┌──────────────────────────────────────────────┐
  │ 📊 How Your Data Compares                    │
  │                                               │
  │ Similar cases in database: 127               │
  │ Most common treatment: [Treatment]           │
  │ Average resolution time: [Time]              │
  └──────────────────────────────────────────────┘
  
  [Download Report PDF]  [Submit Another Case]  [Go to Practice Feed]
  ```

---

### 1.3 Practice Feed (Educational & Skill Development)

**Purpose**: Allow healthcare providers to practice diagnostic skills with anonymized cases and participate in consensus-based learning

**Layout**: Feed-style interface with case cards

**Header**:
- Logo + "Practice Feed"
- Search and filter options
- "My Submissions" | "All Cases" | "Consensus Challenges"

**Case Card Design**:
```
┌──────────────────────────────────────────────┐
│ [De-identified Skin Condition Image]         │
│                                               │
│ Case #PR-12847                               │
│ Submitted: 3 days ago                        │
│ Region: East Africa                          │
│                                               │
│ Clinical Context:                            │
│ • Duration: 2-4 weeks                        │
│ • Symptoms: Mild itching                     │
│ • Patient Age Range: 25-35                   │
│                                               │
│ 🎯 Your Diagnosis:                           │
│ [Dropdown: Select ICD-11 Code]              │
│ [Text: Add notes (optional)]                │
│                                               │
│ 📊 Community Consensus:                      │
│ • Atopic Dermatitis: 45% (23 providers)    │
│ • Contact Dermatitis: 30% (15 providers)   │
│ • Psoriasis: 15% (8 providers)             │
│ • Other: 10% (5 providers)                  │
│                                               │
│ [Submit Diagnosis]  [View AI Analysis]      │
│ [Discuss with Community]                     │
└──────────────────────────────────────────────┘
```

**Features**:
- **Random Case Allocation**: Admin-reviewed cases randomly distributed to providers
- **Consensus Building**: See how your diagnosis compares with other providers
- **Learning Points**: Earn CME credits for participation
- **AI Reveal**: Compare your diagnosis with AI analysis after submitting
- **Discussion Forum**: Discuss interesting cases with community
- **Difficulty Levels**: Filter by case complexity (Beginner, Intermediate, Advanced)
- **Specialization Filters**: Filter by condition type (Inflammatory, Infectious, Neoplastic, etc.)

**Gamification Elements**:
- **Accuracy Score**: Track diagnostic accuracy over time
- **Badges**: "Consensus Master", "Quick Learner", "Community Leader"
- **Leaderboard**: Weekly/monthly top diagnosticians
- **Streaks**: Maintain daily practice streaks

**Consensus Challenge Mode**:
- **Time-limited challenges**: Weekly featured cases
- **Community voting**: Real-time consensus building
- **Expert commentary**: Dermatology experts provide final analysis
- **Rewards**: Top performers get recognition and certificates

---

### 2. Admin/Management Portal

#### 2.1 Admin Landing (Dashboard)

**Layout**: Grid-based dashboard with key metrics

**Header**:
- Logo + "DermAssist Admin"
- User profile dropdown (logout, settings)
- Notification bell (alerts for failed submissions)

**Main Dashboard Sections**:

**Section 1: System Health Overview**
```
┌────────────────────────────────────────────────┐
│ 🟢 System Status: Operational                  │
│                                                 │
│ Active Models:  5/5  ✓                         │
│ Failed Submissions Today:  2  ⚠️               │
│ Average Response Time:  2.3s  ✓                │
│ Uptime:  99.8%  ✓                              │
└────────────────────────────────────────────────┘
```

**Section 2: Model Health Cards**
```
┌──────────────────┐ ┌──────────────────┐
│ Claude Sonnet    │ │ Gemini 2.0       │
│                  │ │                  │
│ 🟢 Operational   │ │ 🟢 Operational   │
│                  │ │                  │
│ Avg Time: 3.2s   │ │ Avg Time: 1.8s   │
│ Success: 98.5%   │ │ Success: 99.2%   │
│ Last Check: 2m   │ │ Last Check: 1m   │
│                  │ │                  │
│ [Run Health Chk] │ │ [Run Health Chk] │
└──────────────────┘ └──────────────────┘

┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ GPT-5            │ │ GPT-5 Mini       │ │ Qwen             │
│ [Similar layout] │ │ [Similar layout] │ │ [Similar layout] │
└──────────────────┘ └──────────────────┘ └──────────────────┘
```

**Section 3: Submission Review & Quality Control**
```
┌─────────────────────────────────────────────────────────────┐
│ Submissions Pending Review                                   │
│                                                              │
│ 🔍 [Search] [Filter: New/Reviewed/Flagged] [Allocate]      │
│                                                              │
│ ID      | Provider  | Model    | Status        | Actions   │
│─────────────────────────────────────────────────────────────│
│ #12847  | PRV-4521  | Claude   | ✓ Ready       | [Review]  │
│ #12846  | PRV-8732  | Gemini   | ⚠️  Flagged   | [Check]   │
│ #12845  | PRV-1098  | GPT-4o   | ⚠️  Malformed | [Fix]     │
│ #12844  | PRV-5643  | Qwen     | ✓ Reviewed    | [Allocate]│
│ ...                                                          │
└─────────────────────────────────────────────────────────────┘
```

**Actions**:
- **Review**: Check submission quality and AI response
- **Flag**: Mark malformed or problematic submissions
- **Allocate**: Prepare quality-checked cases for Practice Feed
- **Bulk Actions**: Process multiple submissions at once

**Section 4: Analytics Charts**
- **Submissions Over Time**: Line chart (last 30 days)
- **Model Usage Distribution**: Pie chart
- **Success Rate by Model**: Bar chart
- **Geographic Distribution**: World map heat map

#### 2.2 Model Management Page

**Layout**: Tabbed interface

**Tab 1: Model Configuration**
```
┌────────────────────────────────────────────────┐
│ Configure AI Models                             │
│                                                 │
│ Claude Sonnet 4.5                              │
│ ┌─────────────────────────────────────┐        │
│ │ API Key: ••••••••••••••••••••       │        │
│ │ Endpoint: https://...               │        │
│ │ Model Version: claude-3-5-sonnet    │        │
│ │ Max Tokens: 4096                    │        │
│ │ Temperature: 0.3                    │        │
│ │ [Test Connection]  [Save]           │        │
│ └─────────────────────────────────────┘        │
│                                                 │
│ [+ Add New Model Provider]                     │
└────────────────────────────────────────────────┘
```

**Tab 2: Health Checks**
```
┌────────────────────────────────────────────────┐
│ Automated Health Checks                         │
│                                                 │
│ Schedule: Every 5 minutes                      │
│ [Edit Schedule]                                │
│                                                 │
│ Health Check History:                          │
│ ├─ Claude: ✓✓✓✓✓✓✓✓✗✓ (1 failure in 10)    │
│ ├─ Gemini: ✓✓✓✓✓✓✓✓✓✓ (10/10 success)      │
│ ├─ GPT-5:  ✓✓✓✗✓✓✓✓✓✓ (1 failure in 10)    │
│ └─ ...                                         │
│                                                 │
│ [Run All Health Checks Now]                    │
│ [Configure Alerts]                             │
└────────────────────────────────────────────────┘
```

**Tab 3: Usage Quotas**
```
┌────────────────────────────────────────────────┐
│ API Usage & Quotas                             │
│                                                 │
│ Claude Sonnet 4.5:                             │
│ Usage Today: 1,247 / 10,000 requests          │
│ ████░░░░░░░░░░░ 12.5%                         │
│ Est. Cost: $24.94                              │
│                                                 │
│ [Set Usage Alerts] [View Detailed Billing]    │
└────────────────────────────────────────────────┘
```

#### 2.3 Submission Issue Management

**Layout**: Kanban-style board

**Columns**:
1. **New Issues** (auto-flagged failed submissions)
2. **Under Review** (admin investigating)
3. **Resolved** (issue fixed)
4. **False Positive** (not actually an issue)

**Issue Card**:
```
┌─────────────────────────────────────┐
│ #12845 - Model Timeout              │
│                                      │
│ Model: GPT-5                        │
│ Time: 8 minutes ago                 │
│ Error: Request timeout after 30s    │
│                                      │
│ [View Submission Details]           │
│ [Reprocess with Different Model]   │
│ [Mark as Resolved]                  │
│ [Add Notes]                         │
└─────────────────────────────────────┘
```

**Actions**:
- Bulk reprocess
- Export issue report
- Configure auto-retry logic

#### 2.4 Analytics & Reporting

**Layout**: Interactive dashboard

**Available Reports**:
1. **Submission Trends**: Daily/weekly/monthly submission volumes
2. **Model Performance**: Accuracy, speed, cost comparison
3. **Condition Distribution**: Most common ICD-11 codes submitted
4. **Geographic Insights**: Submissions by region, climate correlation
5. **Treatment Patterns**: Most selected treatment options
6. **User Engagement**: Drop-off rates, completion times

**Export Options**: CSV, PDF, JSON

---

## Design System Specifications

### Color Palette

**Primary Colors** (Afrocentric, warm):
- Deep Ochre: `#C87941` (primary CTA)
- Rich Brown: `#3D2817` (text, headers)
- Terracotta: `#E07A5F` (accents, highlights)
- Warm Sand: `#F4DFB6` (backgrounds, cards)

**Neutral Colors**:
- Cream: `#FAF9F6` (main background)
- Stone Gray: `#8B7E74` (secondary text)
- Charcoal: `#2C2C2C` (high contrast text)

**Semantic Colors**:
- Success: `#2D6A4F` (green)
- Warning: `#F77F00` (orange)
- Error: `#C1121F` (red)
- Info: `#4A5759` (slate blue)

**Status Indicators**:
- Model Operational: `#10B981` (emerald)
- Model Degraded: `#F59E0B` (amber)
- Model Down: `#EF4444` (red)

### Typography

**Font Stack**:
- **Primary**: Inter (clean, accessible, web-optimized)
- **Headings**: Poppins (friendly, modern)
- **Monospace** (code, IDs): Fira Code

**Scale**:
- H1: 48px/56px (bold)
- H2: 36px/44px (bold)
- H3: 28px/36px (semibold)
- H4: 20px/28px (semibold)
- Body: 16px/24px (regular)
- Small: 14px/20px (regular)
- Tiny: 12px/16px (medium)

### Spacing System

Based on 8px grid:
- `xs`: 4px
- `sm`: 8px
- `md`: 16px
- `lg`: 24px
- `xl`: 32px
- `2xl`: 48px
- `3xl`: 64px

### Component Library

#### Buttons
- **Primary**: Solid ochre, white text, rounded-lg, shadow
- **Secondary**: Outline, ochre border, ochre text
- **Tertiary**: Ghost, no border, ochre text on hover
- **Disabled**: Gray, reduced opacity

**States**: Default, Hover, Active, Disabled, Loading

#### Cards
- White background
- Rounded corners (12px)
- Subtle shadow: `0 2px 8px rgba(0,0,0,0.08)`
- Hover: Lift effect (shadow increase)

#### Inputs
- Border: 1px solid `#E5E7EB`
- Focus: Border `#C87941`, ring `#C8794133`
- Error: Border `#C1121F`, helper text red
- Rounded: 8px
- Padding: 12px 16px

#### Chat Bubbles
- **AI Message**: Left-aligned, light gray background, rounded-tr-none
- **User Input**: Right-aligned, primary color background, white text, rounded-tl-none
- Avatar: 32px circle, model icon or user initial

#### Progress Indicators
- **Stepper**: Numbered circles with connecting lines
- **Loading Spinner**: Animated circular with primary color
- **Progress Bar**: Rounded, gradient fill

### Iconography

**Style**: Outline/Stroke-based (Lucide or Heroicons)
**Size**: 16px (small), 20px (default), 24px (large)

**Key Icons**:
- 📸 Upload: Camera icon
- 🤖 AI Model: Robot/chip icon
- 📊 Analytics: Bar chart icon
- ⚙️ Settings: Gear icon
- ✓ Success: Check circle
- ⚠️ Warning: Alert triangle
- 🩺 Clinical: Stethoscope icon
- 🌍 Geographic: Globe icon

### Animations

**Timing**: ease-in-out, 200-300ms

**Animations**:
- **Button Click**: Scale down slightly (0.98)
- **Card Hover**: Lift (translateY -2px)
- **Modal Enter**: Fade in + scale from 0.95
- **Chat Message**: Slide in from left/right + fade
- **Loading**: Rotate spinner, pulse dots

### Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px
- Wide: > 1440px

**Mobile-First Approach**:
- Stack cards vertically on mobile
- Hamburger menu for navigation
- Bottom navigation for admin portal
- Swipe gestures for model selection

---

## Accessibility Requirements

### WCAG 2.1 Level AA Compliance

1. **Color Contrast**: Minimum 4.5:1 for text, 3:1 for UI elements
2. **Keyboard Navigation**: All interactive elements accessible via keyboard
3. **Screen Reader Support**: Proper ARIA labels, semantic HTML
4. **Focus Indicators**: Visible focus rings on all interactive elements
5. **Alternative Text**: All images have descriptive alt text
6. **Form Labels**: Clear, associated labels for all inputs
7. **Error Messages**: Clear, descriptive error messages with suggestions

### Internationalization

- RTL support for Arabic, Hebrew
- Multi-language support (English, French, Swahili, Hausa, etc.)
- Date/time localization
- Number formatting

---

## Interaction Patterns

### Chat Interface Guidelines

1. **Progressive Disclosure**: One question at a time, scroll to new content
2. **Typing Indicator**: Show "AI is typing..." animation during processing
3. **Quick Replies**: Suggest common responses as pill buttons
4. **Skip Logic**: Hide irrelevant questions based on previous answers
5. **Validation**: Real-time validation with helpful error messages
6. **Save Progress**: Auto-save at each step, allow resume later

### Admin Portal Guidelines

1. **Bulk Actions**: Multi-select with checkbox + action bar
2. **Filtering**: Faceted search with multiple filters
3. **Sorting**: Click column headers to sort
4. **Infinite Scroll**: For submission lists
5. **Real-time Updates**: WebSocket for live status changes
6. **Confirmation Dialogs**: For destructive actions

---

## Performance Requirements

### Loading Times
- **Initial Page Load**: < 2 seconds
- **Image Upload**: < 1 second for preview
- **AI Analysis**: 30-60 seconds (with progress indicator)
- **Dashboard Load**: < 1.5 seconds

### Optimization
- **Image Compression**: Automatic compression before upload
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Route-based code splitting
- **CDN**: Static assets served from CDN
- **Caching**: Aggressive caching for static content

---

## Database Architecture & Data Management

### Prisma ORM Schema

DermAssist uses **Prisma ORM** for type-safe database management with PostgreSQL/Supabase.

**Core Data Models**:

1. **Provider** (Healthcare Providers)
   - License verification and authentication
   - Submission history tracking
   - Practice feed participation

2. **Submission** (Patient Cases)
   - De-identified patient images
   - Clinical context and symptoms
   - AI analysis results
   - Quality review status

3. **Diagnosis** (Practice Feed Entries)
   - Provider diagnostic attempts
   - Consensus building data
   - Learning progress tracking

4. **ModelHealthCheck** (System Monitoring)
   - AI model availability
   - Performance metrics
   - Error tracking

**Key Database Features**:
- **Row Level Security (RLS)**: Enforced at database level
- **Automatic Timestamps**: `createdAt`, `updatedAt` on all models
- **Image Hash Deduplication**: Prevent duplicate submissions
- **Indexed Queries**: Optimized for common access patterns
- **Type-Safe Queries**: Full TypeScript support via Prisma Client

**Data Flow**:
```
Provider → Upload Image → De-identify → AI Analysis → 
Submission (PENDING) → Admin Review → 
Submission (APPROVED_FOR_PRACTICE) → Practice Feed → 
Diagnosis by Multiple Providers → Consensus
```

**Privacy & De-identification**:
- Patient identifiers **never** stored in database
- Images automatically stripped of EXIF metadata
- Image hashes used for duplicate detection (not original images)
- Provider info limited to license verification (no PHI)
- Admin-reviewed before allocation to practice feed

### Database UI Considerations

**For Design**:
- Show submission status badges (Pending, Under Review, Approved, Failed)
- Display quality scores with visual indicators
- Present consensus percentages as progress bars or pie charts
- Use color coding for model health status (Green/Yellow/Red)
- Implement pagination for large datasets
- Show real-time updates for new submissions/diagnoses

---

## Security & Privacy UI Elements

### Trust Indicators
- 🔒 SSL certificate badge in footer
- "Your data is encrypted" message during submission
- "De-identification in progress" status during upload
- Privacy policy link prominently displayed

### Consent Management
- Clear, plain-language consent text
- Checkboxes for each consent item (cannot proceed without checking)
- "Learn More" expandable sections for detailed privacy info
- Download consent form as PDF

### Data Visualization Privacy
- No identifiable information displayed in any chart
- Aggregated data only (minimum 10 submissions per data point)
- Geographic data limited to country/region level

---

## Edge Cases & Error Handling

### Submission Flow Errors

**Poor Image Quality**:
- Message: "Image quality is too low for accurate analysis. Please upload a clearer photo."
- CTA: "Try Again" or "Continue Anyway"

**No Model Available**:
- Message: "All AI models are temporarily unavailable. Your submission will be queued and processed within 24 hours."
- CTA: "Queue Submission" or "Try Later"

**Network Timeout**:
- Message: "Connection lost. Your progress has been saved."
- CTA: "Retry" or "Continue Later"

**Unsupported File Type**:
- Message: "Please upload a JPG, PNG, or HEIC file."
- CTA: "Choose Another File"

### Admin Portal Errors

**Model Health Check Failure**:
- Alert banner: "⚠️ Claude Sonnet is experiencing issues. Submissions are being redirected to Gemini."
- Action: "View Details" → troubleshooting page

**API Quota Exceeded**:
- Alert: "🚨 API quota exceeded for GPT-5. Model disabled until quota resets."
- Action: "Upgrade Plan" or "Adjust Quotas"

---

## Animation & Microinteractions

### Delightful Moments

1. **Submission Success**: Confetti animation + success sound (optional)
2. **Model Selection**: Cards animate in with stagger effect
3. **Progress Bar**: Smooth fill with subtle pulse
4. **Image Upload**: Drag-over state highlights drop zone
5. **Health Check Pass**: Green checkmark animation
6. **Data Point Add**: Chart animates to include new point

### Loading States

- **Skeleton Screens**: For dashboard cards and tables
- **Shimmer Effect**: On loading cards
- **Spinners**: Only for < 5 second waits
- **Progress Bars**: For multi-step processes

---

## Technical Implementation Notes for Figma Make

### Component Structure

**Atomic Design Approach**:
1. **Atoms**: Buttons, inputs, icons, labels
2. **Molecules**: Chat bubble, model card, stat card
3. **Organisms**: Chat interface, dashboard section, submission form
4. **Templates**: Page layouts
5. **Pages**: Full pages with content

### Design Tokens

Export as JSON for developer handoff:
```json
{
  "colors": {
    "primary": "#C87941",
    "background": "#FAF9F6",
    ...
  },
  "spacing": {
    "sm": "8px",
    "md": "16px",
    ...
  },
  "typography": {
    "h1": {
      "fontSize": "48px",
      "lineHeight": "56px",
      "fontWeight": 700
    },
    ...
  }
}
```

### States to Design

For each interactive component:
- Default
- Hover
- Active/Pressed
- Focus
- Disabled
- Loading
- Error

### Prototyping

**Key Flows to Prototype**:
1. Complete submission flow (all 10 steps)
2. Model selection interaction
3. ICD-11 search and selection
4. Admin dashboard navigation
5. Health check trigger and result

**Transitions**:
- Page transitions: Fade + slide (300ms)
- Modal open/close: Scale + fade (200ms)
- Chat message: Slide + fade (250ms)

---

## Handoff Specifications

### What to Deliver

1. **Figma File** with:
   - All pages and components
   - Complete design system
   - Interactive prototype
   - Developer annotations

2. **Asset Export**:
   - Icons (SVG)
   - Images (PNG/WebP, 1x and 2x)
   - Illustrations (SVG)

3. **Documentation**:
   - Component usage guidelines
   - Interaction patterns
   - Responsive behavior notes
   - Animation specifications

4. **Design Tokens**: JSON file for developers

---

## Success Metrics

### User Experience Metrics
- **Submission Completion Rate**: > 85%
- **Average Completion Time**: < 5 minutes
- **User Satisfaction**: > 4.5/5
- **Return Submission Rate**: > 30%

### Admin Portal Metrics
- **Issue Resolution Time**: < 2 hours average
- **Model Uptime Visibility**: 100% (all health checks visible)
- **Admin Task Completion Time**: < 30 seconds for common tasks

---

## Future Enhancements

### Phase 2 Features
- Multi-language chat interface
- Voice input for clinical history
- Augmented reality for measurement (skin lesion size)
- Community forum for researchers
- Gamification (badges for submissions)
- Educational content based on submitted conditions

### Phase 3 Features
- Longitudinal tracking (follow-up submissions)
- Treatment outcome reporting
- Peer-to-peer anonymized case sharing
- Mobile app (native iOS/Android)

---

## Conclusion

This design specification provides a comprehensive blueprint for creating an engaging, accessible, and privacy-focused dermatology research platform. The conversational UI combined with game-like elements makes the submission process intuitive, while the robust admin portal ensures model health and data quality.

**Key Design Principles**:
1. **Privacy First**: Every design decision reinforces data de-identification
2. **Accessibility**: WCAG 2.1 AA compliance ensures universal access
3. **Cultural Sensitivity**: Afrocentric design reflects the target audience
4. **Delightful UX**: Microinteractions and animations create a memorable experience
5. **Admin Efficiency**: Purpose-built tools for healthcare providers

This specification should provide Figma Make with all necessary information to create a production-ready design system and prototype.
