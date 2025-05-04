interface ApplicationSeed {
  job_id: string
  status: 'pending' | 'in_review' | 'interview_scheduled' | 'accepted' | 'rejected'
  created_at: string
  ai_score: number
  cover_letter: string
}

export const applications: ApplicationSeed[] = [
  {
    job_id: '', // Will be populated dynamically
    status: 'pending',
    created_at: '2025-05-02T09:30:00Z',
    ai_score: 89,
    cover_letter: 'Dear Hiring Manager,\n\nI am excited to apply for this position. With over 5 years of experience in full-stack development and a strong background in React and Node.js, I believe I would be an excellent addition to your team. My recent projects have focused on building scalable web applications using modern technologies that align perfectly with your stack.'
  },
  {
    job_id: '',
    status: 'in_review',
    created_at: '2025-04-28T14:30:00Z',
    ai_score: 95,
    cover_letter: 'Dear Hiring Team,\n\nI was thrilled to see the Senior Frontend Developer position at your company. Having led the development of several successful web applications and mentored junior developers, I am confident in my ability to contribute to your projects. My expertise in TypeScript, React, and state management solutions would allow me to hit the ground running.'
  },
  {
    job_id: '',
    status: 'interview_scheduled',
    created_at: '2025-04-25T11:15:00Z',
    ai_score: 92,
    cover_letter: 'Hello,\n\nI am writing to express my strong interest in the Full Stack Developer role. My background in both frontend and backend development, combined with my recent experience in cloud technologies, makes me an ideal candidate. I have successfully delivered multiple projects using similar technology stacks and would love to bring this experience to your team.'
  },
  {
    job_id: '',
    status: 'accepted',
    created_at: '2025-04-15T10:00:00Z',
    ai_score: 97,
    cover_letter: 'Dear Recruitment Team,\n\nI am writing to apply for the Senior Software Engineer position. With my track record of leading successful projects and implementing robust architectures, I believe I would be a valuable asset to your engineering team. My experience with your tech stack and commitment to quality code makes me confident in my ability to contribute from day one.'
  },
  {
    job_id: '',
    status: 'rejected',
    created_at: '2025-04-10T16:45:00Z',
    ai_score: 78,
    cover_letter: 'Hi,\n\nI am interested in the Backend Developer position at your company. While I am relatively new to the field, I have been working on several personal projects using Node.js and Express. I am a quick learner and passionate about writing clean, efficient code.'
  },
  {
    job_id: '',
    status: 'pending',
    created_at: '2025-05-01T15:20:00Z',
    ai_score: 88,
    cover_letter: 'Dear Hiring Manager,\n\nI am writing to apply for the DevOps Engineer position. With extensive experience in CI/CD, container orchestration, and cloud infrastructure, I would bring valuable expertise to your team. I have implemented and maintained robust deployment pipelines and monitoring systems in my current role.'
  },
  {
    job_id: '',
    status: 'in_review',
    created_at: '2025-04-29T13:45:00Z',
    ai_score: 91,
    cover_letter: 'Hello,\n\nI am excited about the opportunity to apply for the UI/UX Developer position. My strong foundation in user-centered design principles combined with technical expertise in modern frontend frameworks makes me an ideal candidate. I have consistently delivered intuitive and accessible user interfaces in my previous roles.'
  }
]