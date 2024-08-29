import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Popover, Typography, Button } from "@mui/material";
export default function BasicPopover() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (_jsxs("div", { children: [_jsx(Button, { "aria-describedby": id, variant: "contained", onClick: handleClick, children: "Open Popover" }), _jsx(Popover, { id: id, open: open, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left",
                }, children: _jsx(Typography, { sx: { p: 2 }, children: "The content of the Popover." }) })] }));
}
