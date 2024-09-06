import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { styled, useTheme, Box, Toolbar, List, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import logoSVG from "../../public/logo.svg";
import HubIcon from "@mui/icons-material/Hub";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SettingsIcon from "@mui/icons-material/Settings";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";
import ClusterViewContainer from "../cluster-view/containers/ClusterViewContainer";
import LogPage from "../log-page/LogPage";
import Settings from "../settings/settings";
import LandingPage from "../landing-page/LandingPage";
// ****************************
// **   Material UI Styling   **
// ****************************
const drawerWidth = 240;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});
const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});
const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== "open",
})(({ theme, open }) => ({
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
}));
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
}));
// *************************
// **   Component Render  **
// *************************
export default function MiniDrawer() {
    const theme = useTheme();
    // ** create state
    const [open, setOpen] = React.useState(false);
    const [selectedPage, setSelectedPage] = useState("ClusterUI");
    const handleMenuSelect = (page) => {
        setSelectedPage(page);
        setOpen(false);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (_jsxs(Box, { sx: { display: "flex" }, children: [_jsx(CssBaseline, {}, void 0), _jsx(AppBar, { position: "fixed", open: open, color: "transparent", sx: {
                    background: "white",
                }, children: _jsxs(Toolbar, { children: [_jsx(IconButton, { color: "inherit", "aria-label": "open drawer", onClick: handleDrawerOpen, edge: "start", sx: {
                                marginRight: 5,
                                ...(open && { display: "none" }),
                            }, children: _jsx(MenuIcon, {}, void 0) }, void 0), _jsxs(Typography, { variant: "h6", noWrap: true, component: "div", children: ["K", _jsx("span", { style: { color: "#ad97d0" }, children: "8" }, void 0), "STATE \u2014 Cluster View"] }, void 0), _jsx("img", { src: logoSVG, alt: "App logo", style: { width: "50px", marginLeft: "auto", marginRight: "15px" } }, void 0)] }, void 0) }, void 0), _jsxs(Drawer, { variant: "permanent", open: open, children: [_jsx(DrawerHeader, { children: _jsx(IconButton, { onClick: handleDrawerClose, children: theme.direction === "rtl" ? (_jsx(ChevronRightIcon, {}, void 0)) : (_jsx(ChevronLeftIcon, {}, void 0)) }, void 0) }, void 0), _jsx(Divider, {}, void 0), _jsx(List, { children: ["ClusterUI", "Logs"].map((text, index) => (_jsx(ListItem, { onClick: () => handleMenuSelect(text), disablePadding: true, sx: { display: "block" }, style: { color: "black", textDecoration: "none" }, children: _jsxs(ListItemButton, { sx: {
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }, children: [_jsx(ListItemIcon, { sx: {
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }, children: index % 2 === 0 ? _jsx(HubIcon, {}, void 0) : _jsx(ReceiptLongIcon, {}, void 0) }, void 0), _jsx(ListItemText, { primary: text, sx: { opacity: open ? 1 : 0 } }, void 0)] }, void 0) }, text))) }, void 0), _jsx(Divider, {}, void 0), _jsx(List, { children: ["Settings", "Github"].map((text, index) => (_jsx(ListItem, { onClick: () => handleMenuSelect(text), disablePadding: true, sx: { display: "block" }, style: { color: "black", textDecoration: "none" }, children: _jsxs(ListItemButton, { sx: {
                                    minHeight: 48,
                                    justifyContent: open ? "initial" : "center",
                                    px: 2.5,
                                }, children: [_jsx(ListItemIcon, { sx: {
                                            minWidth: 0,
                                            mr: open ? 3 : "auto",
                                            justifyContent: "center",
                                        }, children: index % 2 === 0 ? _jsx(SettingsIcon, {}, void 0) : _jsx(GitHubIcon, {}, void 0) }, void 0), _jsx(ListItemText, { primary: text, sx: { opacity: open ? 1 : 0 } }, void 0)] }, void 0) }, text))) }, void 0)] }, void 0), _jsxs(Drawer, { variant: "persistent", anchor: "right", open: open, children: [_jsx(DrawerHeader, { children: _jsx(IconButton, { onClick: handleDrawerClose, children: theme.direction === "rtl" ? (_jsx(ChevronRightIcon, {}, void 0)) : (_jsx(ChevronLeftIcon, {}, void 0)) }, void 0) }, void 0), _jsx(Typography, { children: "Testing" }, void 0)] }, void 0), _jsxs("main", { children: [selectedPage === "ClusterUI" && _jsx(ClusterViewContainer, {}, void 0), selectedPage === "Logs" && _jsx(LogPage, {}, void 0), selectedPage === "Settings" && _jsx(Settings, {}, void 0), selectedPage === "Github" && _jsx(LandingPage, {}, void 0)] }, void 0)] }, void 0));
}
