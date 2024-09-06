import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Stack from '@mui/material/Stack';
import CaptiveForm from "../components/CaptiveForm";
import CaptiveFormContent from "../components/CaptiveFormContent";
export default function CaptivePortal() {
    return (_jsxs(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', // Full viewport height
        }, children: [_jsx(CaptiveFormContent, {}, void 0), _jsx(CaptiveForm, {}, void 0)] }, void 0));
}
