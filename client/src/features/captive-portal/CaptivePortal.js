import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { setAddress, setKey } from './captivePortalSlice';
import { TextField, Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    boxShadow: 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    ...theme.applyStyles('dark', {
        boxShadow: 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));
export default function CaptivePortal() {
    const dispatch = useAppDispatch();
    const [dest, setDest] = useState('');
    const [bearer, setBearer] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState('');
    const submitHandler = (event) => {
        event.preventDefault();
        fetch("http://localhost:8080/api/checkAPI", {
            method: 'POST',
            body: JSON.stringify({
                key: bearer,
                address: dest
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
            if (data.message !== 'ok') {
                setError(JSON.stringify(data));
            }
            else {
                setSubmit(true);
                dispatch(setAddress(dest));
                dispatch(setKey(bearer));
            }
        });
    };
    if (submit === true) {
        return _jsx(Navigate, { to: "/clusterui" });
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { variant: "outlined", children: [_jsx(Typography, { component: "h1", variant: "h4", sx: { width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }, children: "Input Cluster Credentials" }), _jsxs("div", { id: "captive-portal", className: "portal", children: [error && _jsx("p", { children: error }), _jsxs("form", { onSubmit: submitHandler, children: [_jsx(TextField, { id: "outlined-basic", label: "IP Address or URL", variant: "outlined", onChange: (input) => setDest(input.target.value) }), _jsx(TextField, { id: "outlined-basic", label: "Bearer Token", variant: "outlined", onChange: (input) => setBearer(input.target.value) }), _jsx(Button, { variant: "contained", color: "primary", type: "submit", children: "Submit" })] })] })] }), "*****REBUILDING FORM HERE:******", _jsxs("form", { onSubmit: submitHandler, children: [" ", _jsx(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
                            justifyContent: 'center',
                            gap: { xs: 6, sm: 12 },
                            p: 2,
                            m: 'auto',
                        }, children: _jsxs(Card, { variant: "outlined", children: [_jsx(Typography, { component: "h1", variant: "h4", sx: { width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }, children: "Input Cluster Credentials" }), _jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "ip_or_url", children: "IP Address or URL" }), _jsx(TextField, { id: "ip_or_url", type: "url", name: "ip_or_url", placeholder: "http://192.168.1.1 or http://yourURL.com", onChange: (input) => setDest(input.target.value), autoFocus: true, required: true, fullWidth: true, variant: "outlined", sx: { ariaLabel: 'ip_or_url' } })] }), _jsxs(FormControl, { children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between' }, children: _jsx(FormLabel, { htmlFor: "password", children: "Bearer Token" }) }), _jsx(TextField, { name: "bearer_token", placeholder: "Bearer Token", type: "text", id: "password", required: true, fullWidth: true, variant: "outlined", onChange: (input) => setBearer(input.target.value) })] }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", children: "View Cluster" })] }) })] })] }));
}
