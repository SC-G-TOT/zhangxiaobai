import Account from '@/components/Account'
import Auth from '@/components/Auth'
import { getSupabase } from '@/network/supabase'
import { Session } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

export default function HomeScreen() {
	const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
	const supabase = getSupabase()

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    </View>
  )
}

