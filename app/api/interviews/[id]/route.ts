import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const interviewId = params.id

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user type
    const { data: userData, error: userDataError } = await supabase
      .from("users")
      .select("user_type")
      .eq("id", user.id)
      .single()

    if (userDataError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Get interview with related data
    const { data: interview, error: interviewError } = await supabase
      .from("interviews")
      .select(`
        *,
        applications (
          id,
          job_id,
          applicant_id,
          status,
          cover_letter,
          video_url,
          ai_score,
          ai_feedback,
          jobs (
            id,
            title,
            description,
            location,
            remote_policy,
            job_type,
            companies (
              name,
              logo_url,
              industry,
              location,
              website
            )
          ),
          applicants (
            id,
            headline,
            bio,
            location,
            resume_url,
            profile_picture_url,
            users (
              first_name,
              last_name,
              email
            )
          )
        )
      `)
      .eq("id", interviewId)
      .single()

    if (interviewError) {
      return NextResponse.json({ error: interviewError.message }, { status: 400 })
    }

    if (!interview) {
      return NextResponse.json({ error: "Interview not found" }, { status: 404 })
    }

    // Check if user has permission to view this interview
    if (userData.user_type === "applicant") {
      // Get applicant ID
      const { data: applicantData, error: applicantError } = await supabase
        .from("applicants")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (applicantError || !applicantData) {
        return NextResponse.json({ error: "Applicant profile not found" }, { status: 404 })
      }

      // Check if interview is for this applicant
      if (interview.applications.applicant_id !== applicantData.id) {
        return NextResponse.json({ error: "You are not authorized to view this interview" }, { status: 403 })
      }
    } else if (userData.user_type === "hirer") {
      // Get hirer's company ID
      const { data: hirerData, error: hirerError } = await supabase
        .from("hirers")
        .select("company_id")
        .eq("user_id", user.id)
        .single()

      if (hirerError || !hirerData) {
        return NextResponse.json({ error: "Hirer profile not found" }, { status: 404 })
      }

      // Check if job belongs to hirer's company
      if (interview.applications.jobs.companies.id !== hirerData.company_id) {
        return NextResponse.json({ error: "You are not authorized to view this interview" }, { status: 403 })
      }
    }

    return NextResponse.json({ interview })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createServerSupabaseClient()
    const interviewId = params.id
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    
    // Get user type\
    const { data: userDataI'll create a script to set up all the necessary database tables for the Prism platform based on the schema provided in the documentation.

```js type="nodejs" project="Prism Database Setup" file="setup-database.js"
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  console.log('Starting database setup...');

  try {
    // Create enum type for user_type
    console.log('Creating user_type enum...');
    await supabase.rpc('exec', { 
      query: `
        DO $$
        BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type_enum') THEN
            CREATE TYPE user_type_enum AS ENUM ('hirer', 'applicant');
          END IF;
        END
        $$;
      `
    });

    // Create users table
    console.log('Creating users table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255),
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          user_type user_type_enum NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          last_login TIMESTAMP WITH TIME ZONE,
          is_verified BOOLEAN DEFAULT FALSE,
          verification_token VARCHAR(255),
          reset_token VARCHAR(255),
          profile_completed BOOLEAN DEFAULT FALSE
        );
      `
    });

    // Create companies table
    console.log('Creating companies table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS companies (
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
      `
    });

    // Create hirers table
    console.log('Creating hirers table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS hirers (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES users(id),
          company_id UUID REFERENCES companies(id),
          position VARCHAR(100),
          department VARCHAR(100),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create applicants table
    console.log('Creating applicants table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS applicants (
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
      `
    });

    // Create jobs table
    console.log('Creating jobs table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS jobs (
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
      `
    });

    // Create applications table
    console.log('Creating applications table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS applications (
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
      `
    });

    // Create interviews table
    console.log('Creating interviews table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS interviews (
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
      `
    });

    // Create skills table
    console.log('Creating skills table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS skills (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          name VARCHAR(100) UNIQUE NOT NULL,
          category VARCHAR(50),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `
    });

    // Create user_skills table
    console.log('Creating user_skills table...');
    await supabase.rpc('exec', { 
      query: `
        CREATE TABLE IF NOT EXISTS user_skills (
          user_id UUID REFERENCES users(id),
          skill_id UUID REFERENCES skills(id),
          proficiency_level INTEGER,
          verified BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          PRIMARY KEY (user_id, skill_id)
        );
      `
    });

    // Create some initial skill categories
    console.log('Adding initial skill categories...');
    await supabase.rpc('exec', { 
      query: `
        INSERT INTO skills (name, category) VALUES
        ('JavaScript', 'Programming'),
        ('TypeScript', 'Programming'),
        ('React', 'Frontend'),
        ('Next.js', 'Frontend'),
        ('Node.js', 'Backend'),
        ('PostgreSQL', 'Database'),
        ('Python', 'Programming'),
        ('Java', 'Programming'),
        ('C#', 'Programming'),
        ('AWS', 'Cloud'),
        ('Azure', 'Cloud'),
        ('GCP', 'Cloud'),
        ('Docker', 'DevOps'),
        ('Kubernetes', 'DevOps'),
        ('Git', 'DevOps'),
        ('Figma', 'Design'),
        ('Adobe XD', 'Design'),
        ('UI/UX', 'Design'),
        ('Product Management', 'Management'),
        ('Agile', 'Methodology'),
        ('Scrum', 'Methodology'),
        ('Leadership', 'Soft Skill'),
        ('Communication', 'Soft Skill'),
        ('Problem Solving', 'Soft Skill')
        ON CONFLICT (name) DO NOTHING;
      `
    });

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();
