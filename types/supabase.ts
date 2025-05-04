export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string | null
          first_name: string | null
          last_name: string | null
          user_type: "hirer" | "applicant"
          created_at: string
          updated_at: string
          last_login: string | null
          is_verified: boolean
          verification_token: string | null
          reset_token: string | null
          profile_completed: boolean
        }
        Insert: {
          id?: string
          email: string
          password_hash?: string | null
          first_name?: string | null
          last_name?: string | null
          user_type: "hirer" | "applicant"
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_verified?: boolean
          verification_token?: string | null
          reset_token?: string | null
          profile_completed?: boolean
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string | null
          first_name?: string | null
          last_name?: string | null
          user_type?: "hirer" | "applicant"
          created_at?: string
          updated_at?: string
          last_login?: string | null
          is_verified?: boolean
          verification_token?: string | null
          reset_token?: string | null
          profile_completed?: boolean
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          website: string | null
          logo_url: string | null
          industry: string | null
          size: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          website?: string | null
          logo_url?: string | null
          industry?: string | null
          size?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hirers: {
        Row: {
          id: string
          user_id: string
          company_id: string
          position: string | null
          department: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_id: string
          position?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_id?: string
          position?: string | null
          department?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      applicants: {
        Row: {
          id: string
          user_id: string
          headline: string | null
          bio: string | null
          location: string | null
          resume_url: string | null
          profile_picture_url: string | null
          skills: Json | null
          experience: Json | null
          education: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          headline?: string | null
          bio?: string | null
          location?: string | null
          resume_url?: string | null
          profile_picture_url?: string | null
          skills?: Json | null
          experience?: Json | null
          education?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          headline?: string | null
          bio?: string | null
          location?: string | null
          resume_url?: string | null
          profile_picture_url?: string | null
          skills?: Json | null
          experience?: Json | null
          education?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      jobs: {
        Row: {
          id: string
          company_id: string
          hirer_id: string
          title: string
          description: string
          requirements: Json | null
          benefits: Json | null
          location: string | null
          remote_policy: string | null
          job_type: string | null
          experience_level: string | null
          salary_range: Json | null
          status: string
          deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          hirer_id: string
          title: string
          description: string
          requirements?: Json | null
          benefits?: Json | null
          location?: string | null
          remote_policy?: string | null
          job_type?: string | null
          experience_level?: string | null
          salary_range?: Json | null
          status?: string
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          hirer_id?: string
          title?: string
          description?: string
          requirements?: Json | null
          benefits?: Json | null
          location?: string | null
          remote_policy?: string | null
          job_type?: string | null
          experience_level?: string | null
          salary_range?: Json | null
          status?: string
          deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      applications: {
        Row: {
          id: string
          job_id: string
          applicant_id: string
          status: string
          cover_letter: string | null
          video_url: string | null
          ai_score: number | null
          ai_feedback: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          job_id: string
          applicant_id: string
          status?: string
          cover_letter?: string | null
          video_url?: string | null
          ai_score?: number | null
          ai_feedback?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          job_id?: string
          applicant_id?: string
          status?: string
          cover_letter?: string | null
          video_url?: string | null
          ai_score?: number | null
          ai_feedback?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      interviews: {
        Row: {
          id: string
          application_id: string
          scheduled_time: string | null
          duration: number | null
          status: string
          feedback: Json | null
          recording_url: string | null
          transcript: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          application_id: string
          scheduled_time?: string | null
          duration?: number | null
          status?: string
          feedback?: Json | null
          recording_url?: string | null
          transcript?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          application_id?: string
          scheduled_time?: string | null
          duration?: number | null
          status?: string
          feedback?: Json | null
          recording_url?: string | null
          transcript?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          created_at?: string
        }
      }
      user_skills: {
        Row: {
          user_id: string
          skill_id: string
          proficiency_level: number | null
          verified: boolean
          created_at: string
        }
        Insert: {
          user_id: string
          skill_id: string
          proficiency_level?: number | null
          verified?: boolean
          created_at?: string
        }
        Update: {
          user_id?: string
          skill_id?: string
          proficiency_level?: number | null
          verified?: boolean
          created_at?: string
        }
      }
    }
  }
}
