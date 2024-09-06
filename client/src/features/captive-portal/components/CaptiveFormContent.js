import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
const items = [
    {
        icon: _jsx(DnsRoundedIcon, { sx: { color: 'text.secondary' } }, void 0),
        title: 'Cluster IP Address or URL',
        description: 'Enter the IP address or URL of your Kubernetes cluster. This will allow the tool to connect and retrieve the necessary information to visualize your cluster setup.',
    },
    {
        icon: _jsx(VpnKeyRoundedIcon, { sx: { color: 'text.secondary' } }, void 0),
        title: 'Cluster Credentials',
        description: 'Provide your Kubernetes credentials to authenticate access. Ensure that the credentials have sufficient permissions to access and interact with cluster resources.',
    },
    {
        icon: _jsx(ThumbUpAltRoundedIcon, { sx: { color: 'text.secondary' } }, void 0),
        title: 'View Clusterview',
        description: 'After entering the necessary details, hit the "View Clusterview" button to dynamically render your cluster. Continue exploring for a seamless and interactive visualization experience.',
    },
];
export default function CaptiveFormContent() {
    return (_jsxs(Stack, { sx: { flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }, children: [_jsx(Box, { sx: { display: { xs: 'none', md: 'flex' } } }, void 0), items.map((item, index) => (_jsxs(Stack, { direction: "row", sx: { gap: 2 }, children: [item.icon, _jsxs("div", { children: [_jsx(Typography, { gutterBottom: true, sx: { fontWeight: 'medium' }, children: item.title }, void 0), _jsx(Typography, { variant: "body2", sx: { color: 'text.secondary' }, children: item.description }, void 0)] }, void 0)] }, index)))] }, void 0));
}
