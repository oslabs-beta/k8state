import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import './Grafana.css';
export default function GrafanaViewContainer() {
    const [iframeURL, setIframeURL] = useState("");
    const Form = () => {
        const [inputValue, setInputValue] = useState("");
        const handleInputChange = (e) => {
            setInputValue(e.target.value);
        };
        const handleSubmit = (e) => {
            e.preventDefault();
            setIframeURL(inputValue);
        };
        return (_jsxs("div", { className: "wrapper", children: [_jsx("h2", { children: "Connect Your Grafana Dashboard" }), _jsxs("form", { onSubmit: handleSubmit, children: [_jsx("label", { children: "Link URL" }), _jsx("input", { placeholder: "http://your-grafana-instance/d/your-dashboard-id", type: "text", value: inputValue, onChange: handleInputChange }), _jsx("button", { type: "submit", children: _jsx("strong", { children: "Connect" }) })] })] }));
    };
    const Dashboard = () => {
        return (_jsx("div", { className: "iframe-container", children: _jsx("iframe", { title: "Grafana Dashboard", src: iframeURL, style: { width: '100vh', height: '80vh', border: 'none', position: 'relative' } }) }));
    };
    // **********************************
    // **   Render Grafana dashboard   **
    // **********************************
    return (_jsx(_Fragment, { children: iframeURL !== "" /** && Link Works */ ? _jsx(Dashboard, {}) : _jsx(Form, {}) }));
}
