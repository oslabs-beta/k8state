import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setInit, setAddress, setKey } from './captivePortalSlice';
export default function ProtectedRoute(props) {
    const dispatch = useAppDispatch();
    //const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);
    const init = useAppSelector((state) => state.portalSlice.init);
    fetch("http://localhost:8080/api/checkenv", {
        method: 'GET',
    })
        .then(response => response.json())
        .then(data => {
        //console.log(data);
        if (data.address && data.key) {
            dispatch(setInit(true));
            dispatch(setKey(data.key));
            dispatch(setAddress(data.address));
        }
        setLoading(false);
    });
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    //console.log(status);
    if (init === true) {
        return props.element;
    }
    else {
        return _jsx(Navigate, { to: "/portal" });
    }
}
;
