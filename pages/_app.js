import 'tailwindcss/tailwind.css'
import '../styles/index.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga4'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_TRACKING_ID) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_TRACKING_ID)
      ReactGA.send('pageview')
      
      const handleRouteChange = (url) => {
        ReactGA.send({ hitType: 'pageview', page: url })
      }
      
      router.events.on('routeChangeComplete', handleRouteChange)
      return () => {
        router.events.off('routeChangeComplete', handleRouteChange)
      }
    }
  }, [])

  return <Component {...pageProps} />
}