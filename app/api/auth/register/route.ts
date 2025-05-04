import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const { email, password, firstName, lastName, userType } = await request.json()

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          user_type: userType,
        },
      },
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    const user = authData.user

    if (!user) {
      return NextResponse.json({ error: "User creation failed" }, { status: 400 })
    }

    // Create user record in our users table
    const { error: userError } = await supabase.from("users").insert([
      {
        id: user.id,
        email: user.email,
        first_name: firstName,
        last_name: lastName,
        user_type: userType as "hirer" | "applicant",
      },
    ])

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 400 })
    }

    // If user is a hirer, create a placeholder company
    if (userType === "hirer") {
      const { data: companyData, error: companyError } = await supabase
        .from("companies")
        .insert([
          {
            name: `${firstName}'s Company`,
            description: "Company description pending...",
          },
        ])
        .select()

      if (companyError) {
        return NextResponse.json({ error: companyError.message }, { status: 400 })
      }

      // Create hirer record
      if (companyData && companyData[0]) {
        const { error: hirerError } = await supabase.from("hirers").insert([
          {
            user_id: user.id,
            company_id: companyData[0].id,
            position: "Account Owner",
          },
        ])

        if (hirerError) {
          return NextResponse.json({ error: hirerError.message }, { status: 400 })
        }
      }
    } else {
      // Create applicant record
      const { error: applicantError } = await supabase.from("applicants").insert([
        {
          user_id: user.id,
          headline: `${firstName} ${lastName}`,
        },
      ])

      if (applicantError) {
        return NextResponse.json({ error: applicantError.message }, { status: 400 })
      }
    }

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: user.id,
        email: user.email,
        userType,
      },
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
