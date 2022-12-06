import { loadStripe } from "@stripe/stripe-js";
import { CardElement, Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import api, { baseUri, getApi } from "apis/api";
import Button from "UI/Button/Button";
import { useContext, useEffect, useState } from "react";
import orderContext from "pages/CartPages/orderContext";
import OrderContext from "pages/CartPages/orderContext";
import { RootStateType } from "store/index";
import { useSelector } from "react-redux";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

function StripeForm({ children }) {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

export default StripeForm;

// payment steps
// install strip
// card load stripe
// card element
// stripe and element hook
// check card error and display error

function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    const {
        state: { cartProducts, shippingAddress },
    } = useContext(OrderContext);

    const { auth } = useSelector((state: RootStateType) => state.auth);

    console.log(shippingAddress)

    useEffect(() => {
        getApi()
            .post("/api/auth/create-payment-intent", {
                price: cartProducts.reduce((acc, curr)=>acc + curr.price, 0)
            })
            .then(({ data }) => setClientSecret(data.clientSecret));
    }, []);

    const handleSubmit = async (event) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // Use elements.getElement to get a reference to the mounted Element.
        const cardElement = elements.getElement(CardElement);
        if (cardElement === null) {
            alert("missing card Element");
            return;
        }

        if (!clientSecret) {
            alert("missing payment intendes client secret  ");
            return;
        }

        const result = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (result.error) {
            console.log(result.error);
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
            console.log(error);
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
                    alert("Order Created");
                }
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" w-full mx-auto rounded-lg bg-primary-50/10 px-6 py-3">
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
                type="submit"
                disabled={!(clientSecret && stripe && elements)}
            >
                Pay
            </Button>
        </form>
    );
}
