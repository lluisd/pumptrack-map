import Head from 'next/head'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';
import styles from './layout.module.css'
import LeftMenu from '../LeftMenu/LeftMenu'

const drawerWidth = 240

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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


export default function Layout({ children, home }) {
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
