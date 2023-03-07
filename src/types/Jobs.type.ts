import { CandidateType } from './Candidate.type'

export interface JobType {
  id: number
  title: string
  description: string
  salary_min: string
  salary_max: string
  requirements: string
  applicants: CandidateType[]
  status: string
  type: string
  level: string
}
