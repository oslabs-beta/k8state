import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Box, } from "@mui/material";
import logoSVG from "../../public/logo.svg";
import logoPNG from "../../public/logo.png";
import "./landingpage.css";
import MeetTheTeam from "./components/MeetTheTeam";
import ReadMe from "./components/ReadMe";
export default function LandingPage() {
    return (_jsxs(Box, { sx: { minWidth: "750px" }, children: [_jsx(AppBar, { position: "sticky", sx: {
                    background: "linear-gradient(to bottom, white 70%, rgba(255, 255, 255, 0))",
                    transition: "background-color 0.5s ease",
                }, color: "transparent", elevation: 0, style: { width: "100vw" }, children: _jsxs(Toolbar, { sx: { justifyContent: "space-between" }, children: [_jsx("img", { src: logoSVG, alt: "App logo", style: { width: "50px", marginRight: "15px" } }), _jsx(Typography, { variant: "h6", component: "div", sx: { flexGrow: 1 }, children: "K8STATE" }), _jsx(Button, { color: "inherit", onClick: () => document
                                .getElementById("team-section")
                                ?.scrollIntoView({ behavior: "smooth" }), children: "Meet The Team" }), _jsx(Button, { color: "inherit", onClick: () => document
                                .getElementById("readme-section")
                                ?.scrollIntoView({ behavior: "smooth" }), children: "Setting Up" })] }) }), _jsx(Container, { className: "landingpage", maxWidth: "lg", sx: { pt: 6 }, children: _jsxs(Grid, { container: true, spacing: 4, alignItems: "center", justifyContent: "center", direction: "column", textAlign: "center", children: [_jsx(Grid, { item: true, xs: 12, children: _jsx("img", { className: "logo-main App-logo-float", src: logoPNG, alt: "App logo", style: {
                                    width: "100%",
                                    maxWidth: "300px",
                                    marginBottom: "20px",
                                    paddingTop: "15vh",
                                } }) }), _jsxs(Grid, { item: true, xs: 12, children: [_jsxs(Typography, { variant: "h1", component: "h1", gutterBottom: true, children: ["K", _jsx("span", { style: { color: "#ad97d0" }, children: "8" }), "STATE"] }), _jsx(Typography, { variant: "h4", component: "p", gutterBottom: true, children: "Revolutionize Kubernetes Management" }), _jsx(Typography, { variant: "subtitle1", component: "p", gutterBottom: true, children: "Experience cluster visualization that moves as fast as you do." }), _jsx(Button, { "aria-label": "Get Started", variant: "contained", color: "primary", size: "large", sx: { marginRight: "10px" }, href: "clusterui", children: "Get Started" }), _jsx(Button, { "aria-label": "Visit GitHub", variant: "outlined", color: "primary", size: "large", href: "https://github.com/oslabs-beta/k8state", children: "Visit GitHub" })] })] }) }), _jsx("section", { id: "readme-section", children: _jsx(ReadMe, {}) }), _jsx("section", { id: "team-section", children: _jsx(MeetTheTeam, {}) }), _jsx("footer", { className: "footer", children: _jsxs(Container, { maxWidth: "lg", children: [_jsx(Typography, { variant: "body2", color: "#ad97d0", align: "center", children: "Developed For Engineers by Engineers" }), _jsx(Typography, { variant: "body2", color: "textSecondary", align: "center", children: "Released under the MIT License." }), _jsx(Typography, { variant: "body2", color: "textSecondary", align: "center", children: "Copyright \u00A9 2024 K8STATE Contributors" })] }) })] }));
}
