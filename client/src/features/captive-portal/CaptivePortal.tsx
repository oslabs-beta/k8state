import React, { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setAddress, setKey } from '../captive-portal/captivePortalSlice';
import { TextField, Button } from "@mui/material"
import { Route, Navigate } from 'react-router-dom';

export default function CaptivePortal() {
    const dispatch = useAppDispatch()
    const [dest, setDest] = useState('');
    const [bearer, setBearer] = useState('');
    const [submit, setSubmit] = useState(false);

    const key = useAppSelector((state) => state.portalSlice.key);
    const address = useAppSelector((state) => state.portalSlice.address);
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setAddress(dest));
        dispatch(setKey(bearer));
        setSubmit(true);
    };
    // useEffect(()=>{
    //     //testing
    //     console.log('Key is ' + key);
    //     console.log('Address is ' + address);
    // }, [key, address])
    if(submit === true){
        return <Navigate to="/clusterui"/>
    }
    return(
        <div id="captive-portal" className="portal">
            <form onSubmit={submitHandler}>
                <TextField id="outlined-basic" label="IP Address or URL" variant="outlined" onChange={(input) => setDest(input.target.value)}/>
                <TextField id="outlined-basic" label="Bearer Token" variant="outlined" onChange={(input) => setBearer(input.target.value)}/>
                <Button variant="contained" color="primary" type="submit">Submit</Button>
            </form>
            
        </div>
    );
}