# 🔮 Prism – Platform Documentation

> **Tagline:** "Refracting Talents. Perfect Matches."  
> **Mission:** Make AI a job creator — not a job taker. A platform where intelligence meets opportunity.

## 📋 Table of Contents
- [Overview](#overview)
- [Core Features](#core-features)
- [Technical Architecture](#technical-architecture)
- [User Flows](#user-flows)
- [Integration Points](#integration-points)
- [Security & Compliance](#security--compliance)
- [Support & Resources](#support--resources)
- [Future Roadmap](#future-roadmap)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)

## 🌟 Overview

Prism is an AI-powered job matching platform that connects employers with talent through intelligent matching and streamlined hiring processes. Our mission is to make AI a job creator — not a job taker, creating a platform where intelligence meets opportunity.

## 🚀 Core Features

### 1. Registration & Onboarding
- **Dual-path Registration**
  - Hirers: Company-focused onboarding
  - Applicants: Talent-focused onboarding
- **Multiple Sign-up Methods**
  - Email registration
  - Google OAuth
  - LinkedIn integration
- **AI-powered Micro-onboarding**
  - Smart profile building
  - Automated skill detection
  - Personalized recommendations

### 2. Job Creation & Management
- **AI-powered Job Description Builder**
  - Drag & drop interface
  - Smart field suggestions
  - Automated formatting
- **Customizable Job Posting**
  - Experience requirements
  - Location settings
  - Skill requirements
  - Benefits and perks
- **Real-time Job Board**
  - Instant updates
  - Application tracking
  - Deadline management

### 3. Applicant Profile Building
- **Smart Resume Processing**
  - Multi-format support
  - Skills extraction
  - Experience parsing
- **AI-generated Profile**
  - Dynamic profile pages
  - Skills highlighting
  - Achievement showcase
- **Personalized Pitch**
  - AI-generated elevator pitch
  - Customized for each application
  - Real-time optimization

### 4. Job Matching & Application
- **Real-time Compatibility Scoring**
  - Skills matching
  - Culture fit analysis
  - Location compatibility
- **Advanced Filtering**
  - Skill match percentage
  - Job type
  - Location preferences
- **Multi-format Application**
  - Resume upload
  - Video introduction
  - Voice notes

### 5. AI-Powered Screening
- **Automated Evaluation**
  - Resume scoring
  - Skills assessment
  - Experience matching
- **Comparative Dashboard**
  - Visual match percentages
  - Skills mapping
  - Diversity analysis
- **Candidate Tagging**
  - Custom categories
  - Notes and comments
  - Priority marking

### 6. Interview Management
- **Automated Scheduling**
  - Calendar integration
  - Time zone handling
  - Automated invites
- **AI Interview Coach**
  - 3D Metahuman assistant
  - Practice sessions
  - Real-time feedback
- **Live Interview Tools**
  - Real-time transcription
  - Sentiment analysis
  - Smart follow-up suggestions

### 7. Hiring & Onboarding
- **Streamlined Decisions**
  - Candidate comparison
  - Team feedback
  - Decision tracking
- **Automated Onboarding**
  - Document signing
  - Welcome emails
  - First-day setup
- **Professional Communication**
  - Custom templates
  - Automated updates
  - Feedback delivery

## 💻 Technical Architecture

### Frontend Stack
| Technology | Purpose |
|------------|---------|
| React + Next.js | UI Framework |
| TailwindCSS | Styling |
| Metahuman | AI Coaching |

### Backend Stack
| Technology | Purpose |
|------------|---------|
| Supabase | Data Management |
| Node.js + Express | API Layer |
| PostgreSQL | Database |

### AI Integration
| Technology | Purpose |
|------------|---------|
| Gemini 2.0 Flash | Core AI Features & everything else |

### Security & Authentication
- **OAuth 2.0 + JWT** for secure authentication
- **SSL Encryption** for data protection
- **Two-factor Authentication** for account security

## 👥 User Flows

### For Hirers
1. **Registration & Setup**
   - Choose "I'm Hiring"
   - Complete company profile
   - Set up preferences

2. **Job Creation**
   - Create job posting
   - Set parameters
   - Publish listing

3. **Candidate Management**
   - Review applications
   - Screen candidates
   - Schedule interviews

4. **Hiring Process**
   - Conduct interviews
   - Make decisions
   - Onboard new hires

### For Applicants
1. **Profile Creation**
   - Choose "I'm Looking for Work"
   - Build profile
   - Upload resume

2. **Job Search**
   - Browse listings
   - Filter opportunities
   - View matches

3. **Application Process**
   - Submit applications
   - Prepare for interviews
   - Receive feedback

## 🔌 Integration Points

### Core Integrations
- **Jitsi**: Video interviews
- **SendGrid**: Email communications
- **Stripe**: Payment processing
- **Zapier**: Workflow automation

## 🔒 Security & Compliance

### Data Protection
- End-to-end encryption
- Regular security audits
- GDPR compliance
- Data retention policies

### User Privacy
- Transparent data usage
- User consent management
- Data access controls
- Privacy settings

## 🆘 Support & Resources

### Help Center
- Documentation
- Video tutorials
- FAQs
- Best practices

### Community
- User forums
- Success stories
- Feature requests
- Beta testing

## 🗺️ Future Roadmap

### Short-term (Q2-Q3)
- Enhanced matching algorithms
- Mobile app development
- Advanced analytics

### Long-term (Q4+)
- Global expansion
- AI coach improvements
- Integration marketplace
- Advanced automation

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    user_type ENUM('hirer', 'applicant') NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    reset_token VARCHAR(255),
    profile_completed BOOLEAN DEFAULT FALSE
);
```

### Companies Table
```sql
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    website VARCHAR(255),
    logo_url VARCHAR(255),
    industry VARCHAR(100),
    size VARCHAR(50),
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Hirers Table
```sql
CREATE TABLE hirers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    company_id UUID REFERENCES companies(id),
    position VARCHAR(100),
    department VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Applicants Table
```sql
CREATE TABLE applicants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    headline VARCHAR(255),
    bio TEXT,
    location VARCHAR(255),
    resume_url VARCHAR(255),
    profile_picture_url VARCHAR(255),
    skills JSONB,
    experience JSONB,
    education JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Jobs Table
```sql
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id),
    hirer_id UUID REFERENCES hirers(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    requirements JSONB,
    benefits JSONB,
    location VARCHAR(255),
    remote_policy VARCHAR(50),
    job_type VARCHAR(50),
    experience_level VARCHAR(50),
    salary_range JSONB,
    status VARCHAR(50) DEFAULT 'draft',
    deadline TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Applications Table
```sql
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID REFERENCES jobs(id),
    applicant_id UUID REFERENCES applicants(id),
    status VARCHAR(50) DEFAULT 'pending',
    cover_letter TEXT,
    video_url VARCHAR(255),
    ai_score FLOAT,
    ai_feedback JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Interviews Table
```sql
CREATE TABLE interviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    application_id UUID REFERENCES applications(id),
    scheduled_time TIMESTAMP WITH TIME ZONE,
    duration INTEGER,
    status VARCHAR(50) DEFAULT 'scheduled',
    feedback JSONB,
    recording_url VARCHAR(255),
    transcript TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Skills Table
```sql
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### UserSkills Table
```sql
CREATE TABLE user_skills (
    user_id UUID REFERENCES users(id),
    skill_id UUID REFERENCES skills(id),
    proficiency_level INTEGER,
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, skill_id)
);
```

## 📁 Project Structure

```
prism-web/
├── .github/                    # GitHub workflows and configurations
├── public/                     # Static assets
│   ├── images/
│   │   └── robots.txt
│   ├── src/
│   │   ├── app/                    # Next.js app directory
│   │   │   ├── (auth)/            # Authentication routes
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   └── forgot-password/
│   │   │   ├── (dashboard)/       # Dashboard routes
│   │   │   │   ├── hirer/
│   │   │   │   └── applicant/
│   │   │   ├── api/               # API routes
│   │   │   └── layout.tsx         # Root layout
│   │   ├── components/            # Reusable components
│   │   │   ├── common/           # Shared components
│   │   │   ├── hirer/           # Hirer-specific components
│   │   │   ├── applicant/       # Applicant-specific components
│   │   │   └── ai/              # AI-related components
│   │   ├── config/               # Configuration files
│   │   │   ├── constants.ts
│   │   │   └── theme.ts
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions and libraries
│   │   │   ├── supabase/        # Supabase client and utilities
│   │   │   ├── ai/              # AI integration utilities
│   │   │   └── utils/           # General utilities
│   │   ├── styles/              # Global styles and Tailwind config
│   │   ├── types/               # TypeScript type definitions
│   │   └── store/               # State management
│   │       ├── auth/           # Authentication state
│   │       ├── jobs/           # Jobs state
│   │       └── ui/             # UI state
│   ├── tests/                   # Test files
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   ├── docs/                    # Documentation
│   ├── .env.example            # Environment variables example
│   ├── .eslintrc.js           # ESLint configuration
│   ├── .prettierrc            # Prettier configuration
│   └── next.config.js         # Next.js configuration
├── package.json           # Project dependencies
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

### Key Directories Explained

#### `src/app/`
- Uses Next.js 13+ app directory structure
- Route groups in parentheses for better organization
- Separate layouts for different user types

#### `src/components/`
- Organized by feature and user type
- Common components shared across the application
- AI-specific components for interview coaching and matching

#### `src/lib/`
- Contains all third-party integrations
- Utility functions and helpers
- Type-safe API clients

#### `src/store/`
- State management using Zustand
- Separated by feature domain
- Includes authentication, jobs, and UI state

#### `src/types/`
- TypeScript type definitions
- Shared interfaces and types
- API response types

---

*Last updated: [Current Date]*
     