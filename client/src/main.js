import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import LandingPage from "./features/landing-page/LandingPage";
import { store } from "./app/store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import CaptivePortal from "./features/captive-portal/containers/CaptivePortal";
import LogPage from "./features/log-page/LogPage";
// import material UI fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import ProtectedRoute from "./features/captive-portal/ProtectedRoute";
import { createTheme, ThemeProvider, alpha, getContrastRatio, } from '@mui/material/styles';
const violetBase = '#7F00FF';
const violetMain = alpha(violetBase, 0.7);
const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
        h1: {
            fontFamily: '"Oswald", sans-serif',
            fontWeight: 900,
        },
    },
});
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(LandingPage, {}),
    },
    {
        path: "/clusterui",
        element: _jsx(ProtectedRoute, { element: _jsx(App, {}) }),
    },
    {
        path: "/portal",
        element: _jsx(CaptivePortal, {}),
    },
    // temp route to redesign Captive Portal
    // {
    //   path: "/portal",
    //   element: <SignInSide />,
    // },
    {
        path: "/logs",
        element: _jsx(LogPage, {}),
    },
]);
const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(_jsx(React.StrictMode, { children: _jsx(Provider, { store: store, children: _jsx(ThemeProvider, { theme: theme, children: _jsx(RouterProvider, { router: router }) }) }) }));
}
else {
    throw new Error("Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.");
}
