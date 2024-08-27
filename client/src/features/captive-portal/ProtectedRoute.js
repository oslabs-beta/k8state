import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
export default function ProtectedRoute(props) {
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
        });
    }, []);
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    console.log(status);
    if (status === 'exist') {
        return _jsx(Navigate, { to: "/portal" });
    }
    else {
        return props.element;
    }
}
;
