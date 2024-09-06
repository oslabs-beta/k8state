import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button, Box, Grid } from "@mui/material";
import Row from './Row';
import './logpage.css';
export default function LogPage() {
    const [dirInfo, setdirInfo] = useState([]);
    const [log, setLog] = useState([]);
    const [deleted, setDeleted] = useState('');
    useEffect(() => {
        fetch("http://localhost:8080/api/getLogs")
            .then(process => process.json())
            .then(data => {
            //console.log(data);
            setdirInfo(data);
        })
            .catch(error => {
            console.log(error);
        });
    }, [log, deleted]);
    const createLogHandler = () => {
        fetch("http://localhost:8080/api/createLogs", {
            method: 'POST'
        })
            .then(process => process.json())
            .then(data => {
            console.log(data);
            setLog(data);
        })
            .catch(error => {
            console.log(error);
        });
    };
    const store = [];
    for (let i = 0; i < dirInfo.length; i++) {
        store.push(_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsx(Box, { sx: { border: 1, borderColor: "black" }, children: _jsx(Row, { logName: dirInfo[i], setDeleted: setDeleted }) }) }, i + 3013031));
    }
    return (_jsxs(Box, { sx: { marginLeft: '8px', marginTop: '96px', overflowY: 'scroll', border: 1, borderColor: "black", maxWidth: '1450px', }, children: [_jsx("h1", { style: { marginLeft: '32px', marginBottom: '16px' }, children: "Logs" }), _jsx(Button, { style: { marginLeft: '32px', marginBottom: '16px' }, variant: "contained", color: "primary", type: "button", onClick: createLogHandler, children: "Create a Log" }), _jsx(Grid, { container: true, direction: "column", spacing: 4, style: { marginLeft: '1px', marginRight: '32px' }, children: store })] }));
}
;
