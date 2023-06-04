export interface CandidateType {
  id: number
  userId: string
  created_at: Date
  name: string
  first_name: string
  last_name: string
  birthday: string
  github_link: string | null
  linkedin_link: string | null
  facebook_link: string | null
  twitter_link: string | null
  avatar: string | null
  location: string
  mobile: string
  email: string
  expected_salary: null
  actively_looking: boolean
  portfolio_link: null
  cv_link: null
  targetStartDate: Date
  skills: string[]
  working_experience: {
    company: string
    position: string
    startDate: string
    endDate: string
    isPresent: boolean
    skills: string[]
    description: string
  }[]
  about: string
  school_info: {
    school: string
    course: string
    startDate: string
    endDate: string
    description: string
    awards: string[]
  }[]
  questions: {
    question: string
    answer: string | number | boolean
  }[]
  job_title: string
  role: string
}
