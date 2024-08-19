import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "./App.css";
import { Counter } from "./features/counter/Counter";
import { Quotes } from "./features/quotes/Quotes";
import logo from "./logo.svg";
const App = () => {
    return (_jsx("div", { className: "App", children: _jsxs("header", { className: "App-header", children: [_jsx("img", { src: logo, className: "App-logo", alt: "logo" }), _jsx(Counter, {}), _jsxs("p", { children: ["Edit ", _jsx("code", { children: "src/App.tsx" }), " and save to reload."] }), _jsx(Quotes, {}), _jsxs("span", { children: [_jsx("span", { children: "Learn " }), _jsx("a", { className: "App-link", href: "https://reactjs.org", target: "_blank", rel: "noopener noreferrer", children: "React" }), _jsx("span", { children: ", " }), _jsx("a", { className: "App-link", href: "https://redux.js.org", target: "_blank", rel: "noopener noreferrer", children: "Redux" }), _jsx("span", { children: ", " }), _jsx("a", { className: "App-link", href: "https://redux-toolkit.js.org", target: "_blank", rel: "noopener noreferrer", children: "Redux Toolkit" }), _jsx("span", { children: ", " }), _jsx("a", { className: "App-link", href: "https://react-redux.js.org", target: "_blank", rel: "noopener noreferrer", children: "React Redux" }), ",", _jsx("span", { children: " and " }), _jsx("a", { className: "App-link", href: "https://reselect.js.org", target: "_blank", rel: "noopener noreferrer", children: "Reselect" })] })] }) }));
};
export default App;
