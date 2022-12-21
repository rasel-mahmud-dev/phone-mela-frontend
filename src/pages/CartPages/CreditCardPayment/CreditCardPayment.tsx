import React, {useContext, useEffect, useState} from 'react';

import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import OrderContext from "pages/CartPages/orderContext";
import {useSelector} from "react-redux";
import {RootStateType} from "store/index";
import {getApi} from "apis/api";
import Button from "UI/Button/Button";
import HttpResponse from "components/HttpResponse/HttpResponse";
import {useLocation, useNavigate} from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);


const StripeForm = ()=>{
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}


// payment steps
// install strip
// card load stripe
// card element
// stripe and element hook
// check card error and display error

function CheckoutForm() {

    const location = useLocation()
    const navigate = useNavigate()

    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    const [httpResponse, setHttpResponse] = useState({
        loading: false,
        message: "",
        isSuccess: true
    })


    const {
        state: { cartProducts, shippingAddress },
    } = useContext(OrderContext);

    const { auth } = useSelector((state: RootStateType) => state.auth);


    useEffect(() => {
        getApi()
            .post("/api/auth/create-payment-intent", {
                price: cartProducts.reduce((acc, curr)=>acc + curr.price, 0)
            })
            .then(({ data }) => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (event) => {

        setHttpResponse({message: "", loading: false, isSuccess: true})

        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            setHttpResponse({message: "Please try again", loading: false, isSuccess: false})
            return;
        }

        // Use elements.getElement to get a reference to the mounted Element.
        const cardElement = elements.getElement(CardElement);
        if (cardElement === null) {
            setHttpResponse({message: "missing card Element", loading: false, isSuccess: false})
            return;
        }

        if (!clientSecret) {
            setHttpResponse({message: "missing payment intendes client secret", loading: false, isSuccess: false})
            return;
        }


        setHttpResponse({message: "", loading: true, isSuccess: true})


        const result = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (result.error) {
            if(result.error.message){
                setHttpResponse({message: result.error.message, loading: false, isSuccess: false})
            } else {
                setHttpResponse({message: "Please try again", loading: false, isSuccess: false})
            }
            return;
        }

        let { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    email: auth.email,
                    address: shippingAddress.address,
                    name: shippingAddress.firstName + " " + shippingAddress.lastName
                },
            },
        });

        if (error) {
            return;
        }

        if (paymentIntent.status === "succeeded") {
            // store payment info in the database
            const payment = {
                totalPrice: cartProducts.reduce((acc, curr)=>acc + curr.price, 0),
                transactionId: paymentIntent.id,
                email: auth.email,
                name: shippingAddress.firstName + " " + shippingAddress.lastName,
                customer_id: auth._id,
            };

            // send request for creating order and transaction record
            getApi().post("/api/order", {
                ...payment,
                quantity: cartProducts.length,
                products: cartProducts

            }).then((res) => {
                if (res.status === 201) {
                    setTimeout(()=>{
                        setHttpResponse({message: "Your payment Payment has been created", loading: false, isSuccess: true})
                        navigate("/order/completed", {state: { orderId: res.data._id }})
                    }, 300)
                }
            }).catch(ex=>{

                    setTimeout(()=>{
                        setHttpResponse({message: ex.message, loading: false, isSuccess: false})
                    }, 200)

            }).finally(()=>{
                setHttpResponse({message: "", loading: false, isSuccess: true})
            })
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit} className=" w-full mx-auto rounded-lg bg-primary-50/10 px-4 py-5">
            <CardElement
                options={{
                    iconStyle: "solid",
                    style: {
                        base: {
                            iconColor: "#2c65ec",
                            color: "#3b3b3b",
                            fontSize: "16px",
                        },
                        invalid: {
                            iconColor: "#ff4e85",
                            color: "#ff4e85",
                        },
                    },
                }}
                className="w-full"
            />
            <Button
                className="bg-primary-500 text-white mt-10 "
                disabled={!(clientSecret && stripe && elements)}
            >
                Pay Now and Order
            </Button>
        </form>

            <HttpResponse onClose={()=> httpResponse.message && setHttpResponse(p=>({...p, message: "", loading: false})) } {...httpResponse} loadingTitle={"Payment Processing"} />

        </div>
    );
}
export default StripeForm