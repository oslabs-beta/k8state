import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TextField, Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
export default function CaptivePortal() {
    const dispatch = useAppDispatch();
    const [dest, setDest] = useState('');
    const [bearer, setBearer] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState('');
    const key = useAppSelector((state) => state.portalSlice.key);
    const address = useAppSelector((state) => state.portalSlice.address);
    const submitHandler = (event) => {
        event.preventDefault();
        // dispatch(setAddress(dest));
        // dispatch(setKey(bearer));
        fetch("http://localhost:8080/api/checkAPI", {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => {
            //console.log(data.message);
            if (data.message.statusCode === 200) {
                setSubmit(true);
            }
            else {
                //setError(data.message);
                console.log(data);
            }
        });
    };
    if (submit === true) {
        return _jsx(Navigate, { to: "/clusterui" });
    }
    return (_jsx("div", { id: "captive-portal", className: "portal", children: _jsxs("form", { onSubmit: submitHandler, children: [error && _jsx("p", { children: error }), _jsx(TextField, { id: "outlined-basic", label: "IP Address or URL", variant: "outlined", onChange: (input) => setDest(input.target.value) }), _jsx(TextField, { id: "outlined-basic", label: "Bearer Token", variant: "outlined", onChange: (input) => setBearer(input.target.value) }), _jsx(Button, { variant: "contained", color: "primary", type: "submit", children: "Submit" })] }) }));
}
