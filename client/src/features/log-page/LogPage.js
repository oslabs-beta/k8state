import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
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
            console.log(data);
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
    for (const element of dirInfo) {
        store.push(_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, children: _jsx(Row, { logName: element, setDeleted: setDeleted }, crypto.randomUUID()) }));
    }
    return (
    // <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
    //     <p>Logs</p>
    //     <Button variant="contained" color="primary" type="button" onClick={createLogHandler}>Create a Log</Button>
    //     {store}
    // </Box>
    _jsxs("div", { children: [_jsx("p", { style: { marginBottom: '16px' }, children: "Logs" }), _jsx(Button, { style: { marginBottom: '16px' }, variant: "contained", color: "primary", type: "button", onClick: createLogHandler, children: "Create a Log" }), _jsx(Grid, { container: true, direction: "column", spacing: 4, children: store })] }));
}
;
