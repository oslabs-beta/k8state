import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAddress, setKey } from '../captive-portal/captivePortalSlice';
import { TextField, Button } from "@mui/material";
import { Route, Navigate } from 'react-router-dom';
import { useGetNodesQuery, useGetPodsQuery } from "../cluster-view/clusterViewApiSlice";

export default function CaptivePortal() {
    type Body = {
        key: string;
        address: string;
    }
    const dispatch = useAppDispatch()
    const [dest, setDest] = useState('');
    const [bearer, setBearer] = useState('');
    const [submit, setSubmit] = useState(false);
    const [error, setError] = useState('');

    const key = useAppSelector((state) => state.portalSlice.key);
    const address = useAppSelector((state) => state.portalSlice.address)
    ;
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // dispatch(setAddress(dest));
        // dispatch(setKey(bearer));
        fetch("http://localhost:8080/api/checkAPI", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data.message);
            if(data.message.statusCode === 200){
                setSubmit(true);
            }
            else{
                //setError(data.message);
                console.log(data);
            }
        })
    };

    if(submit === true){
        return <Navigate to="/clusterui"/>
    }
    return(
        <div id="captive-portal" className="portal">
            <form onSubmit={submitHandler}>
                {error && <p>{error}</p>}
                <TextField id="outlined-basic" label="IP Address or URL" variant="outlined" onChange={(input) => setDest(input.target.value)}/>
                <TextField id="outlined-basic" label="Bearer Token" variant="outlined" onChange={(input) => setBearer(input.target.value)}/>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
            
        </div>
    );
}