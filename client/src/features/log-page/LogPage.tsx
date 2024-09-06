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
            //console.log(data);
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
    for(let i = 0; i < dirInfo.length; i++){
        store.push(
        <Grid item xs={12} sm={6} md={4} key={i + 3013031}>
            <Box sx={{ border: 1, borderColor: "black"}}>
                <Row logName={dirInfo[i]} setDeleted={setDeleted}/>
            </Box>
        </Grid>);
    }
    return(
        <Box sx={{marginLeft: '8px', marginTop: '96px', overflowY: 'scroll', border: 1, borderColor: "black", maxWidth: '1450px',}}>
            <h1 style={{ marginLeft: '32px', marginBottom: '16px'}}>Logs</h1>
            <Button style={{ marginLeft: '32px', marginBottom: '16px'}} variant="contained" color="primary" type="button" onClick={createLogHandler}>Create a Log</Button>
            <Grid container direction="column" spacing={4} style={{ marginLeft: '1px', marginRight: '32px'}}>
                {store}
            </Grid>
        </Box>


    );
};