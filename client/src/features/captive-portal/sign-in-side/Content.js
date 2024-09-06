import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import { SitemarkIcon } from './CustomIcons';
const items = [
    {
        icon: _jsx(SettingsSuggestRoundedIcon, { sx: { color: 'text.secondary' } }),
        title: 'Adaptable performance',
        description: 'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
    },
    {
        icon: _jsx(ConstructionRoundedIcon, { sx: { color: 'text.secondary' } }),
        title: 'Built to last',
        description: 'Experience unmatched durability that goes above and beyond with lasting investment.',
    },
    {
        icon: _jsx(ThumbUpAltRoundedIcon, { sx: { color: 'text.secondary' } }),
        title: 'Great user experience',
        description: 'Integrate our product into your routine with an intuitive and easy-to-use interface.',
    },
    {
        icon: _jsx(AutoFixHighRoundedIcon, { sx: { color: 'text.secondary' } }),
        title: 'Innovative functionality',
        description: 'Stay ahead with features that set new standards, addressing your evolving needs better than the rest.',
    },
];
export default function Content() {
    return (_jsxs(Stack, { sx: { flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }, children: [_jsx(Box, { sx: { display: { xs: 'none', md: 'flex' } }, children: _jsx(SitemarkIcon, {}) }), items.map((item, index) => (_jsxs(Stack, { direction: "row", sx: { gap: 2 }, children: [item.icon, _jsxs("div", { children: [_jsx(Typography, { gutterBottom: true, sx: { fontWeight: 'medium' }, children: item.title }), _jsx(Typography, { variant: "body2", sx: { color: 'text.secondary' }, children: item.description })] })] }, index)))] }));
}
