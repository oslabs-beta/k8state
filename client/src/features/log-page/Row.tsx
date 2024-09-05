import type React from "react";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid, Typography, IconButton, Button } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Row (props: { logName: never,  setDeleted: React.Dispatch<React.SetStateAction<string>> }) {
    const [appear, setAppear] = useState(false);
    const [log, setLog] = useState('');
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
        fetch('http://localhost:8080/api/getLogs/' + props.logName, {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            setLog(data);
            setAppear(true);
        })
        .catch(error => {
            console.log(error);
        })
    };

    const deleteLogHandler = () => {
        fetch('http://localhost:8080/api/deleteLogs/' + props.logName, {
            method: 'GET',
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
    return(
        <div className = 'rows'>
            <div className = 'logName'>Log Name: {props.logName}</div>
            <Button variant="contained" color="primary" type="button" onClick={readLogHandler}>read</Button>
            <Button variant="contained" color="primary" type="button" onClick={downloadLogHandler}>Download</Button>
            <Button variant="contained" color="primary" type="button" onClick={deleteLogHandler}>Delete</Button> 
            {appear === true && (
                <div className="popup"> 
                    {log}
                    <Button variant="contained" color="primary" type="button" onClick={() => setAppear(false)}>X</Button> 
                </div>
            )}
            <hr></hr>
        </div>
    )
}