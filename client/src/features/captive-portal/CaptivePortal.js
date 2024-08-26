import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAddress, setKey } from '../captive-portal/captivePortalSlice';
import { TextField, Button } from "@mui/material";
import { Navigate } from 'react-router-dom';
export default function CaptivePortal() {
    const dispatch = useAppDispatch();
    const [dest, setDest] = useState('');
    const [bearer, setBearer] = useState('');
    const [submit, setSubmit] = useState(false);
    const key = useAppSelector((state) => state.portalSlice.key);
    const address = useAppSelector((state) => state.portalSlice.address);
    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(setAddress(dest));
        dispatch(setKey(bearer));
        setSubmit(true);
    };
    // useEffect(()=>{
    //     //testing
    //     console.log('Key is ' + key);
    //     console.log('Address is ' + address);
    // }, [key, address])
    if (submit === true) {
        return _jsx(Navigate, { to: "/clusterui" });
    }
    return (_jsx("div", { id: "captive-portal", className: "portal", children: _jsxs("form", { onSubmit: submitHandler, children: [_jsx(TextField, { id: "outlined-basic", label: "IP Address or URL", variant: "outlined", onChange: (input) => setDest(input.target.value) }), _jsx(TextField, { id: "outlined-basic", label: "Bearer Token", variant: "outlined", onChange: (input) => setBearer(input.target.value) }), _jsx(Button, { variant: "contained", color: "primary", type: "submit", children: "Submit" })] }) }));
}
