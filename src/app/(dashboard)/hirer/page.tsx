'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

// Mock data for the dashboard
const mockRecentApplications = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Senior Frontend Developer',
    matchPercentage: 92,
    appliedDate: '2 days ago',
    status: 'new'
  },
  {
    id: '2',
    name: 'Emily Johnson',
    position: 'UX/UI Designer',
    matchPercentage: 87,
    appliedDate: '1 day ago',
    status: 'new'
  },
  {
    id: '3',
    name: 'Michael Brown',
    position: 'Full Stack Developer',
    matchPercentage: 85,
    appliedDate: '3 days ago',
    status: 'reviewed'
  }
];

export default function HirerDashboard() {
  const [userName, setUserName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [activeJobs, setActiveJobs] = useState(3);
  const [totalApplications, setTotalApplications] = useState(24);
  const [scheduledInterviews, setScheduledInterviews] = useState(2);

  useEffect(() => {
    const name = localStorage.getItem('userName') || '';
    const company = localStorage.getItem('companyName') || '';
    setUserName(name);
    setCompanyName(company);
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800">Welcome back, {userName.split(' ')[0]}!</h1>
        <p className="text-gray-600 mt-1">Here's what's happening with your recruitment at {companyName}.</p>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">Active Jobs</h2>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-3xl font-bold text-gray-800">{activeJobs}</div>
            <Link href="/dashboard/hirer/jobs" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              Manage Jobs →
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">Applications</h2>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-3xl font-bold text-gray-800">{totalApplications}</div>
            <Link href="/dashboard/hirer/candidates" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              View Candidates →
            </Link>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">Scheduled Interviews</h2>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-3xl font-bold text-gray-800">{scheduledInterviews}</div>
            <Link href="/dashboard/hirer/interviews" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
              Manage Interviews →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent applications */}
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recent Applications</h2>
          <Link href="/dashboard/hirer/candidates" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
            View all →
          </Link>
        </div>
        <div className="space-y-4">
          {mockRecentApplications.map(application => (
            <div key={application.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{application.name}</h3>
                  <div className="text-sm text-gray-500">{application.position}</div>
                  <div className="text-sm text-gray-500 mt-1">Applied {application.appliedDate}</div>
                </div>
                <div className="text-right">
                  <div className="inline-block bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {application.matchPercentage}% Match
                  </div>
                  <div className="mt-1">
                    {application.status === 'new' ? (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        New
                      </span>
                    ) : (
                      <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        Reviewed
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-3 flex justify-end space-x-2">
                <Link 
                  href={`/dashboard/hirer/candidates/${application.id}`}
                  className="text-sm text-indigo-600 hover:text-indigo-500 font-medium"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">Post a New Job</h2>
          <p className="text-gray-600 mt-2">Create a new job posting and let our AI help you find the perfect candidates.</p>
          <Link 
            href="/dashboard/hirer/jobs/create"
            className="mt-4 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors"
          >
            Create Job Posting
          </Link>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-800">AI Candidate Matching</h2>
          <p className="text-gray-600 mt-2">Let our AI find the best candidates for your open positions based on skills and experience.</p>
          <button className="mt-4 inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-md font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors">
            Find Candidates
          </button>
        </div>
      </div>
    </div>
  );
}