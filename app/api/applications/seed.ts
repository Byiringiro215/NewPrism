import { createClient } from '@supabase/supabase-js'
import { applications } from './seed-data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function seedApplications() {
  try {
    // Create a test applicant user
    const { data: userData, error: userError } = await supabase.auth.signUp({
      email: 'test.applicant@example.com',
      password: 'testpassword123',
      options: {
        data: {
          full_name: 'Test Applicant',
          role: 'applicant'
        }
      }
    })

    if (userError) throw userError

    // Create applicant profile
    const { data: applicantData, error: applicantError } = await supabase
      .from('applicants')
      .upsert([{
        user_id: userData.user?.id,
        full_name: 'Test Applicant',
        email: 'test.applicant@example.com',
        location: 'San Francisco, CA',
        skills: ['JavaScript', 'React', 'TypeScript', 'Node.js'],
        experience_level: 'Senior',
        resume_url: null
      }])
      .select()
      .single()

    if (applicantError) throw applicantError

    // Get random jobs to apply to
    const { data: jobsData, error: jobsError } = await supabase
      .from('jobs')
      .select('id')
      .limit(applications.length)

    if (jobsError) throw jobsError

    // Insert applications
    for (let i = 0; i < applications.length; i++) {
      const application = applications[i]
      const job = jobsData[i]

      if (!job) continue

      const { error: applicationError } = await supabase
        .from('applications')
        .upsert([{
          ...application,
          job_id: job.id,
          applicant_id: applicantData.id
        }])

      if (applicationError) throw applicationError
    }

    console.log('Successfully seeded applications data')
  } catch (error) {
    console.error('Error seeding applications:', error)
    throw error
  }
}