import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setInit, setAddress, setKey } from "./captivePortalSlice";
export default function ProtectedRoute(props) {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);
    const init = useAppSelector(state => state.portalSlice.init);
    //performs a fetch request to see if the environment file has been created. if the file exists and has a key or address, the information is assigned to global state and clusterui is rendered
    async function checkENVfileForCredentials() {
        const response = await fetch(`http://localhost:8080/api/checkenv`);
        const data = await response.json();
        if (data.address && data.key) {
            dispatch(setInit(true));
            dispatch(setKey(data.key));
            dispatch(setAddress(data.address));
        }
        setLoading(false);
    }
    checkENVfileForCredentials();
    if (loading) {
        return _jsx("div", { children: "Loading..." });
    }
    if (init === true) {
        return props.element;
    }
    else {
        return _jsx(Navigate, { to: "/portal" });
    }
}
