import { SupabaseClient } from '@supabase/auth-helpers-react'
import { FormikValues } from 'formik'
import { CandidateType } from 'types/Candidate.type'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type UserStoreType = {
  submitting: boolean
  setSubmitting: (submitting: boolean) => void
  candidate: CandidateType | null
  setCandidate: (candidate: CandidateType) => void
  updateCandidate: (supabase: SupabaseClient, candidate: CandidateType) => void
}

const useUserStore = create<UserStoreType>()(
  devtools(
    persist(
      (set, get) => ({
        submitting: false,
        candidate: null,
        setCandidate: (candidate: CandidateType) => set({ candidate }),
        setSubmitting: (submitting: boolean) => set({ submitting }),
        // createCandidate: async (supabase: SupabaseClient, params: FormikValues) => {
        //   const currentCandidate = get().candidate
        //   console.log(get()?.candidate?.email, 'get()?.candidate?.email')
        //   console.log(currentCandidate?.email)
        //   await supabase
        //     .from('developers')
        //     .update([
        //       {
        //         ...currentCandidate,
        //         ...params
        //       }
        //     ])
        //     .eq('email', get()?.candidate?.email)
        //     .then(({ data }) => {
        //       console.log(data)
        //       return set({ candidate: data?.[0] })
        //     })
        // },
        updateCandidate: async (
          supabase: SupabaseClient,
          params: FormikValues
        ) => {
          const currentCandidate = get().candidate
          const currentEmail = currentCandidate?.email

          get()?.setSubmitting(true)

          await supabase
            .from('developers')
            .update([
              {
                ...currentCandidate,
                ...params
              }
            ])
            .eq('email', currentEmail)
            .select()
            .then(({ data }) => {
              if (data) {
                set({ candidate: data?.[0] as unknown as CandidateType })
              }

              get()?.setSubmitting(false)
            })
        }
      }),
      {
        name: 'user-storage'
      }
    )
  )
)

export { useUserStore }
