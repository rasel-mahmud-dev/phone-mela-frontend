import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import Input2 from "src/components/UI/Form/Input/Input2";
import Preload from "UI/Preload/Preload";
import {login} from "src/store/actions/authAction";
import Loader from "src/components/UI/Loader/Loader";
import Helmet from "react-helmet";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import Button from "UI/Button/Button";
import api, {baseUri} from "apis/api";
import HttpResponse from "components/HttpResponse/HttpResponse";
import {loading} from "actions/productAction";

interface CustomLocation extends Location {
    state?: { from?: string, message?: string }
}

const LoginPage = (props) => {
    const [state, setState] = useState({
        email: {value: "test-user@gmail.com", touched: false, errorMessage: ""},
        password: {value: "123", touched: false, errorMessage: ""},
    });

    const [loadingState, setLoadingState] = useState({
        loading: false,
        message: "",
        isSuccess: true
    })


    const navigate = useNavigate();


    const location = useLocation() as unknown as CustomLocation

    const [message, setMessage] = React.useState("");
    const [fetchLoading, setFetchLoading] = React.useState(false);


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
                value: value,
            },
        });
    }

    function handleLogin(e) {
        e.preventDefault();

        setLoadingState({message: "", loading: false, isSuccess: true})
        let updateState = {...state}
        let isComplete = true;
        let body = {};
        for (let key in updateState) {
            if (!updateState[key].value) {
                updateState[key] = {
                    ...updateState[key],
                    errorMessage: "required"
                }
                isComplete = false
            } else {
                body[key] = updateState[key].value
            }
        }

        if (!isComplete) {
            return setState(updateState)
        }

        setLoadingState(p => ({...p, loading: true,message: ""}))
        props.login(body, (err, result) => {
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
        <div className="">
            <div className="px-4">
                <Helmet>
                    <link rel="canonical" href={`https://phone-mela.vercel.app/#/auth/login`}/>
                    <title>Login to phone-mela.vercel.app</title>
                </Helmet>

                <div className="max-w-md mx-auto px-4  bg-light-900 py-10 my-10 rounded-lg shadow-1">
                    <h1 className="text-center text-3xl font-semibold">Login Form</h1>

                    <HttpResponse

                        onClose={()=>loadingState.message && setLoadingState(prevState => ({...prevState, message: ""}))}
                        {...loadingState} loadingTitle="Please wait you are logged..."/>


                    <form onSubmit={handleLogin} className="mt-10">
                        <Input2
                            className="mb-10"
                            name="email"
                            label="Enter Email"
                            value={state.email.value}
                            error={state.email.errorMessage}
                            onChange={handleChange}
                        />
                        <Input2
                            name="password"
                            label="Enter Password"
                            value={state.password.value}
                            error={state.password.errorMessage}
                            onChange={handleChange}
                        />
                        <Button
                            className={`mt-5 text-white !w-full !ml-0 ${
                                fetchLoading ? "bg-primary-400 pointer-events-none" : "bg-primary-400"
                            }`}
                        >
                            Login
                        </Button>
                    </form>
                    <p className="mt-4 text-sm font-normal ">
                        Not an Account ? Sign Up
                        <Preload className="text-primary-400 ml-1 font-medium" to="/auth/signup">
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
        </div>
    );
};

LoginPage.load = "name";

export default connect(null, {login})(LoginPage);
