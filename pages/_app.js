import '../styles/globals.css'
import { ThemeProvider } from "@mui/material"
import { theme } from "../utils/theme"
import createEmotionCache from "../utils/createEmotionCache"
import { CacheProvider } from "@emotion/react"
import CookieConsent from "../components/CookieConsent/CookieConsent"


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
//theme_funky

export default MyApp
