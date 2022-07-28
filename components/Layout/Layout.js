import Head from 'next/head'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import styles from './layout.module.css'
import LeftMenu from '../LeftMenu/LeftMenu'

const drawerWidth = 240

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
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


const name = 'Your Name'
export const siteTitle = 'Next.js Sample Website'

export default function Layout({ children, home }) {
  return (
    <div>
      <AppBar  style={{ background: '#ffee02', color: 'black'}}
        position="fixed"
        //sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Pumptracks map
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        {children}
      </div>
    </div>
  )
}
