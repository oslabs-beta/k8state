import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
// CREATE TYPE INTERFACE FOR DATA
// ****************************
// **   Create Interface's   **
// ****************************
const CustomNode = ({ data }) => {
    // ** set local state **
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        event.preventDefault();
        // console.log("clicked: ", event.target)
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    console.log("CustomNode Line 52: data: ", data);
    return (_jsxs(_Fragment, { children: [_jsxs("div", { style: { padding: 5, backgroundColor: "#87CEEB", borderRadius: 10 }, onClick: handleClick, children: [_jsx("div", { children: data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name }), _jsx(Handle, { type: "target", position: Position.Top, style: { borderRadius: 100, width: 20 } }), _jsx(Handle, { type: "source", position: Position.Bottom, style: { borderRadius: 100, width: 20 } })] }), data.popOverType === "node" && (_jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                }, children: _jsxs(Typography, { sx: { p: 2 }, children: [_jsx("strong", { children: "Name:" }), " ", data.name, _jsx("br", {}), _jsx("strong", { children: "Time Created:" }), data["creationTimestamp"] ? data.creationTimestamp : null, _jsx("br", {}), _jsx("strong", { children: "Capacity:" }), _jsx("br", {}), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " CPU: " }) }), data.capacity["cpu"].toString(), _jsx("br", {}), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " ephemeral-storage: " }) }), data.capacity["ephemeral-storage"], _jsx("br", {}), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " hugepages-1Gi: " }) }), data.capacity["hugepages-1Gi"], _jsx("br", {}), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " hugepages-2Mi: " }) }), data.capacity["hugepages-2Mi"], _jsx("br", {}), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " memory: " }) }), data.capacity["memory"], _jsx("br", {}), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " pods: " }) }), data.capacity["pods"]] }) })), data.popOverType === "pod" && (_jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                }, children: _jsxs(Typography, { sx: { p: 2 }, children: [_jsx("strong", { children: "Name:" }), " ", data.name, _jsx("br", {}), _jsx("strong", { children: "Time Created: " }), data.creationTimestamp ? data.creationTimestamp : null, _jsx("br", {}), _jsx("strong", { children: "phase:" }), " ", data.phase, _jsx("br", {}), _jsx("strong", { children: "restartPolicy:" }), " ", data.restartPolicy, _jsx("br", {}), _jsx("strong", { children: "uid:" }), " ", data.uid] }) }))] }));
};
export default CustomNode;
