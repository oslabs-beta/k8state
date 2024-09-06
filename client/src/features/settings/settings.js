import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const Settings = () => {
    // state for mode option functionality
    // const [selectedOption, setSelectedOption] = useState<string>(
    //   "Kubernetes API (default)",
    // )
    // setting selector function for mode option functionality
    // const handleSettingSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setSelectedOption(event.target.value)
    // }
    const [envOption, setEnvOption] = useState(false);
    const [envAddress, setEnvAddress] = useState(null);
    const [envKey, setEnvKey] = useState(null);
    const [envToolTip, setEnvToolTip] = useState(null);
    const [envToolTipMessage, setEnvToolTipMessage] = useState(null);
    const handleEditClick = () => {
        setEnvOption(envOption === false ? true : false);
    };
    const handleEnvSubmit = (event) => {
        event.preventDefault();
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
                setEnvToolTipMessage("Success!");
                setEnvToolTip(true);
                setTimeout(() => setEnvToolTip(false), 5000);
            }
            else {
                setEnvToolTipMessage("Invalid Address or Key");
                setEnvToolTip(true);
                setTimeout(() => setEnvToolTip(false), 5000);
            }
        });
        setEnvOption(false);
    };
    return (_jsx("div", { className: "container", id: "settings-container", style: {
            position: "sticky",
            marginTop: "100px",
            marginLeft: "300px",
            textAlign: "center",
            backgroundColor: "#ac96cf",
            paddingBottom: "20px",
        }, children: _jsx("div", { className: "container", id: "env-settings-container", style: { margin: "15px", padding: "5px" }, children: _jsxs("section", { children: [_jsx("h2", { style: { textDecoration: "underline" }, children: "Settings for API access" }, void 0), _jsxs("form", { className: "env-settings", id: "env-settings-form", children: [_jsx("br", {}, void 0), _jsx("label", { style: { fontWeight: "bold" }, children: "Set new Address and Key" }, void 0), _jsx("br", {}, void 0), _jsx("button", { type: "button", style: { borderRadius: "10px", marginTop: "10px" }, onClick: handleEditClick, children: "Edit" }, void 0), _jsx("br", {}, void 0), _jsxs("div", { className: "container", id: "env-settings-input", style: { marginTop: "20px" }, children: [envOption && (_jsx("input", { type: "text", placeholder: "Cluster Address", onChange: (e) => setEnvAddress(e.target.value) }, void 0)), _jsx("br", {}, void 0), envOption && (_jsx("input", { type: "text", placeholder: "Cluster Key", onChange: (e) => setEnvKey(e.target.value) }, void 0)), _jsx("br", {}, void 0), envOption && (_jsx("button", { type: "submit", onClick: e => handleEnvSubmit(e), children: "Submit" }, void 0)), _jsx("br", {}, void 0), envToolTip && (_jsx("div", { className: "settings-tooltip", id: "settings-env-tooltip", style: { marginTop: "10px" }, children: envToolTipMessage }, void 0))] }, void 0)] }, void 0)] }, void 0) }, void 0) }, void 0));
};
export default Settings;
