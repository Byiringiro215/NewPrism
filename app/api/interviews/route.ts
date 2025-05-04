import { NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const data = await req.json()

    const { data: interview, error } = await supabase
      .from("interviews")
      .insert([{
        ...data,
        status: "scheduled",
        created_at: new Date().toISOString(),
      }])
      .select(`
        *,
        application:applications(
          applicant:applicants(
            id,
            user:users(
              first_name,
              last_name,
              email
            )
          ),
          job:jobs(
            title,
            company:companies(name)
          )
        )
      `)
      .single()

    if (error) throw error

    return NextResponse.json(interview)
  } catch (error) {
    console.error("Error scheduling interview:", error)
    return NextResponse.json(
      { error: "Failed to schedule interview" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(req.url)
    
    const applicationId = searchParams.get("applicationId")
    const status = searchParams.get("status")
    const fromDate = searchParams.get("fromDate")
    const toDate = searchParams.get("toDate")

    const query = supabase.from("interviews").select(`
      *,
      application:applications(
        applicant:applicants(
          id,
          user:users(
            first_name,
            last_name,
            email
          )
        ),
        job:jobs(
          title,
          company:companies(name)
        )
      )
    `)

    if (applicationId) query.eq("application_id", applicationId)
    if (status) query.eq("status", status)
    if (fromDate) query.gte("scheduled_time", fromDate)
    if (toDate) query.lte("scheduled_time", toDate)

    const { data: interviews, error } = await query

    if (error) throw error

    return NextResponse.json(interviews)
  } catch (error) {
    console.error("Error fetching interviews:", error)
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const data = await req.json()
    const { id, ...updates } = data

    const { data: interview, error } = await supabase
      .from("interviews")
      .update(updates)
      .eq("id", id)
      .select(`
        *,
        application:applications(
          applicant:applicants(
            id,
            user:users(
              first_name,
              last_name,
              email
            )
          ),
          job:jobs(
            title,
            company:companies(name)
          )
        )
      `)
      .single()

    if (error) throw error

    return NextResponse.json(interview)
  } catch (error) {
    console.error("Error updating interview:", error)
    return NextResponse.json(
      { error: "Failed to update interview" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Interview ID is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("interviews")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error canceling interview:", error)
    return NextResponse.json(
      { error: "Failed to cancel interview" },
      { status: 500 }
    )
  }
}
