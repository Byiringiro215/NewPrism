import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const url = new URL(request.url)
    
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
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
    
    // Get query parameters
    const limit = Number.parseInt(url.searchParams.get("limit") || "10")
    const page = Number.parseInt(url.searchParams.get("page") || "1")
    const status = url.searchParams.get("status") || ""
    
    // Calculate offset
    const offset = (page - 1) * limit
    
    let query;
    
    if (userData.user_type === "applicant") {
      // Get applicant ID
      const { data: applicantData, error: applicantError } = await supabase
        .from("applicants")
        .select("id")
        .eq("user_id", user.id)
        .single()
      
      if (applicantError || !applicantData) {
        return NextResponse.json({ error: "Applicant not found" }, { status: 404 })
      }
      
      query = supabase
        .from("applications")
        .select("*")
        .eq("applicant_id", applicantData.id)
    } else if (userData.user_type === "hirer") {
      // Get hirer ID
      const { data: hirerData, error: hirerError } = await supabase
        .from("hirers")
        .select("id")
        .eq("user_id", user.id)
        .single()
      
      if (hirerError || !hirerData) {
        return NextResponse.json({ error: "Hirer not found" }, { status: 404 })
      }
      
      query = supabase
        .from("applications")
        .select("*")
        .eq("hirer_id", hirerData.id)
    } else {
      return NextResponse.json({ error: "Invalid user type" }, { status: 400 })
    }
    
    if (status) {
      query = query.eq("status", status)
    }
    
    const { data: applications, error: applicationsError } = await query
      .range(offset, offset + limit - 1)
    
    if (applicationsError) {
      return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 })
    }
    
    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const data = await req.json()

    const { data: application, error } = await supabase
      .from("applications")
      .insert([{
        ...data,
        status: "pending",
        created_at: new Date().toISOString(),
      }])
      .select(`
        *,
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
      `)
      .single()

    if (error) throw error

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json(
      { error: "Failed to create application" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const data = await req.json()
    const { id, ...updates } = data

    const { data: application, error } = await supabase
      .from("applications")
      .update(updates)
      .eq("id", id)
      .select(`
        *,
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
      `)
      .single()

    if (error) throw error

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json(
      { error: "Failed to update application" },
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
        { error: "Application ID is required" },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from("applications")
      .delete()
      .eq("id", id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 }
    )
  }
}
