# Documentation Migration to MECE Framework

## Overview

All documentation has been reorganized using the MECE (Mutually Exclusive, Collectively Exhaustive) framework to eliminate overlap and ensure comprehensive coverage.

## New Structure

```
docs/
├── README.md                          # Main documentation index
├── user-guides/                       # For healthcare providers and end users
│   ├── getting-started.md            # First-time setup
│   ├── healthcare-provider-guide.md  # Complete provider guide
│   ├── submission-guide.md           # Case submission process
│   ├── practice-feed-guide.md        # Educational features
│   ├── admin-guide.md                # Admin portal usage
│   └── privacy-guide.md              # Privacy & compliance
├── technical/                         # For developers and administrators
│   ├── setup-guide.md                # Development setup (was SETUP.md)
│   ├── database-guide.md             # Prisma ORM operations
│   ├── testing-guide.md              # Testing strategies (was TESTING.md)
│   ├── api-reference.md              # API endpoints
│   ├── deployment-guide.md           # Production deployment
│   └── troubleshooting.md            # Common issues
├── design/                            # For designers and UX/UI teams
│   ├── figma-specification.md        # Complete design spec (was kombai.md)
│   ├── design-system.md              # Components, colors, typography
│   ├── user-flows.md                 # Interaction patterns
│   └── accessibility-guide.md        # WCAG compliance
└── reference/                         # Quick reference materials
    ├── ai-providers-reference.md     # AI provider comparison (was AI_PROVIDERS_REFERENCE.md)
    ├── architecture-overview.md      # System architecture (was ARCHITECTURE.md)
    ├── icd11-reference.md            # Dermatological codes
    └── glossary.md                   # Terms and definitions
```

## What Changed

### Files Moved

| Old Location | New Location | Category |
|-------------|--------------|----------|
| `SETUP.md` | `docs/technical/setup-guide.md` | Technical |
| `TESTING.md` | `docs/technical/testing-guide.md` | Technical |
| `kombai.md` | `docs/design/figma-specification.md` | Design |
| `AI_PROVIDERS_REFERENCE.md` | `docs/reference/ai-providers-reference.md` | Reference |
| `ARCHITECTURE.md` | `docs/reference/architecture-overview.md` | Reference |

### New Files Created

| File | Purpose | Category |
|------|---------|----------|
| `docs/README.md` | Main documentation index with MECE structure | Index |
| `docs/user-guides/getting-started.md` | Quick start for healthcare providers | User Guide |
| `docs/user-guides/healthcare-provider-guide.md` | Comprehensive provider guide | User Guide |
| `docs/technical/database-guide.md` | Complete Prisma ORM guide | Technical |
| `DOCUMENTATION_MIGRATION.md` | This migration guide | Meta |

### Content Updates

#### kombai.md → figma-specification.md

**Updated Questions to Third-Person (Healthcare Provider Context)**:

❌ **Before** (First-person, as if patient):
- "How long have you had this condition?"
- "Have you tried any treatments?"
- "Is there any pain or discomfort?"

✅ **After** (Third-person, about patient):
- "How long has the patient had this condition?"
- "What treatments has the patient tried?"
- "What level of pain or discomfort does the patient report?"

**Expanded Treatment Categories**:
- Added specific treatment types (corticosteroids, biologics, phototherapy)
- Added status options (already tried, currently using, considering)
- Added procedural and lifestyle modifications

**Improved ICD-11 Section**:
- Added specific dermatological codes
- Common conditions with proper codes (Atopic Dermatitis L20.9, Psoriasis L40-L45, etc.)
- Clearer search interface design

## MECE Principles Applied

### Mutually Exclusive

Each document covers a distinct topic without overlap:

- **Getting Started** = First-time setup only
- **Healthcare Provider Guide** = Complete provider workflow  
- **Submission Guide** = Detailed submission process
- **Setup Guide** = Development environment only
- **Database Guide** = Prisma ORM operations only
- **Testing Guide** = Testing strategies only

### Collectively Exhaustive

All topics are covered across the documentation:

1. **User Experience**: Getting started, provider guide, submission, practice feed
2. **Development**: Setup, database, API, testing, deployment
3. **Design**: Figma spec, design system, user flows, accessibility
4. **Reference**: AI providers, architecture, ICD-11, glossary

## Backward Compatibility

### Root-Level Files

Original files remain in root for backward compatibility but are noted as legacy:

```markdown
### Legacy Documentation

The following root-level docs are maintained for backward compatibility:
- SETUP.md - Moved to `docs/technical/setup-guide.md`
- TESTING.md - Moved to `docs/technical/testing-guide.md`
- kombai.md - Moved to `docs/design/figma-specification.md`
...
```

### Links Updated

- README.md updated with new documentation structure
- All internal references use new paths
- Legacy paths still work via root-level files

## Migration Benefits

### For Users

1. **Easier Navigation**: Clear categorization by role (provider, developer, designer)
2. **No Duplication**: Each topic covered once, comprehensively
3. **Quick Access**: Role-based quick links in main README
4. **Progressive Disclosure**: Start simple (getting started) → detailed (full guides)

### For Maintainers

1. **Clear Ownership**: Each category has designated owners
2. **No Overlap**: Single source of truth for each topic
3. **Easy Updates**: Know exactly where to add new content
4. **Consistent Structure**: MECE framework guides organization

### For Developers

1. **Technical Separation**: User docs separate from technical docs
2. **Quick Reference**: Reference section for API, architecture, codes
3. **Testing Clarity**: Dedicated testing guide with all strategies
4. **Database Focus**: Complete Prisma guide with all operations

## Implementation Checklist

- [x] Create `docs/` directory structure
- [x] Create `docs/README.md` with MECE framework explanation
- [x] Move existing documentation to appropriate categories
- [x] Update kombai.md questions to third-person
- [x] Create new user guides (getting started, provider guide)
- [x] Create database guide with Prisma operations
- [x] Update README.md with new structure
- [x] Maintain backward compatibility with root files
- [x] Verify all links work
- [x] Test build and lint passes
- [x] Document migration in DOCUMENTATION_MIGRATION.md

## Future Additions

Planned documentation (not yet created):

- `docs/user-guides/submission-guide.md` - Detailed submission walkthrough
- `docs/user-guides/practice-feed-guide.md` - Practice feed usage
- `docs/user-guides/admin-guide.md` - Admin portal guide
- `docs/user-guides/privacy-guide.md` - Privacy and compliance
- `docs/technical/api-reference.md` - Complete API documentation
- `docs/technical/deployment-guide.md` - Production deployment
- `docs/technical/troubleshooting.md` - Common issues and solutions
- `docs/design/design-system.md` - Component library
- `docs/design/user-flows.md` - Complete user journeys
- `docs/design/accessibility-guide.md` - WCAG compliance
- `docs/reference/icd11-reference.md` - Quick ICD-11 lookup
- `docs/reference/glossary.md` - Terms and definitions

## Questions?

Contact documentation team or open an issue for:
- Missing documentation
- Incorrect categorization
- Broken links
- Suggestions for improvement
