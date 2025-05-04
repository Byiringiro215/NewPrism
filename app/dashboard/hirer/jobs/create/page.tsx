"use client"

import DashboardLayout from "@/components/dashboard-layout"
import JobCreationForm from "@/components/dashboard/hirer/JobCreationForm"

export default function CreateJobPage() {
  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Create New Job</h1>
          <p className="text-white/70">Post a new job opening for your company</p>
        </div>
        
        <JobCreationForm />
      </div>
    </DashboardLayout>
  )
}