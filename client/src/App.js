import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { Box } from "@mui/material";
import ClusterViewContainer from "./features/cluster-view/containers/ClusterViewContainer";
const App = () => {
    return (_jsx("div", { className: "App", children: _jsxs("header", { className: "App-header", children: ["Welcome to k8State", _jsx(Box, { children: _jsx(ClusterViewContainer, {}) })] }) }));
};
export default App;
