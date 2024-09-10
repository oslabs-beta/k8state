import { jsx as _jsx } from "react/jsx-runtime";
import { screen, fireEvent } from "@testing-library/react";
// import ProtectedRoute from "../ProtectedRoute"
// import App from "../../../App"
import { renderWithProviders } from "../../../utils/test-utils";
// import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import CaptivePortal from "./CaptivePortal";
import { createTheme, ThemeProvider, alpha, getContrastRatio, } from "@mui/material/styles";
const violetBase = "#7F00FF";
const violetMain = alpha(violetBase, 0.7);
const theme = createTheme({
    palette: {
        violet: {
            main: violetMain,
            light: alpha(violetBase, 0.5),
            dark: alpha(violetBase, 0.9),
            contrastText: getContrastRatio(violetMain, "#fff") > 4.5 ? "#fff" : "#111",
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
test("Check if the input boxes and button exist", () => {
    renderWithProviders(_jsx(ThemeProvider, { theme: theme, children: _jsx(CaptivePortal, {}) }));
    //screen.debug()
    const address = screen.getByLabelText(/IP Address or URL/i);
    const token = screen.getByPlaceholderText(/Bearer Token/i);
    const button = screen.getByRole("button", { name: /View Cluster/i });
    expect(address).toBeInTheDocument();
    expect(token).toBeInTheDocument();
    expect(button).toBeInTheDocument();
});
test("Check if the address input accepts only urls", () => {
    renderWithProviders(_jsx(ThemeProvider, { theme: theme, children: _jsx(CaptivePortal, {}) }));
    //screen.debug()
    const address = screen.getByLabelText(/IP Address or URL/i);
    fireEvent.change(address, { target: { value: "jahgifjmzxiwek" } });
    expect(address.validity.typeMismatch).toBeTruthy();
    expect(address.validity.valid).toBeFalsy();
    fireEvent.change(address, { target: { value: "https://test.com" } });
    expect(address.validity.typeMismatch).toBeFalsy();
    expect(address.validity.valid).toBeTruthy();
    // console.log(address.value);
    // console.log(address.validity.typeMismatch);
    // console.log(address.validity.valid);
});
test("Check if the button press triggers the fetch request", () => {
    renderWithProviders(_jsx(ThemeProvider, { theme: theme, children: _jsx(CaptivePortal, {}) }));
    //screen.debug()
    const address = screen.getByLabelText(/IP Address or URL/i);
    const token = screen.getByPlaceholderText(/Bearer Token/i);
    const button = screen.getByRole("button", { name: /View Cluster/i });
    fireEvent.change(address, { target: { value: "https://test.com" } });
    fireEvent.change(token, { target: { value: "testtoken" } });
    fireEvent.click(button);
});
