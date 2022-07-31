import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});


export default function Layout({ children }) {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AppBar  style={{ background: '#D32A23', color: 'black'}}
          position="fixed">
          <Toolbar>
            <Typography variant="h6" noWrap component="div" style={{color: 'white'}}>
              Pumptracks map
            </Typography>
          </Toolbar>
        </AppBar>
        <div>
          {children}
        </div>
      </ThemeProvider>
    </div>
  )
}
