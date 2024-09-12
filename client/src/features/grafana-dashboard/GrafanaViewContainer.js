import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { setIframeSrc } from "./GrafanaDashboardApiSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import "./Grafana.css";
import { TextField, Button } from "@mui/material";
export default function GrafanaViewContainer() {
    const iframeURL = useAppSelector((state) => state.iframe.src);
    const Form = () => {
        const [inputValue, setInputValue] = useState("");
        const dispatch = useAppDispatch();
        const handleInputChange = (e) => {
            setInputValue(e.target.value);
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            dispatch(setIframeSrc(inputValue));
        };
        return (_jsxs("div", { className: "wrapper", style: { position: "relative", left: "-45px", top: "-75px" }, children: [_jsx("h2", { children: "Connect Your Grafana Dashboard" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx(TextField, { label: "Grafana URL", color: "primary", variant: "outlined", placeholder: "http://your-grafana-instance/d/your-dashboard-id", focused: true, value: inputValue, onChange: handleInputChange }), _jsx(Button, { type: "button", children: "Connect" })] })] }));
    };
    const Dashboard = () => {
        return (_jsx("iframe", { title: "Grafana Dashboard", src: iframeURL, style: {
                width: "100vw",
                height: "100vh",
                border: "none",
                position: "relative",
                marginTop: "30px",
            } }));
    };
    return _jsx(_Fragment, { children: iframeURL !== "" ? _jsx(Dashboard, {}) : _jsx(Form, {}) });
}
