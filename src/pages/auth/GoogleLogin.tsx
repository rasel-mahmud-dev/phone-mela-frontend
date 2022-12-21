import React, {useEffect} from 'react';

import {Navigate, useLocation, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchCurrentAuth} from "actions/authAction";
import axios from "axios";
import {getApi} from "apis/api";
import {ActionTypes} from "actions/actionTypes";


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

            window.localStorage.setItem("token", token)

            getApi().get("/api/sign-current-user", {headers: {token}}).then(({data}) => {

                if (!data._id) {
                    return
                }

                const payload = {
                    username: data.username,
                    _id: data._id,
                    email: data.email,
                    role: data.role,
                    avatar: data.avatar
                }


                dispatch({
                    type: ActionTypes.LOGIN,
                    payload: payload
                })
                navigate("/")
            }).catch(ex => {
                navigate("/auth/login?callback=/", {state: {message: "Please try again"}})
            })

        } else {
            navigate("/auth/login?callback=/", {state: {message: message}})
        }

    }, [token, message])

    return null
};

export default GoogleLogin;