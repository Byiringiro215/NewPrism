import { createClient } from '@supabase/supabase-js'
import { companies, jobs } from './seed-data'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function seedJobs() {
  try {
    // Insert companies first
    for (const company of companies) {
      const { data, error } = await supabase
        .from('companies')
        .upsert([company], { onConflict: 'name' })
        .select()

      if (error) throw error
    }

    // Get all companies to map their IDs
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('id, name')

    if (companyError) throw companyError

    const companyMap = new Map(companyData.map(c => [c.name, c.id]))

    // Create a test hirer for each company
    for (const company of companies) {
      const companyId = companyMap.get(company.name)
      if (!companyId) continue

      // Create a user for the hirer
      const { data: userData, error: userError } = await supabase.auth.signUp({
        email: `hirer_${company.name.toLowerCase().replace(/\\s+/g, '_')}@example.com`,
        password: 'Test123!',
      })

      if (userError) throw userError

      if (userData.user) {
        // Create hirer profile
        const { error: hirerError } = await supabase
          .from('hirers')
          .upsert([{
            user_id: userData.user.id,
            company_id: companyId,
            position: 'HR Manager',
            department: 'Human Resources'
          }])

        if (hirerError) throw hirerError
      }
    }

    // Get all hirers to map their IDs
    const { data: hirerData, error: hirerError } = await supabase
      .from('hirers')
      .select('id, company_id')

    if (hirerError) throw hirerError

    const hirerMap = new Map(hirerData.map(h => [h.company_id, h.id]))

    // Insert jobs
    for (const job of jobs) {
      const companyId = companyMap.get(job.company_name)
      if (!companyId) continue

      const hirerId = hirerMap.get(companyId)
      if (!hirerId) continue

      const { error: jobError } = await supabase
        .from('jobs')
        .upsert([{
          ...job,
          company_id: companyId,
          hirer_id: hirerId,
          status: 'published'
        }])

      if (jobError) throw jobError
    }

    console.log('Successfully seeded jobs data')
  } catch (error) {
    console.error('Error seeding jobs:', error)
  }
}