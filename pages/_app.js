import '../styles/globals.css'
import { ThemeProvider } from "@mui/material"
import { theme } from "../utils/theme"
import createEmotionCache from "../utils/createEmotionCache"
import { CacheProvider } from "@emotion/react"
import CookieConsent from "../components/CookieConsent/CookieConsent"
import { appWithTranslation } from 'next-i18next'

const clientSideEmotionCache = createEmotionCache()

function MyApp({
                   Component,
                   emotionCache = clientSideEmotionCache,
                   pageProps }) {
  return (
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
          <CookieConsent/>
        </ThemeProvider>
      </CacheProvider>
  )
}

export default appWithTranslation(MyApp)
