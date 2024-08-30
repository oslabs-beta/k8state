import type React from "react";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Row from './Row';

export default function LogPage () {
    const [dirInfo, setdirInfo] = useState([]);
    const [log, setLog] = useState([]);
    useEffect(() => {
        fetch("http://localhost:8080/api/getLogs")
        .then(process => process.json())
        .then(data => {
            console.log(data);
            setdirInfo(data);
        });
    }, [log]);
    const createLogHandler = () => {
        fetch("http://localhost:8080/api/createLogs")
        .then(process => process.json())
        .then(data => {
            console.log(data);
            setLog(data);
        });
    };
    const store: JSX.Element[] = [];
    for(const element of dirInfo){
        store.push(<Row logName={element}/>);
    }
    return(
        <div>
            <Button variant="contained" color="primary" type="button" onClick={createLogHandler}>Create a Log</Button>
            {store}
        </div>
    );
};