import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setInit, setAddress, setKey } from './captivePortalSlice';

interface prop {
    element: JSX.Element;
}

export default function ProtectedRoute (props: prop) {
    const dispatch = useAppDispatch()

    const [loading, setLoading] = useState(true);
    const init = useAppSelector((state) => state.portalSlice.init);
    fetch("http://localhost:8080/api/checkenv", {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {

        if(data.address && data.key){
            dispatch(setInit(true));
            dispatch(setKey(data.key));
            dispatch(setAddress(data.address));
        }
        setLoading(false);
    })
    if(loading){
        return <div>Loading...</div>;
    }

    if(init === true){
        return props.element
        
    }
    else{
        return <Navigate to="/portal" />;
    }
};