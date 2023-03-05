'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import supabase from 'src/lib/supabase-browser'
import { Session } from '@supabase/supabase-js'

interface AuthContextProps {
  initial: boolean
  session: Session
  user: any
  signOut: () => void
}

export const AuthContext = createContext<AuthContextProps | null>(null)

export const AuthProvider = (props: any) => {
  const [initial, setInitial] = useState(true)
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const router = useRouter()
  const { accessToken, ...rest } = props

  useEffect(() => {
    async function getActiveSession () {
      const {
        data: { session: activeSession }
      } = await supabase.auth.getSession()

      console.log(activeSession, 'activeSession')

      setSession(activeSession)
      setUser(activeSession?.user ?? null)
      setInitial(false)
    }
    getActiveSession()

    const {
      data: { subscription: authListener }
    } = supabase.auth.onAuthStateChange((event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh()
      }

      setSession(currentSession)
      setUser(currentSession?.user ?? null)
    })

    return () => {
      authListener?.unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
      signOut: () => supabase.auth.signOut()
    }
  }, [initial, session, user])

  return (
    <AuthContext.Provider
      value={value}
      {...rest}
    />
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
