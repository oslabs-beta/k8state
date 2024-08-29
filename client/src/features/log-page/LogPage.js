import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
import { Button } from "@mui/material";
export default function LogPage() {
    useEffect(() => {
        fetch("http://localhost:8080/api/getLogs")
            .then(process => process.json())
            .then(data => {
            console.log(data);
        });
    }, []);
    const createLogHandler = () => {
    };
    return (_jsx("div", { children: _jsx(Button, { variant: "contained", color: "primary", type: "button", onClick: createLogHandler, children: "Submit" }) }));
}
;
