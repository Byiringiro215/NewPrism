import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const jobId = params.id

    const { data: job, error } = await supabase
      .from("jobs")
      .select(`
        *,
        companies (
          name,
          logo_url,
          industry,
          location,
          website
        ),
        hirers (
          id,
          position,
          users (
            first_name,
            last_name
          )
        )
      `)
      .eq("id", jobId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    return NextResponse.json({ job })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const jobId = params.id

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is authorized to update this job
    const { data: hirerData, error: hirerError } = await supabase
      .from("hirers")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (hirerError || !hirerData) {
      return NextResponse.json({ error: "Only hirers can update job postings" }, { status: 403 })
    }

    // Check if job belongs to this hirer
    const { data: jobCheck, error: jobCheckError } = await supabase
      .from("jobs")
      .select("hirer_id")
      .eq("id", jobId)
      .single()

    if (jobCheckError || !jobCheck) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    if (jobCheck.hirer_id !== hirerData.id) {
      return NextResponse.json({ error: "You are not authorized to update this job" }, { status: 403 })
    }

    // Get job data from request
    const jobData = await request.json()

    // Update job
    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .update({
        title: jobData.title,
        description: jobData.description,
        requirements: jobData.requirements,
        benefits: jobData.benefits,
        location: jobData.location,
        remote_policy: jobData.remote_policy,
        job_type: jobData.job_type,
        experience_level: jobData.experience_level,
        salary_range: jobData.salary_range,
        status: jobData.status,
        deadline: jobData.deadline,
        updated_at: new Date().toISOString(),
      })
      .eq("id", jobId)
      .select()
      .single()

    if (jobError) {
      return NextResponse.json({ error: jobError.message }, { status: 400 })
    }

    return NextResponse.json({ job })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const jobId = params.id

    // Get current user
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is authorized to delete this job
    const { data: hirerData, error: hirerError } = await supabase
      .from("hirers")
      .select("id")
      .eq("user_id", user.id)
      .single()

    if (hirerError || !hirerData) {
      return NextResponse.json({ error: "Only hirers can delete job postings" }, { status: 403 })
    }

    // Check if job belongs to this hirer
    const { data: jobCheck, error: jobCheckError } = await supabase
      .from("jobs")
      .select("hirer_id")
      .eq("id", jobId)
      .single()

    if (jobCheckError || !jobCheck) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    if (jobCheck.hirer_id !== hirerData.id) {
      return NextResponse.json({ error: "You are not authorized to delete this job" }, { status: 403 })
    }

    // Delete job
    const { error: deleteError } = await supabase.from("jobs").delete().eq("id", jobId)

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 400 })
    }

    return NextResponse.json({ message: "Job deleted successfully" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
