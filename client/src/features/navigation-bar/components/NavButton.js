import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Menu, MenuItem, Link } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useState } from "react";
// dark theme template
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#2196f3",
        },
    },
});
const NavButton = () => {
    // state to check if user is logged in (obtain user data from Redux)
    const [loggedIn, setLoggedIn] = useState(false);
    // button label turnary to evaluate if the label should be login or logout based on Redux user data
    const login = loggedIn ? "Logout" : "Login";
    // create a piece of state to grab user selection from menu
    const [anchorEl, setAnchorEl] = useState(null);
    // basic function to handle opening the menu upon clicking menu icon
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    // basic function to handle closing the menu on selection
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (_jsx(Box, { sx: { flexGrow: 1 }, children: _jsx(ThemeProvider, { theme: theme, children: _jsx(AppBar, { position: "static", enableColorOnDark: true, children: _jsxs(Toolbar, { children: [_jsx(IconButton, { size: "large", edge: "start", color: "inherit", "aria-label": "menu", sx: { mr: 2 }, onClick: handleMenu, children: _jsx(MenuIcon, {}) }), _jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1 }, children: "K8State" }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleClose, children: [_jsx(Link, { href: "/overview", style: { color: "white", textDecoration: "none" }, children: _jsx(MenuItem, { onClick: handleClose, children: "Overview" }) }), _jsx(Link, { href: "/logs", style: { color: "white", textDecoration: "none" }, children: _jsx(MenuItem, { onClick: handleClose, children: "Logs/Alerts" }) }), _jsx(Link, { href: "/settings", style: { color: "white", textDecoration: "none" }, children: _jsx(MenuItem, { onClick: handleClose, children: "Settings" }) }), _jsx(Link, { href: "/support", style: { color: "white", textDecoration: "none" }, children: _jsx(MenuItem, { onClick: handleClose, children: "Support" }) })] }), _jsx(Button, { color: "inherit", children: login })] }) }) }) }));
};
export default NavButton;
