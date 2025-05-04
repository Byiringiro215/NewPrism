import DataTable from "@/components/dashboard/shared/DataTable";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

interface Interview {
  id: string;
  application_id: string;
  scheduled_time: string;
  status: string;
  application: {
    applicant: {
      id: string;
      user: {
        first_name: string;
        last_name: string;
        email: string;
      };
    };
    job: {
      title: string;
      company: {
        name: string;
      };
    };
  };
}

async function getInterviews() {
  const supabase = createRouteHandlerClient({ cookies });
  const { data: interviews, error } = await supabase
    .from("interviews")
    .select(`
      *,
      application:applications(
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
      )
    `);

  if (error) {
    console.error("Error fetching interviews:", error);
    return [];
  }

  return interviews;
}

export default async function InterviewsTable() {
  const interviews = await getInterviews();

  const columns = [
    {
      key: "candidate",
      header: "Candidate",
      accessorKey: "candidate",
      cell: ({ row }: { row: Interview }) => row.application.applicant.user.first_name + " " + row.application.applicant.user.last_name,
    },
    {
      key: "job",
      header: "Job",
      accessorKey: "job",
      cell: ({ row }: { row: Interview }) => row.application.job.title,
    },
    {
      key: "date",
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: { row: Interview }) => row.scheduled_time,
    },
    {
      key: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: Interview }) => row.status,
    },
  ];

  return <DataTable columns={columns} data={interviews} />;
}
