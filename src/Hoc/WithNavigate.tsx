import React from 'react';
import {useNavigate} from "react-router-dom";

const WithNavigate = (Component: React.FC) => {
    return (props)=> (
        <Component {...props} navigate={useNavigate()} />
    );
};

export default WithNavigate;