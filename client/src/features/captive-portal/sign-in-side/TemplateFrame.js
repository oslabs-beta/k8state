import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createTheme, ThemeProvider, styled, } from '@mui/material/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ToggleColorMode from './ToggleColorMode';
import getSignInSideTheme from './theme/getSignInSideTheme';
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
    boxShadow: 'none',
    backgroundImage: 'none',
    zIndex: theme.zIndex.drawer + 1,
    flex: '0 0 auto',
}));
export default function TemplateFrame({ showCustomTheme, toggleCustomTheme, mode, toggleColorMode, children, }) {
    const handleChange = (event) => {
        toggleCustomTheme(event.target.value === 'custom');
    };
    const signInSideTheme = createTheme(getSignInSideTheme(mode));
    return (_jsx(ThemeProvider, { theme: signInSideTheme, children: _jsxs(Box, { sx: { height: '100dvh', display: 'flex', flexDirection: 'column' }, children: [_jsx(StyledAppBar, { children: _jsxs(Toolbar, { variant: "dense", disableGutters: true, sx: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            width: '100%',
                            p: '8px 12px',
                        }, children: [_jsx(Button, { variant: "text", size: "small", "aria-label": "Back to templates", startIcon: _jsx(ArrowBackRoundedIcon, {}), component: "a", href: "/material-ui/getting-started/templates/", sx: { display: { xs: 'none', sm: 'flex' } }, children: "Back to templates" }), _jsx(IconButton, { size: "small", "aria-label": "Back to templates", component: "a", href: "/material-ui/getting-started/templates/", sx: { display: { xs: 'auto', sm: 'none' } }, children: _jsx(ArrowBackRoundedIcon, {}) }), _jsxs(Box, { sx: { display: 'flex', gap: 1 }, children: [_jsx(FormControl, { variant: "outlined", sx: { minWidth: 180 }, children: _jsxs(Select, { size: "small", labelId: "theme-select-label", id: "theme-select", value: showCustomTheme ? 'custom' : 'material', onChange: handleChange, label: "Design Language", children: [_jsx(MenuItem, { value: "custom", children: "Custom Theme" }), _jsx(MenuItem, { value: "material", children: "Material Design 2" })] }) }), _jsx(ToggleColorMode, { "data-screenshot": "toggle-mode", mode: mode, toggleColorMode: toggleColorMode })] })] }) }), _jsx(Box, { sx: { flex: '1 1', overflow: 'auto' }, children: children })] }) }));
}
