import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Stack from "@mui/material/Stack";
import CaptiveForm from "../components/CaptiveForm";
import CaptiveFormContent from "../components/CaptiveFormContent";
export default function CaptivePortal() {
    //Container to render the captive form information
    return (_jsxs(Stack, { direction: { xs: "column-reverse", md: "row" }, sx: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
        }, children: [_jsx(CaptiveFormContent, {}), _jsx(CaptiveForm, {})] }));
}
