import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { useState } from "react";
const Settings = () => {
    const [inputError, setInputError] = useState(false);
    const [envAddress, setEnvAddress] = useState(null);
    const [envKey, setEnvKey] = useState(null);
    const [envAlertMessage, setEnvAlertMessage] = useState(null);
    const [envAlert, setEnvAlert] = useState(false);
    const handleEnvSubmit = (event) => {
        event.preventDefault();
        if (inputError === true || envAlertMessage === "Success!")
            return;
        fetch("http://localhost:8080/api/checkAPI", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                address: envAddress,
                key: envKey,
            }),
        })
            .then(response => response.json())
            .then(data => {
            if (data.message === "ok") {
                setEnvAlertMessage("Success!");
                setEnvAlert(true);
                setTimeout(() => setEnvAlert(false), 5000);
                setTimeout(() => setEnvAlertMessage(null), 5000);
            }
            else {
                setEnvAlertMessage("Invalid Address or Key");
                setEnvAlert(true);
                setInputError(true);
                setTimeout(() => setEnvAlert(false), 5000);
                setTimeout(() => setInputError(false), 5000);
                setTimeout(() => setEnvAlertMessage(null), 5000);
            }
        });
    };
    return (_jsxs(Box, { component: "form", sx: { "& > :not(style)": { m: 1, width: "25ch" } }, noValidate: true, autoComplete: "off", children: [_jsx("h1", { style: {
                    width: "max-content",
                    position: "absolute",
                    top: "120px",
                    left: "375px",
                }, children: "Change Cluster Address and Key" }), _jsx(TextField, { label: "Address", color: envAlertMessage === "Success!" ? "success" : "primary", error: inputError, onChange: (e) => setEnvAddress(e.target.value), focused: true, style: { position: "fixed", top: "200px", left: "500px" } }), _jsx(TextField, { label: "Key", color: envAlertMessage === "Success!" ? "success" : "primary", error: inputError, onChange: (e) => setEnvKey(e.target.value), focused: true, style: { position: "fixed", top: "280px", left: "500px" } }), _jsx("div", { style: {
                    display: "flex",
                    position: "absolute",
                    top: "350px",
                    left: "570px",
                }, children: _jsx(Stack, { direction: "row", spacing: 2, children: _jsx(Button, { variant: inputError === true ? "outlined" : "contained", color: inputError === true
                            ? "error"
                            : envAlertMessage === "Success!"
                                ? "success"
                                : "primary", onClick: handleEnvSubmit, style: { marginTop: "16px" }, children: "Submit" }) }) }), _jsx("div", { style: {
                    display: "flex",
                    position: "absolute",
                    left: "500px",
                    top: "425px",
                    marginTop: "16px",
                }, children: _jsx(Stack, { sx: { width: "100%" }, spacing: 2, children: envAlert && (_jsx(Alert, { severity: inputError === true ? "error" : "success", children: envAlertMessage })) }) })] }));
};
export default Settings;
