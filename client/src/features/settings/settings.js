import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
const Settings = () => {
    const [selectedOption, setSelectedOption] = useState("Kubernetes API (default)");
    const handleSettingSelect = (event) => {
        setSelectedOption(event.target.value);
    };
    return (_jsxs("div", { className: "container", id: "settings-container", style: {
            textAlign: "center",
            backgroundColor: "lightGrey",
            paddingBottom: "20px",
        }, children: [_jsxs("div", { className: "container", id: "current-settings-container", children: [_jsxs("section", { className: "settings", id: "current-settings", style: {
                            paddingTop: "5px",
                            paddingBottom: "5px",
                            backgroundColor: "#ac96cf",
                            fontWeight: "bold",
                        }, children: ["Current Mode: ", selectedOption] }), _jsx("br", {})] }), _jsxs("form", { className: "settings", id: "settings-menu", style: {
                    display: "inline-block",
                    textAlign: "left",
                    backgroundColor: "#c8eaeb",
                    padding: "10px",
                    paddingBottom: "10px",
                }, children: [_jsx("label", { children: "Select Mode:" }), _jsx("br", {}), _jsx("input", { type: "radio", id: "kubernetes-setting", name: "kubernetes-mode", value: "Kubernetes API", onChange: handleSettingSelect, checked: selectedOption === "Kubernetes API" }), _jsx("label", { htmlFor: "kubernetes-setting", children: "Kubernetes API" }), _jsx("br", {}), _jsx("input", { type: "radio", id: "prometheus-setting", name: "prometheus-mode", value: "Prometheus API", onChange: handleSettingSelect, checked: selectedOption === "Prometheus API" }), _jsx("label", { htmlFor: "prometheus-setting", children: "Prometheus API" }), _jsx("br", {}), _jsx("input", { type: "radio", id: "grafana-setting", name: "grafana-mode", value: "Grafana API", onChange: handleSettingSelect, checked: selectedOption === "Grafana API" }), _jsx("label", { htmlFor: "grafana-setting", children: "Grafana API" })] })] }));
};
export default Settings;
