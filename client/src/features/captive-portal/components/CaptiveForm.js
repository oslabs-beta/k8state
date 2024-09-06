import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch } from '../../../app/hooks';
import { setAddress, setKey } from '../captivePortalSlice';
import { TextField, Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
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
export default function CaptiveForm() {
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
    const invalidKeyError = _jsx("p", { children: "The URL of the Bearer Token entered is invalid. " }, void 0);
    if (submit === true) {
        return _jsx(Navigate, { to: "/clusterui" }, void 0);
    }
    return (_jsx(_Fragment, { children: _jsxs("form", { onSubmit: submitHandler, children: [" ", _jsx(Stack, { direction: { xs: 'column-reverse', md: 'row' }, sx: {
                        justifyContent: 'center',
                        gap: { xs: 6, sm: 12 },
                        p: 2,
                        m: 'auto',
                    }, children: _jsxs(Card, { variant: "outlined", children: [_jsxs(FormControl, { children: [_jsx(FormLabel, { htmlFor: "ip_or_url", children: "IP Address or URL" }, void 0), _jsx(TextField, { id: "ip_or_url", type: "url", name: "ip_or_url", placeholder: "http://192.168.1.1 or http://yourURL.com", onChange: (input) => setDest(input.target.value), autoFocus: true, required: true, fullWidth: true, variant: "outlined", error: !!error, sx: { ariaLabel: 'ip_or_url' } }, void 0)] }, void 0), _jsxs(FormControl, { children: [_jsx(Box, { sx: { display: 'flex', justifyContent: 'space-between' }, children: _jsx(FormLabel, { htmlFor: "bearer_token", children: "Bearer Token" }, void 0) }, void 0), _jsx(TextField, { name: "bearer_token", placeholder: "Bearer Token", type: "text", id: "password", required: true, fullWidth: true, variant: "outlined", error: !!error, onChange: (input) => setBearer(input.target.value) }, void 0)] }, void 0), _jsx(Button, { type: "submit", fullWidth: true, variant: "contained", color: "violet", children: "View Cluster" }, void 0), error && invalidKeyError] }, void 0) }, void 0)] }, void 0) }, void 0));
}
