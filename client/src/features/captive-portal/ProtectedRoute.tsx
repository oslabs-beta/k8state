import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface prop {
    element: JSX.Element;
}
type Body = {
    key: string;
    address: string;
}
export default function ProtectedRoute (props: prop) {
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const init = useAppSelector((state) => state.portalSlice.init);
    useEffect(() => {
        fetch("http://localhost:8080/api/checkENV", {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            //setStatus(data.message.statusCode);
            //setLoading(false);
        })
    }, []);
    if(loading){
        return <div>Loading...</div>;
    }
    console.log(status);
    if(status === 'exist'){
        return <Navigate to="/portal" />;
    }
    else{
        return props.element
    }
};