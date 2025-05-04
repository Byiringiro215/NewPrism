"use client"

import DashboardLayout from "@/components/dashboard-layout"
import JobManagement from "@/components/dashboard/hirer/JobManagement"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function JobsPage() {
  const router = useRouter()

  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Job Management</h1>
            <p className="text-white/70">Create and manage your job postings</p>
          </div>
          <Button onClick={() => router.push("/dashboard/hirer/job-creation")}>
            <Plus className="w-4 h-4 mr-2" />
            Create New Job
          </Button>
        </div>
        <JobManagement />
      </div>
    </DashboardLayout>
  )
}