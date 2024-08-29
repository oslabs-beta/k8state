import type React from "react";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";

export default function LogPage () {
    useEffect(() => {
        fetch("http://localhost:8080/api/getLogs")
        .then(process => process.json())
        .then(data => {
            console.log(data);
        });
    }, []);
    const createLogHandler = () => {

    };
    return(
        <div>
            <Button variant="contained" color="primary" type="button" onClick={createLogHandler}>Submit</Button>
        </div>
    );
};