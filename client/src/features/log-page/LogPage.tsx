import type React from "react";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Row from './Row';

export default function LogPage () {
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
        })
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
    const store: JSX.Element[] = [];
    for(const element of dirInfo){
        store.push(<Row logName={element} setDeleted={setDeleted} key={crypto.randomUUID()}/>);
    }
    return(
        <div>
            <Button variant="contained" color="primary" type="button" onClick={createLogHandler}>Create a Log</Button>
            {store}
        </div>
    );
};