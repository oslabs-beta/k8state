import type React from "react";
import { useState, useEffect } from "react";
import { TextField, Button, Box, Grid, Paper } from "@mui/material";
import Row from './Row';
import './logpage.css';

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
        store.push(
        <Grid item xs={12} sm={6} md={4}>
            <Row logName={element} setDeleted={setDeleted} key={crypto.randomUUID()}/>
        </Grid>);
    }
    return(
        // <Box component="section" sx={{ p: 2, border: '1px solid black' }}>
        //     <p>Logs</p>
        //     <Button variant="contained" color="primary" type="button" onClick={createLogHandler}>Create a Log</Button>
        //     {store}
        // </Box>
        <div>
            <p style={{ marginBottom: '16px'}}>Logs</p>
            <Button style={{ marginBottom: '16px'}} variant="contained" color="primary" type="button" onClick={createLogHandler}>Create a Log</Button>
            <Grid container direction="column" spacing={4}>
                {store}
            </Grid>
        </div>


    );
};