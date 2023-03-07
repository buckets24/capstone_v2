import { JobType } from 'types/Jobs.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type UserStoreType = {
  job: JobType | null
  setJob: (job: JobType | null) => void
  jobs: JobType[] | null
  setJobs: (job: JobType[] | null) => void
}

const useJobsStore = create<UserStoreType>()(
  devtools(
    (set) => ({
      job: null,
      setJob: (job: JobType | null) => set({ job }),
      jobs: null,
      setJobs: (jobs: JobType[] | null) => set({ jobs })
    }),
    {
      name: 'jobs-storage'
    }
  )
)

export { useJobsStore }
