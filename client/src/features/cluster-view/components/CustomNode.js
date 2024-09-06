import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
const Cluster = styled.div `
background: white;
border-radius: 50%; 
height: 150px; 
width: 150px;
border: 5px solid #ad97d0;
box-shadow: 0 0 40px #ad97d0;
color: black;
text-align: center;
align-content: center;
`;
const Node = styled.div `
background: white;
border-radius: 50%; 
height: 150px; 
width: 150px;
border: 5px solid #ad97d0;
box-shadow: 0 0 40px #ad97d0;
color: black;
text-align: center;
align-content: center;
`;
// ${data.conditions[2].status ? '5px solid rgb(46, 226, 88)': '5px solid red'};
// ${data.conditions[2].status ? '0 0 40px rgb(46, 226, 88)': '0 0 40px red'};
const Pod = styled.div `
background: white;
border-radius: 50%; 
height: 150px; 
width: 150px;
color: black;
text-align: center;
align-content: center;
`;
export const KubeNode = ({ data }) => {
    // ** set local state **
    const [anchorEl, setAnchorEl] = useState(null);
    // Define fuctions to open and close popover element
    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (_jsxs(_Fragment, { children: [_jsxs(Node, { onClick: handleClick, children: [_jsx("div", { children: data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name }, void 0), _jsx(Handle, { type: "target", position: Position.Top, style: { borderRadius: 100, width: 20 } }, void 0), _jsx(Handle, { type: "source", position: Position.Bottom, style: { borderRadius: 100, width: 20 } }, void 0)] }, void 0), _jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                }, children: _jsxs(Typography, { sx: { p: 2 }, children: [_jsx("strong", { children: "Name:" }, void 0), " ", data.name, _jsx("br", {}, void 0), _jsx("strong", { children: "Time Created:" }, void 0), data["creationTimestamp"] ? data.creationTimestamp : null, _jsx("br", {}, void 0), _jsx("strong", { children: "Capacity:" }, void 0), _jsx("br", {}, void 0), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " CPU: " }, void 0) }, void 0), data.capacity["cpu"].toString(), _jsx("br", {}, void 0), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " ephemeral-storage: " }, void 0) }, void 0), data.capacity["ephemeral-storage"], _jsx("br", {}, void 0), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " hugepages-1Gi: " }, void 0) }, void 0), data.capacity["hugepages-1Gi"], _jsx("br", {}, void 0), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " hugepages-2Mi: " }, void 0) }, void 0), data.capacity["hugepages-2Mi"], _jsx("br", {}, void 0), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " memory: " }, void 0) }, void 0), data.capacity["memory"], _jsx("br", {}, void 0), _jsx("strong", { children: _jsx("span", { style: { marginLeft: "20px" }, children: " pods: " }, void 0) }, void 0), data.capacity["pods"]] }, void 0) }, void 0)] }, void 0));
};
export const KubePod = ({ data }) => {
    // ** set local state **
    const [anchorEl, setAnchorEl] = useState(null);
    const [status, setStatus] = useState(data.conditions[2].status);
    // Monitors changes in pod status and updates state accordingly
    useEffect(() => {
        setStatus(data.conditions[2].status);
    }, [data.conditions]);
    // Define fuctions to open and close popover element
    const handleClick = (event) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    const styles = {
        border: `5px solid ${status ? 'rgb(46, 226, 88)' : 'red'}`,
        boxShadow: `0 0 40px ${status ? 'rgb(46, 226, 88)' : 'red'}`
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Pod, { onClick: handleClick, style: styles, children: [_jsx("div", { children: data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name }, void 0), _jsx(Handle, { type: "target", position: Position.Top, style: { borderRadius: 100, width: 20 } }, void 0)] }, void 0), _jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                }, children: _jsxs(Typography, { sx: { p: 2 }, children: [_jsx("strong", { children: "Name:" }, void 0), " ", data.name, _jsx("br", {}, void 0), _jsx("strong", { children: "Time Created: " }, void 0), data.creationTimestamp ? data.creationTimestamp : null, _jsx("br", {}, void 0), _jsx("strong", { children: "phase:" }, void 0), " ", data.phase, _jsx("br", {}, void 0), _jsx("strong", { children: "restartPolicy:" }, void 0), " ", data.restartPolicy, _jsx("br", {}, void 0), _jsx("strong", { children: "uid:" }, void 0), " ", data.uid] }, void 0) }, void 0)] }, void 0));
};
export const KubeCluster = ({ data }) => {
    return (_jsx(_Fragment, { children: _jsxs(Cluster, { children: [_jsx("div", { children: data.name.length > 10 ? `${data.name.slice(0, 20)}...` : data.name }, void 0), _jsx(Handle, { type: "source", position: Position.Bottom, style: { borderRadius: 100, width: 20 } }, void 0)] }, void 0) }, void 0));
};
