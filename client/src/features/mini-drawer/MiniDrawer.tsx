import * as React from "react"
import {
  styled,
  useTheme,
  Box,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import type { Theme, CSSObject } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import MuiAppBar from "@mui/material/AppBar"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import logoSVG from "../../public/logo.svg"
import HubIcon from "@mui/icons-material/Hub"
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong"
import AnalyticsIcon from "@mui/icons-material/Analytics"
import SettingsIcon from "@mui/icons-material/Settings"
import GitHubIcon from "@mui/icons-material/GitHub"
import { useState } from "react"
import ClusterViewContainer from "../cluster-view/containers/ClusterViewContainer"
import ClusterLogContainer from "../cluster-log/containers/ClusterLogContainer"
import Settings from "../settings/settings"
import GrafanaViewContainer from "../grafana-dashboard/GrafanaViewContainer"
import { alpha } from "@mui/material/styles"

// ****************************
// **   Create Interface's   **
// ****************************

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

// *****************************
// **   Material UI Styling   **
// *****************************

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

// *************************
// **   Component Render  **
// *************************

export default function MiniDrawer() {
  const theme = useTheme()

  // ** create state **
  const [open, setOpen] = React.useState(false)

  const [selectedPage, setSelectedPage] = useState<string | null>("ClusterUI")

  const handleMenuSelect = (page: string) => {
    if (page === "Github") {
      window.open("https://github.com/oslabs-beta/k8state", "_blank")
      return
    }

    setSelectedPage(page)
    setOpen(false)
  }

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const violetBase = "#7F00FF"
  const violetMain = alpha(violetBase, 0.3)

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        color={"transparent"}
        sx={{
          background: "white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            K<span style={{ color: "#ad97d0" }}>8</span>STATE — {selectedPage}
          </Typography>
          <a
            href="/"
            style={{
              width: "50px",
              marginLeft: "auto",
              marginRight: "15px",
            }}
          >
            <img src={logoSVG} alt="App logo" />
          </a>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <h3 style={{ position: "absolute", left: "60px" }}>Navigation</h3>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["ClusterUI", "Logs", "Grafana Dashboard"].map((text, index) => (
            <ListItem
              onClick={() => handleMenuSelect(text)}
              key={text}
              disablePadding
              sx={{ display: "block" }}
              style={{
                color: "black",
                textDecoration: "none",
                backgroundColor: selectedPage === text ? violetMain : "white",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index === 0 ? (
                    <HubIcon />
                  ) : index === 2 ? (
                    <AnalyticsIcon />
                  ) : (
                    <ReceiptLongIcon />
                  )}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["Settings", "Github"].map((text, index) => (
            <ListItem
              onClick={() => handleMenuSelect(text)}
              key={text}
              disablePadding
              sx={{ display: "block" }}
              style={{
                color: "black",
                textDecoration: "none",
                backgroundColor: selectedPage === text ? violetMain : "white",
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <SettingsIcon /> : <GitHubIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* DRAWER 2 */}

      <Drawer variant="persistent" anchor="right" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Typography>Testing</Typography>
      </Drawer>
      <main>
        {selectedPage === "ClusterUI" && <ClusterViewContainer />}
        {selectedPage === "Logs" && <ClusterLogContainer />}
        {selectedPage === "Grafana Dashboard" && <GrafanaViewContainer />}
        {selectedPage === "Settings" && <Settings />}
        {selectedPage === "Github"}
      </main>
    </Box>
  )
}
