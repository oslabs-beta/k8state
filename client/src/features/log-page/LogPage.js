import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Button, Box } from "@mui/material";
import Log from "./Log";
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
    // for(let i = 0; i < dirInfo.length; i++){
    //     store.push(
    //     // <Grid item xs={12} sm={6} md={4} key={i + 3013031}>
    //         // <Box sx={{ border: 1, borderColor: "black"}}>
    //         <Box>
    //             <Row logName={dirInfo[i]} setDeleted={setDeleted}/>
    //         </Box>
    //     // </Grid>);
    // )};
    for (let i = 0; i < dirInfo.length; i++) {
        store.push(
        // <Grid item xs={12} sm={6} md={4} key={i + 3013031}>
        // <Box sx={{ border: 1, borderColor: "black"}}>
        _jsx(Box, { children: _jsx(Log, { setDeleted: setDeleted, logName: dirInfo[i] }) }, i * 123)
        // </Grid>
        );
    }
    ;
    return (_jsxs("div", { children: [_jsx("h1", { style: { marginLeft: '32px', marginBottom: '16px' }, children: "Logs" }), _jsx(Button, { style: { marginLeft: '32px', marginBottom: '16px' }, variant: "contained", color: "primary", type: "button", onClick: createLogHandler, children: "Create a Log" }), store] }));
}
;
