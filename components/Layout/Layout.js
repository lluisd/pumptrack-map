import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import { Menu } from '../Menu'

const theme = createTheme({
  palette: {
    primary: {
      main: red[500]
    },
    secondary: {
      main: blue[500]
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
