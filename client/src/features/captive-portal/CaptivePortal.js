import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
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
            setError(JSON.stringify(data));
            //console.log(data.message);
            // if(data.message.statusCode === 200){
            //     setSubmit(true);
            // }
            // else{
            //     setError(JSON.stringify(data));
            // }
        });
    };
    //rerenders when error changes
    useEffect(() => {
        console.log(error);
    }, [error]);
    if (submit === true) {
        return _jsx(Navigate, { to: "/clusterui" });
    }
    return (_jsxs("div", { id: "captive-portal", className: "portal", children: [error && _jsx("p", { children: error }), _jsxs("form", { onSubmit: submitHandler, children: [_jsx(TextField, { id: "outlined-basic", label: "IP Address or URL", variant: "outlined", onChange: (input) => setDest(input.target.value) }), _jsx(TextField, { id: "outlined-basic", label: "Bearer Token", variant: "outlined", onChange: (input) => setBearer(input.target.value) }), _jsx(Button, { variant: "contained", color: "primary", type: "submit", children: "Submit" })] })] }));
}
