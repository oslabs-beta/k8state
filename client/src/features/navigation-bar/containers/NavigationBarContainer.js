import { jsx as _jsx } from "react/jsx-runtime";
import NavButton from "../components/NavButton";
export default function NavigationBarContainer() {
    return (_jsx("div", { id: "navbar-container", className: "container", children: _jsx(NavButton, {}) }));
}
