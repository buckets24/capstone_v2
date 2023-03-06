import { SupabaseClient } from '@supabase/auth-helpers-react'
import Router from 'next/router'

const useGetUser = async (
  supabaseClient: SupabaseClient<any, 'public', any>,
  userId: string
) => {
  if (!supabaseClient) {
    return
  }

  const { data } = await supabaseClient
    .from('users')
    .select('*')
    .eq('userId', userId)

  if (!data) {
    Router.push('/')
    return
  }

  return data
}

export { useGetUser }
