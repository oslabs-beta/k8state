import { jsx as _jsx } from "react/jsx-runtime";
import IconButton from '@mui/material/IconButton';
import ModeNightRoundedIcon from '@mui/icons-material/ModeNightRounded';
import WbSunnyRoundedIcon from '@mui/icons-material/WbSunnyRounded';
export default function ToggleColorMode({ mode, toggleColorMode, ...props }) {
    return (_jsx(IconButton, { onClick: toggleColorMode, size: "small", color: "primary", "aria-label": "Theme toggle button", ...props, children: mode === 'dark' ? (_jsx(WbSunnyRoundedIcon, { fontSize: "small" })) : (_jsx(ModeNightRoundedIcon, { fontSize: "small" })) }));
}
