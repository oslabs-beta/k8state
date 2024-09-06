import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from "@mui/material";
import MiniDrawer from "./features/mini-drawer/MiniDrawer";
const App = () => {
    return (_jsx("div", { className: "App", children: _jsx(Box, { children: _jsx(MiniDrawer, {}) }) }));
};
export default App;
