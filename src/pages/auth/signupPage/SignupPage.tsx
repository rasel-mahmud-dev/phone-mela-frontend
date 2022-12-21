import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {register} from "src/store/actions/authAction";

import Input2 from "UI/Form/Input/Input2";
import Preload from "UI/Preload/Preload";
import Button from "UI/Button/Button";
import {useLocation, useNavigate} from "react-router-dom";
import HttpResponse from "components/HttpResponse/HttpResponse";
import {baseUri} from "apis/api";


interface CustomLocation extends Location {
    state?: { from?: string, message?: string }
}


const signupPage = (props) => {
    const [state, setState] = React.useState({
        firstName: {value: "rasel", touched: false, errorMessage: ""},
        lastName: {value: "mahmud", touched: false, errorMessage: ""},
        email: {value: "rasel@gmail.com", touched: false, errorMessage: ""},
        password: {value: "123", touched: false, errorMessage: ""},
    });


    const navigate = useNavigate();

    const location = useLocation() as unknown as CustomLocation


    const [loadingState, setLoadingState] = useState({
        loading: false,
        message: "",
        isSuccess: true
    })

    useEffect(() => {
        if (location.state?.message) {
            setLoadingState({message: location.state.message, loading: false, isSuccess: true})
            history.replaceState("", "")
        }

        return () => {
            history.replaceState("", "")
        }

    }, [location?.state?.message])


    function handleChange({target: {name, value, type}}) {
        setState({
            ...state,
            [name]: {
                ...state[name],
                errorMessage: "",
                value: value,
            },
        });
    }

    function handleSignup(e) {

        setLoadingState({message: "", loading: false, isSuccess: true})

        let updateState = {...state}

        e.preventDefault();
        let isComplete = true;

        let body: any = {};
        const {lastName, ...other} = state;
        for (let key in other) {
            if(!updateState[key].value) {
                updateState[key] = {
                    ...updateState[key],
                    errorMessage: "required"
                }
                isComplete = false
            }else {
                body[key] = updateState[key].value
            }
        }
        body.lastName = lastName.value

        if (!isComplete) {
            return setState(updateState)
        }

        setLoadingState(p => ({...p, loading: true,message: ""}))

        props.register(body, (err) => {
            if (!err) {
                setLoadingState(p => ({...p, loading: false, message: ""}))
                let redirectPath = location?.state?.from || "/"
                navigate(redirectPath, {replace: true});
            } else {
                setLoadingState(p => ({...p, loading: false, message: ""}))
                setTimeout(()=>{
                    setLoadingState(p => ({...p, loading: false, message: err}))
                }, 300)
            }
        });
    }


    function clearOldToken() {
        window.localStorage.removeItem("token")
    }

    return (
        <div className="container-1200 px-4 pt-4 ">
            <div className="max-w-md mx-auto px-4 pb-4  bg-light-900 pt-10 rounded-lg shadow-1">

                <h1 className="text-center text-2xl">Create an Account</h1>

                <HttpResponse {...loadingState}
                              onClose={()=>loadingState.message && setLoadingState(prevState => ({...prevState, loading: false, message: ""}))}
                              loadingTitle="Please wait you are Registered..."/>


                <form onSubmit={handleSignup}>
                    <Input2
                        name="firstName"
                        label="FirstName"
                        value={state.firstName.value}
                        error={state.firstName.errorMessage}
                        onChange={handleChange}
                        className="mb-14"
                    />
                    <Input2
                        name="lastName"
                        label="LastName"
                        value={state.lastName.value}
                        error={state.lastName.errorMessage}
                        onChange={handleChange}
                        className="mb-14"
                    />
                    <Input2
                        label="Enter Email"
                        name="email"
                        value={state.email.value}
                        error={state.email.errorMessage}
                        onChange={handleChange}
                        className="mb-14"
                    />
                    <Input2
                        name="password"
                        label="Enter Password"
                        value={state.password.value}
                        error={state.password.errorMessage}
                        onChange={handleChange}
                    />
                    <Button
                        className={`mt-5 text-white !w-full !ml-0 bg-primary-400`}
                    >
                        Signup
                    </Button>
                </form>
                <p className="mt-4 text-sm font-normal">
                    Already exist an account ? Sign In
                    <Preload className="text-primary-400 ml-1 font-medium" to="/auth/login">
                        here
                    </Preload>
                </p>

                <a onClick={clearOldToken} href={`${baseUri}/api/auth/google`}>

                    <Button className="bg-red-200 text-white w-full mt-4">
                        Login with Google
                    </Button>

                </a>


            </div>
        </div>
    );
};

export default connect(null, {register})(signupPage);
