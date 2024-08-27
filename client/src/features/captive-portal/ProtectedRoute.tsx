import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { portalSlice, setInit } from './captivePortalSlice';

interface prop {
    element: JSX.Element;
}
type Body = {
    key: string;
    address: string;
}
export default function ProtectedRoute (props: prop) {
    const dispatch = useAppDispatch()
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const init = useAppSelector((state) => state.portalSlice.init);
    useEffect(() => {
        fetch("http://localhost:8080/api/checkenv", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            //console.log(data);
            if(data.address && data.key){
                setStatus('exist');
            }
            setLoading(false);
        })
    }, []);
    if(loading){
        return <div>Loading...</div>;
    }
    //console.log(status);
    if(status === 'exist' || init === true){
        dispatch(setInit(true));
        return props.element
        
    }
    else{
        return <Navigate to="/portal" />;
    }
};