import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
export default function PrometheusChart() {
    const [iframes, setIframes] = useState([]);
    // Helper function that creates an iframe element
    const createIFrame = (input) => {
        return _jsx("iframe", { src: input });
    };
    return (_jsx("div", { id: "clusterview-container", className: "container", children: _jsx("div", { style: { width: "100vw", height: "100vh" }, children: iframes }) }));
}
