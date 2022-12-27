import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { purple, yellow, grey } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: yellow[500]
    },
    secondary: {
      main: '#000',
    },
  }
})



export default function Layout({ children }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <div>
          {children}
        </div>
      </ThemeProvider>
    </div>
  )
}
