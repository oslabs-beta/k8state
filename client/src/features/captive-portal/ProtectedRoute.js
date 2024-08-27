import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setInit } from './captivePortalSlice';
export default function ProtectedRoute(props) {
    const dispatch = useAppDispatch();
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
            if (data.address && data.key) {
                setStatus('exist');
            }
            setLoading(false);
        });
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    //console.log(status);
    if (status === 'exist' || init === true) {
        dispatch(setInit(true));
        return props.element;
    }
    else {
        return _jsx(Navigate, { to: "/portal" });
    }
}
;
