import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import TestButton from "./TestButton";
const App = () => {
    return (_jsx("div", { className: "App", children: _jsxs("header", { className: "App-header", children: ["Welcome to k8State", _jsx(TestButton, {})] }) }));
};
export default App;
