import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

import type { NextRequest } from "next/server"
import type { Database } from "@/types/supabase"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const userType = requestUrl.searchParams.get("user_type") || "applicant"

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient<Database>({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Check if user already exists in our users table
      const { data: existingUser } = await supabase.from("users").select("*").eq("id", user.id).single()

      if (!existingUser) {
        // Create user record in our users table
        await supabase.from("users").insert([
          {
            id: user.id,
            email: user.email,
            first_name: user.user_metadata.full_name?.split(" ")[0] || "",
            last_name: user.user_metadata.full_name?.split(" ").slice(1).join(" ") || "",
            user_type: userType as "hirer" | "applicant",
          },
        ])

        // If user is a hirer, create a placeholder company
        if (userType === "hirer") {
          const { data: companyData } = await supabase
            .from("companies")
            .insert([
              {
                name: `${user.user_metadata.full_name || "New"}'s Company`,
                description: "Company description pending...",
              },
            ])
            .select()

          // Create hirer record
          if (companyData && companyData[0]) {
            await supabase.from("hirers").insert([
              {
                user_id: user.id,
                company_id: companyData[0].id,
                position: "Account Owner",
              },
            ])
          }
        } else {
          // Create applicant record
          await supabase.from("applicants").insert([
            {
              user_id: user.id,
              headline: user.user_metadata.full_name || "New User",
            },
          ])
        }

        // Redirect to onboarding
        return NextResponse.redirect(`${requestUrl.origin}/onboarding/${userType}`)
      }

      // User exists, redirect to dashboard
      const dashboardPath = existingUser.user_type === "hirer" ? "/dashboard/hirer" : "/dashboard/applicant"
      return NextResponse.redirect(`${requestUrl.origin}${dashboardPath}`)
    }
  }

  // Something went wrong, redirect to login
  return NextResponse.redirect(`${requestUrl.origin}/login`)
}
