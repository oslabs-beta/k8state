import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
export default function ProtectedRoute(props) {
    const key = useAppSelector((state) => state.portalSlice.key);
    const address = useAppSelector((state) => state.portalSlice.address);
    console.log(key, address);
    if (key === '' || address === '') {
        return _jsx(Navigate, { to: "/portal" });
    }
    else {
        return props.element;
    }
}
;
