import type React from "react";
import { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

import { CSSTransition } from 'react-transition-group'; // Import CSSTransition for transitions
import './Row.css'; // Import the CSS file

export default function Row (props: { logName: string,  setDeleted: React.Dispatch<React.SetStateAction<string>> }) {
    const [appear, setAppear] = useState(false);
    const [log, setLog] = useState([]);
    const [name, setName] = useState([]);
    const [namespace, setNamespace] = useState([]);
    const downloadLogHandler = () => {
        fetch('http://localhost:8080/api/getDownloadLogs/' + props.logName, {
            method: 'GET',
        })
        .then(response => response.blob()) //stores the file in a blob (binary large object)
        .then(blob => {
            const url = window.URL.createObjectURL( //creates a URL with the blob object
                new Blob([blob]),
              );
            const link = document.createElement('a'); //creates an anchor for the download
            link.href = url; //sets the blob's url to the anchor
            link.setAttribute('download', props.logName);//sets download attribute and file name (file type matters)
            document.body.appendChild(link); //appends document to DOM
            link.click(); //"clicks" the button
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
            window.URL.revokeObjectURL(url); //cleans up the URL
        })
    };
    const readLogHandler = () => {
        interface dataObj {
            name: string;
            namespace: string;
            logs: string;
        }
        if(appear){
            setAppear(false);
        }
        else{
            fetch('http://localhost:8080/api/getLogs/' + props.logName, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setName(data.map((element: dataObj, i: number) => {
                    return <Grid item xs={12} sm={6} md={4} key={i + 303030303}>{element.name}</Grid>;
                }));
                setNamespace(data.map((element: dataObj, i: number) => {
                    return <Grid item xs={12} sm={6} md={4} key={i + 101010101}>{element.namespace}</Grid>;
                }));
                setLog(data.map((element: dataObj, i: number) => {
                    return <Grid item xs={12} sm={6} md={4} key={i + 202020202}>{element.logs}</Grid>;
                }));
                setAppear(true);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    const deleteLogHandler = () => {
        fetch('http://localhost:8080/api/deleteLogs/' + props.logName, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            props.setDeleted(data);
            console.log(data);
        })
        .catch(error => {
            console.log(error);
        })
    };
    const dateManager = () => {
        interface Month {
            [key: string]: string;
        }
        const regex = /(\d{4})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})-(\d{1,2})/;
        const dateInfo = props.logName.match(regex);
        if(dateInfo){
            const [_, year, month, day] = dateInfo;
            const date = new Date(`${year}-${month}-${day}`);
        }
    }
    return(
        <div className = 'rows'>
            <h3>Log Name: {props.logName}</h3>
            <h4>Created on: {} </h4>
            <Button style={{ marginBottom: '16px' }} variant="contained" color="primary" type="button" onClick={readLogHandler}>Read</Button>
            <Button style={{ marginBottom: '16px' }} variant="contained" color="primary" type="button" onClick={downloadLogHandler}>Download</Button>
            <Button style={{ marginBottom: '16px' }} variant="contained" color="primary" type="button" onClick={deleteLogHandler}>Delete</Button> 
            {appear === true && (
                <div className="popup"> 
                    <Grid container direction="row" sx={{}}>
                        <Grid item style={{ marginRight: '16px '}}>
                            <h4>Node Name</h4>
                            <Grid container direction="column" spacing={4} >
                                {name}
                            </Grid>
                        </Grid>
                        <Grid item style={{ marginRight: '32px ' }}>
                            <h4>Namespace</h4>
                            <Grid container direction="column" spacing={4}>
                                {namespace}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <h4>Log</h4>
                            <Grid container direction="column" spacing={4} sx={{whiteSpace: 'nowrap', overflow: 'auto', textOverflow: 'ellipsis',maxWidth: '1000px'}}>
                                {log}
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    )



}