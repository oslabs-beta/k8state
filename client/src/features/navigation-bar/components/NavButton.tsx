/* import React, { useState } from "react"

export default function NavButton() {
  // state to check if user is logged in (obtain user data from Redux)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)
  // button label turnary to evaluate if the label should be login or logout based on Redux user data
  const login: string = loggedIn ? "Logout" : "Login"

  return (
    <div
      id="navbutton"
      className="nav"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div id="page-links" className="nav">
        <a href="/clusterview">Cluster View</a>
        <a href="/logs">Logs and Alerts</a>
        <a href="/nodes">Nodes</a>
      </div>
      <div id="nav-menu" className="nav">
        <button type="button">Support</button>
        <button type="button">Settings</button>
        <button type="button">{login}</button>
      </div>
    </div>
  )
}
*/

import type * as React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { Menu, MenuItem, Link } from "@mui/material"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { useState } from "react"

// interface for theme
interface Theme {
  palette: {
    mode: string
    primary: {
      main: string
    }
  }
}

// dark theme template
const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2196f3",
    },
  },
})

const NavButton: React.FC = () => {
  // state to check if user is logged in (obtain user data from Redux)
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  // button label turnary to evaluate if the label should be login or logout based on Redux user data
  const login: string = loggedIn ? "Logout" : "Login"

  // create a piece of state to grab user selection from menu
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  // basic function to handle opening the menu upon clicking menu icon
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  // basic function to handle closing the menu on selection
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={theme}>
        <AppBar position="static" enableColorOnDark>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              K8State
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                href="/overview"
                style={{ color: "white", textDecoration: "none" }}
              >
                <MenuItem onClick={handleClose}>Overview</MenuItem>
              </Link>
              <Link
                href="/logs"
                style={{ color: "white", textDecoration: "none" }}
              >
                <MenuItem onClick={handleClose}>Logs/Alerts</MenuItem>
              </Link>
              <Link
                href="/settings"
                style={{ color: "white", textDecoration: "none" }}
              >
                <MenuItem onClick={handleClose}>Settings</MenuItem>
              </Link>
              <Link
                href="/support"
                style={{ color: "white", textDecoration: "none" }}
              >
                <MenuItem onClick={handleClose}>Support</MenuItem>
              </Link>
            </Menu>
            <Button color="inherit">{login}</Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  )
}

export default NavButton
