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
    const handleEnvSubmit = async (event) => {
        event.preventDefault();
        if (inputError === true || envAlertMessage === "Success!")
            return;
        try {
            const response = await fetch("http://localhost:8080/api/checkAPI", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address: envAddress,
                    key: envKey,
                }),
            });
            const data = await response.json();
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
        }
        catch (error) {
            throw new Error(`Something went wrong: ${error.message}`);
        }
    };
    return (_jsxs(Box, { component: "form", sx: { "& > :not(style)": { m: 1, width: "25ch" } }, noValidate: true, autoComplete: "off", style: {
            position: "relative",
            width: "max-content",
            height: "max-content",
        }, children: [_jsx("h1", { style: {
                    width: "max-content",
                    position: "relative",
                    alignContent: "center",
                    top: "-170px",
                    left: "-45px",
                }, children: "Change Cluster Address and Key" }), _jsxs("div", { style: { position: "relative" }, children: [_jsx(TextField, { "aria-label": "Address", label: "Address", color: envAlertMessage === "Success!" ? "success" : "primary", helperText: envAddress?.includes("www.")
                            ? "Do not include 'www' before Cluster URL"
                            : null, error: inputError ||
                            (envAddress?.includes("www.") && !envAddress?.includes("www.com")), placeholder: "clusterurl.com:00000", onChange: (e) => setEnvAddress(e.target.value), focused: true, style: {
                            position: "absolute",
                            top: "-150px",
                            left: "45px",
                            width: "300px",
                        } }), _jsx(TextField, { label: "Key", color: envAlertMessage === "Success!" ? "success" : "primary", error: inputError, placeholder: "yJhbGciOiJSUzI1NiIsImtpZCI6ImhzU...", onChange: (e) => setEnvKey(e.target.value), focused: true, style: {
                            position: "absolute",
                            top: "-60px",
                            left: "45px",
                            width: "300px",
                        } }), _jsx("div", { style: {
                            position: "relative",
                            top: "10px",
                            left: "150px",
                        }, children: _jsx(Stack, { direction: "row", spacing: 2, children: _jsx(Button, { variant: inputError === true ? "outlined" : "contained", color: inputError === true
                                    ? "error"
                                    : envAlertMessage === "Success!"
                                        ? "success"
                                        : "secondary", disabled: envAddress?.includes("www.") && !envAddress?.includes("www.com")
                                    ? true
                                    : false, onClick: handleEnvSubmit, style: { marginTop: "16px" }, children: "Submit" }) }) })] }), _jsx("div", { style: {
                    position: "absolute",
                    left: "90px",
                    top: "145px",
                    marginTop: "16px",
                }, children: _jsx(Stack, { sx: { width: "100%" }, spacing: 2, children: envAlert && (_jsx(Alert, { severity: inputError === true ? "error" : "success", children: envAlertMessage })) }) })] }));
};
export default Settings;
