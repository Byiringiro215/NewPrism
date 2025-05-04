'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Mock data for the dashboard
const mockRecommendedJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    matchPercentage: 92,
    salary: '$120,000 - $150,000',
    postedDate: '2 days ago'
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Remote',
    matchPercentage: 87,
    salary: '$90,000 - $110,000',
    postedDate: '1 week ago'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    location: 'New York, NY',
    matchPercentage: 85,
    salary: '$110,000 - $140,000',
    postedDate: '3 days ago'
  }
];

export default function ApplicantDashboard() {
  const [userName, setUserName] = useState('');
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: '1',
      company: 'TechCorp',
      position: 'Senior Frontend Developer',
      date: '2023-06-15T14:00:00',
      status: 'scheduled'
    }
  ]);

  useEffect(() => {
    const name = localStorage.getItem('userName') || '';
    setUserName(name);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your job search today.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">Profile Completion</h2>
          <div className="mt-4">
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
                    In Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-indigo-600">
                    {profileCompletion}%
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
                <div style={{ width: `${profileCompletion}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500"></div>
              </div>
            </div>
            <Link href="/dashboard/applicant/profile" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              Complete your profile →
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">Applications</h2>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-3xl font-bold text-gray-800">5</div>
            <div className="text-sm text-gray-500">
              <div>3 Under Review</div>
              <div>2 Viewed</div>
            </div>
          </div>
          <Link href="/dashboard/applicant/applications" className="mt-4 block text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            View all applications →
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">Upcoming Interviews</h2>
          {upcomingInterviews.length > 0 ? (
            <div className="mt-4">
              {upcomingInterviews.map(interview => (
                <div key={interview.id} className="mb-3">
                  <div className="font-medium">{interview.company}</div>
                  <div className="text-sm text-gray-500">{interview.position}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(interview.date).toLocaleString()}
                  </div>
                </div>
              ))}
              <Link href="/dashboard/applicant/interviews" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                Prepare for interview →
              </Link>
            </div>
          ) : (
            <div className="mt-4 text-sm text-gray-500">No upcoming interviews</div>
          )}
        </div>
      </div>

      {/* Job recommendations */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recommended Jobs</h2>
          <Link href="/dashboard/applicant/jobs" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          {mockRecommendedJobs.map(job => (
            <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{job.title}</h3>
                  <div className="text-sm text-gray-500">{job.company} • {job.location}</div>
                  <div className="text-sm text-gray-500 mt-1">{job.salary}</div>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {job.matchPercentage}% Match
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{job.postedDate}</div>
                </div>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <Link 
                  href={`/dashboard/applicant/jobs/${job.id}`}
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Coach section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 shadow rounded-lg p-6 text-white">
        <div className="flex items-start">
          <div className="flex-1">
            <h2 className="text-xl font-bold">AI Interview Coach</h2>
            <p className="mt-2">Practice your interview skills with our AI coach. Get real-time feedback and improve your chances of landing your dream job.</p>
            <button className="mt-4 bg-white text-indigo-600 px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors">
              Start Practice Session
            </button>
          </div>
          <div className="hidden md:block">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}