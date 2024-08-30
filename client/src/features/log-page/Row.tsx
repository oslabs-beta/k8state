import type React from "react";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Grid, Typography, IconButton, Button } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Row (props: { logName: never }) {
    return(
        <div className = 'rows'>
            <div className = 'fileName'>Log Name: {props.logName}</div>
            {/* <div className = 'uploadDate'>Upload Date: {props.list.upload_time}</div>
            <Button variant="contained" color="primary" type="button" onClick={downloadLogHandler}>Download</Button>
            <Button variant="contained" color="primary" type="button" onClick={deleteLogHandler}>Delete</Button> */}
            <hr></hr>
        </div>
    )
}