import '../styles/globals.css'
import { ThemeProvider } from "@mui/material"
import { theme } from "../utils/theme"
import createEmotionCache from "../utils/createEmotionCache"
import { CacheProvider } from "@emotion/react"
import CookieConsent from "../components/CookieConsent/CookieConsent"
import { appWithTranslation } from 'next-i18next'
import Script from 'next/script'

const clientSideEmotionCache = createEmotionCache()

function MyApp({
                   Component,
                   emotionCache = clientSideEmotionCache,
                   pageProps }) {
  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-C7YNG3T7HH" />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-C7YNG3T7HH');
            `}
          </Script>
          <Component {...pageProps} />
          <CookieConsent/>
        </ThemeProvider>
      </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
