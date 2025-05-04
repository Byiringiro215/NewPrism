import { NextResponse } from "next/server"
import { seedJobs } from "../seed"

export async function POST() {
  try {
    await seedJobs()
    return NextResponse.json({ message: "Successfully seeded jobs data" })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}