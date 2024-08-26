import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

interface prop {
    element: JSX.Element;
}

export default function ProtectedRoute (props: prop) {
    const key = useAppSelector((state) => state.portalSlice.key);
    const address = useAppSelector((state) => state.portalSlice.address);
    console.log(key, address);
    if(key === '' || address === ''){
        return <Navigate to="/portal" />;
    }
    else{
        return props.element
    }
};