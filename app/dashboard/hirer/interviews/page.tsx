"use client";

import DashboardLayout from "@/components/dashboard-layout";
import InterviewScheduler from "@/components/dashboard/hirer/InterviewScheduler";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function InterviewsPage() {
  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Interviews</h1>
          <p className="text-white/70">
            Schedule and manage candidate interviews
          </p>
        </div>

        <InterviewScheduler />
      </div>
    </DashboardLayout>
  );
}