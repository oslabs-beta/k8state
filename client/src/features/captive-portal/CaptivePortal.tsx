import type React from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAddress, setKey } from './captivePortalSlice';
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

        fetch("http://localhost:8080/api/checkAPI", {
            method: 'POST',
            body: JSON.stringify({
                key: bearer,
                address: dest
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.message !== 'ok'){
                setError(JSON.stringify(data));
            }
            else{
                setSubmit(true);
                dispatch(setAddress(dest));
                dispatch(setKey(bearer));
            }
        })
    };
    // //rerenders when error changes
    // useEffect(() => {
    //     console.log(error);
    // }, [error])
    if(submit === true){
        return <Navigate to="/clusterui"/>
    }
    return(
        <div id="captive-portal" className="portal">
            {error && <p>{error}</p>}
            <form onSubmit={submitHandler}>   
                <TextField id="outlined-basic" label="IP Address or URL" variant="outlined" onChange={(input) => setDest(input.target.value)}/>
                <TextField id="outlined-basic" label="Bearer Token" variant="outlined" onChange={(input) => setBearer(input.target.value)}/>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
            
        </div>
    );
}