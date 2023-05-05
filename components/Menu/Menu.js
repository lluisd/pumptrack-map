import Box from '@mui/material/Box'
import {Divider, Drawer, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './Menu.module.css'
import { useState } from 'react'
import CookieIcon from '@mui/icons-material/Cookie';
import { useTranslation } from 'next-i18next'
import Contact from '../Contact/Contact'

const Menu = () => {
  const { t } = useTranslation('common')
  const [openContactModal, setOpenContactModal] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setOpenMenu(open)
  }

  const menu = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Divider />
      <List>
        <ListItem key="cookies-policy" disablePadding>
          <ListItemButton>
            <ListItemText primary={t('cookies-policy')} onClick={() => {
              window.CookieConsentApi.showSettings(0);
            }} />
          </ListItemButton>
        </ListItem>
        <ListItem key="contact" disablePadding>
          <ListItemButton>
            <ListItemText primary={t('contact')} onClick={() => setOpenContactModal(true)} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <Fab aria-label="menu" color="primary"  onClick={toggleDrawer(true)}>
        <MenuIcon />
      </Fab>
      <Drawer
        className={styles.drawer}
        anchor='left'
        open={openMenu}
        onClose={toggleDrawer(false)}
      >
        {menu()}
      </Drawer>
      <Contact open={openContactModal} onClose={() => setOpenContactModal(false)}></Contact>
    </>
  )
}

export default Menu
