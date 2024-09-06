import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch } from '../../app/hooks';
import { setAddress, setKey } from './captivePortalSlice';
import { TextField, Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import SignInCard from './sign-in-side/SignInCard';
import Content from './sign-in-side/Content';
import MuiCard from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
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
    return (_jsxs(_Fragment, { children: [_jsxs(Card, { variant: "outlined", children: [_jsx(Typography, { component: "h1", variant: "h4", sx: { width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }, children: "Input Cluster Credentials" }), _jsxs("div", { id: "captive-portal", className: "portal", children: [error && _jsx("p", { children: error }), _jsxs("form", { onSubmit: submitHandler, children: [_jsx(TextField, { id: "outlined-basic", label: "IP Address or URL", variant: "outlined", onChange: (input) => setDest(input.target.value) }), _jsx(TextField, { id: "outlined-basic", label: "Bearer Token", variant: "outlined", onChange: (input) => setBearer(input.target.value) }), _jsx(Button, { variant: "contained", color: "primary", type: "submit", children: "Submit" })] })] })] }), "*****REBUILDING FORM HERE:******", _jsxs(Card, { variant: "outlined", children: [_jsx(Typography, { component: "h1", variant: "h4", sx: { width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }, children: "Input Cluster Credentials" }), _jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "email", children: "IP Address or URL" }), _jsx(TextField
                            // error={emailError}
                            // helperText={emailErrorMessage}
                            , { 
                                // error={emailError}
                                // helperText={emailErrorMessage}
                                id: "email", type: "email", name: "email", placeholder: "IP Address or URL", autoComplete: "email", autoFocus: true, required: true, fullWidth: true, variant: "outlined", 
                                // color={emailError ? 'error' : 'primary'}
                                sx: { ariaLabel: 'email' } })] })] }), _jsx(Stack, { direction: "column", component: "main", sx: [
                    {
                        justifyContent: 'space-between',
                        height: { xs: 'auto', md: '100%' },
                    },
                    (theme) => ({
                        backgroundImage: 'radial-gradient(ellipse at 70% 51%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                        backgroundSize: 'cover',
                        ...theme.applyStyles('dark', {
                            backgroundImage: 'radial-gradient(at 70% 51%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                        }),
                    }),
                ], children: _jsxs(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
                        justifyContent: 'center',
                        gap: { xs: 6, sm: 12 },
                        p: 2,
                        m: 'auto',
                    }, children: [_jsx(Content, {}), _jsx(SignInCard, {})] }) })] }));
}
