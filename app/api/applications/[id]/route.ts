import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const applicationId = params.id

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

    // Get application with related data
    const { data: application, error: applicationError } = await supabase
      .from("applications")
      .select(`
        *,
        jobs (
          id,
          title,
          description,
          location,
          remote_policy,
          job_type,
          experience_level,
          salary_range,
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
          skills,
          experience,
          education,
          users (
            first_name,
            last_name,
            email
          )
        ),
        interviews (
          id,
          scheduled_time,
          duration,
          status
        )
      `)
      .eq("id", applicationId)
      .single()

    if (applicationError) {
      return NextResponse.json({ error: applicationError.message }, { status: 400 })
    }

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Check if user has permission to view this application
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

      // Check if application belongs to this applicant
      if (application.applicant_id !== applicantData.id) {
        return NextResponse.json({ error: "You are not authorized to view this application" }, { status: 403 })
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
      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .select("company_id")
        .eq("id", application.job_id)
        .single()

      if (jobError || !jobData) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 })
      }

      if (jobData.company_id !== hirerData.company_id) {
        return NextResponse.json({ error: "You are not authorized to view this application" }, { status: 403 })
      }
    }

    return NextResponse.json({ application })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const applicationId = params.id

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

    // Get application data
    const applicationData = await request.json()

    // Check if application exists
    const { data: existingApplication, error: existingApplicationError } = await supabase
      .from("applications")
      .select("*")
      .eq("id", applicationId)
      .single()

    if (existingApplicationError || !existingApplication) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Check permissions and update application
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

      // Check if application belongs to this applicant
      if (existingApplication.applicant_id !== applicantData.id) {
        return NextResponse.json({ error: "You are not authorized to update this application" }, { status: 403 })
      }

      // Applicants can only update cover letter and video URL
      const { data: application, error: applicationError } = await supabase
        .from("applications")
        .update({
          cover_letter: applicationData.cover_letter,
          video_url: applicationData.video_url,
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .select()
        .single()

      if (applicationError) {
        return NextResponse.json({ error: applicationError.message }, { status: 400 })
      }

      return NextResponse.json({ application })
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
      const { data: jobData, error: jobError } = await supabase
        .from("jobs")
        .select("company_id")
        .eq("id", existingApplication.job_id)
        .single()

      if (jobError || !jobData) {
        return NextResponse.json({ error: "Job not found" }, { status: 404 })
      }

      if (jobData.company_id !== hirerData.company_id) {
        return NextResponse.json({ error: "You are not authorized to update this application" }, { status: 403 })
      }

      // Hirers can update status and AI feedback
      const { data: application, error: applicationError } = await supabase
        .from("applications")
        .update({
          status: applicationData.status,
          ai_score: applicationData.ai_score,
          ai_feedback: applicationData.ai_feedback,
          updated_at: new Date().toISOString(),
        })
        .eq("id", applicationId)
        .select()
        .single()

      if (applicationError) {
        return NextResponse.json({ error: applicationError.message }, { status: 400 })
      }

      return NextResponse.json({ application })
    } else {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
