import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { email, password } = await request.json()

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Update last_login in users table
    await supabase.from("users").update({ last_login: new Date().toISOString() }).eq("id", data.user.id)

    // Get user type to determine redirect
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("user_type, profile_completed")
      .eq("id", data.user.id)
      .single()

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 })
    }

    // Determine where to redirect the user
    let redirectUrl = "/dashboard"

    if (!userData.profile_completed) {
      redirectUrl = `/onboarding/${userData.user_type}`
    } else {
      redirectUrl = `/dashboard/${userData.user_type}`
    }

    return NextResponse.json({
      message: "Login successful",
      user: data.user,
      redirectUrl,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
