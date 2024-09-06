import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
// import ForgotPassword from './ForgotPassword';
// import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
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
export default function SignInCard() {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };
    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        let isValid = true;
        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        }
        else {
            setEmailError(false);
            setEmailErrorMessage('');
        }
        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        }
        else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }
        return isValid;
    };
    return (_jsxs(Card, { variant: "outlined", children: [_jsx(Typography, { component: "h1", variant: "h4", sx: { width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }, children: "Input Cluster Credentials" }), _jsxs(Box, { component: "form", onSubmit: handleSubmit, noValidate: true, sx: { display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }, children: [_jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "email", children: "IP Address or URL" }), _jsx(TextField, { error: emailError, helperText: emailErrorMessage, id: "email", type: "email", name: "email", placeholder: "IP Address or URL", autoComplete: "email", autoFocus: true, required: true, fullWidth: true, variant: "outlined", color: emailError ? 'error' : 'primary', sx: { ariaLabel: 'email' } })] }), _jsxs(FormControl, { children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between' }, children: _jsx(FormLabel, { htmlFor: "password", children: "Bearer Token" }) }), _jsx(TextField, { error: passwordError, helperText: passwordErrorMessage, name: "password", placeholder: "Bearer Token", type: "password", id: "password", autoComplete: "current-password", autoFocus: true, required: true, fullWidth: true, variant: "outlined", color: passwordError ? 'error' : 'primary' })] }), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", onClick: validateInputs, children: "View Cluster" })] })] }));
}
