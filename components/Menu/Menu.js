import Box from '@mui/material/Box'
import { Divider, Drawer, Fab, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './Menu.module.css'
import { useState } from 'react'

const Menu = () => {
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
        {['About'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <Fab  aria-label="menu"  onClick={toggleDrawer(true)}>
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
    </>
  )
}

export default Menu
