import React, {Component} from 'react';
import {useSearchParams} from "react-router-dom";


const WithSearchParams = (Component: any) => {
    return (props)=> <Component {...props} searchParams={useSearchParams()} />
};

export default WithSearchParams;