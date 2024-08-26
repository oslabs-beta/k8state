import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/material";
import ClusterViewContainer from "./features/cluster-view/containers/ClusterViewContainer";
import MiniDrawer from "./features/mini-drawer/MiniDrawer";
const App = () => {
    return (_jsx("div", { className: "App", children: _jsxs(Box, { children: [_jsx(MiniDrawer, {}), _jsx(ClusterViewContainer, {})] }) }));
};
export default App;
