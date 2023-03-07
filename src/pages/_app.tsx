import '@fontsource/plus-jakarta-sans'
import 'lib/theme/global.css'
import '../index.css'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react'

import theme from 'lib/theme'
import 'react-toastify/dist/ReactToastify.css'

/**
 * Providers
 */
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import createEmotionCache from 'lib/emotion/createEmotionCache'
import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'

type AppLayoutProps = AppProps & {
  pageProps: any
  emotionCache: EmotionCache
  initialSession: Session
}

const clientSideEmotionCache = createEmotionCache()

const OmhApp = (props: AppLayoutProps) => {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())

  const [mounted, setMounted] = useState(false)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false
      }
    }
  })

  useEffect(() => setMounted(true), [])

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Head>
            <meta charSet='UTF-8' />
            <meta
              name='viewport'
              content='width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1'
            />
          </Head>
          <CssBaseline />
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <div style={{ visibility: !mounted ? 'hidden' : 'visible' }}>
              <Component {...pageProps} />
              <ToastContainer />
            </div>
          </SessionContextProvider>
        </ThemeProvider>
      </CacheProvider>
      <ReactQueryDevtools position='bottom-right' initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default OmhApp
