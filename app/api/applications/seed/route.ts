import { NextResponse } from "next/server"
import { seedApplications } from "../seed"

export async function POST() {
  try {
    await seedApplications()
    return NextResponse.json({ message: "Successfully seeded applications data" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}