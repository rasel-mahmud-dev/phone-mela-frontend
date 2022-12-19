import React, {useEffect} from 'react';

import {Navigate, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";


const GoogleLogin = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    // const queryString = qs.parse(location.search)


    const [searchParams] = useSearchParams()

    let token = searchParams.get("token")
    let message = searchParams.get("message")



    useEffect(function () {
        if (token && token !== "") {
            localStorage.setItem("token", token)
            // fetchCurrentAuth(dispatch)
        } else {
            navigate("/auth/login?callback=/", {state: { message: message}})
        }

    }, [token, message])

    return null
};

export default GoogleLogin;