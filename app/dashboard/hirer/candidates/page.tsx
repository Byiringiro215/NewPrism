"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/dashboard-layout";
import CandidateScreening from "@/components/dashboard/hirer/CandidateScreening";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function CandidatesPage() {
  const router = useRouter();

  return (
    <DashboardLayout userType="hirer">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Candidates</h1>
            <p className="text-white/70">
              Review and manage job applications
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => router.push("/dashboard/hirer/jobs/create")}>
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>

        <CandidateScreening />
      </div>
    </DashboardLayout>
  );
}