import React, {ChangeEvent, useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import Input2 from "UI/Form/Input/Input2";
import { RootStateType } from "store/index";
import { useNavigate } from "react-router-dom";
import api from "apis/api";

import OrderSummary from "pages/CartPages/orderSummary/OrderSummary";

import "./styles.scss";

import StripeForm from "pages/CartPages/CreditCardPayment/CreditCardPayment";
import Button from "UI/Button/Button";
import useRestoreCheckoutData from "hooks/useRestoreCheckoutData";
import HttpResponse from "components/HttpResponse/HttpResponse";

const PaymentPage = (props: any) => {


    const navigator = useNavigate();
    const navigate = useNavigate();

    const {
        auth: { auth },
        productState,
        tools,
    } = useSelector((state: RootStateType) => state);


    // this hook restore checkout data if page reloaded
    useRestoreCheckoutData()


    const [paymentMethod, setPaymentMethod] = React.useState("cash-on-delivery");
    const [paymentInfoOk, setPaymentInfoOk] = React.useState(false);
    const [httpResponse, setHttpResponse] = useState({
        loading: false,
        message: "",
        isSuccess: true
    })


    const [paymentInformation, setPaymentInformation] = React.useState({
        bkash_number: "",
        nagod_number: "",
        card_number: "",
        card_cvc: "",
        card_dd: "",
        card_mm: "",
        amount: "",
    });

    function handleChangePaymentInformation(e: ChangeEvent<HTMLInputElement>) {
        let updatedPaymentInformation = { ...paymentInformation };
        updatedPaymentInformation[e.target.name] = e.target.value;

        if (paymentMethod === "bkash") {
            if (paymentInformation.bkash_number.trim()) {
                setPaymentInfoOk(true);
            } else {
                setPaymentInfoOk(false);
            }
        } else if (paymentMethod === "nagod") {
            if (paymentInformation.nagod_number.trim()) {
                setPaymentInfoOk(true);
            } else {
                setPaymentInfoOk(false);
            }
        } else if (paymentMethod === "card") {
            if (
                paymentInformation.card_number.trim() &&
                paymentInformation.card_cvc.trim() &&
                paymentInformation.card_mm.trim() &&
                paymentInformation.card_dd.trim()
            ) {
                setPaymentInfoOk(true);
            } else {
                setPaymentInfoOk(false);
            }
        }
        setPaymentInformation(updatedPaymentInformation);
    }

    const allPay = [
        { name: "Cash on Delivery", value: "cash-on-delivery", render: () => renderCashOnDeliveryMedium() },
        { name: "Nagod", value: "nagod", render: () => renderPayMedium() },
        { name: "bkash", value: "bkash", render: () => renderPayMedium() },
        { name: "Credit Card", value: "credit-card", render: () => renderPayCardMedium() },
    ];

    function renderCashOnDeliveryMedium() {
        return (
            <div>
                <h1>Cash on Delivery</h1>
                <p>

                    Cash on delivery (COD) is a type of transaction where the recipient pays for a good at the time of delivery rather than using credit. The terms and accepted forms of payment vary according to the payment provisions of the purchase agreement.
                    Cash on delivery is also referred to as collect on delivery since delivery may allow for cash,
                    check, or electronic payment.
                </p>
            </div>
        );
    }

    function renderPayMedium() {
        return (
            <div>
                <h1>{paymentMethod.toUpperCase()}</h1>
                <div>
                    <Input2
                        type="number"
                        onChange={handleChangePaymentInformation}
                        value={
                            paymentMethod === "bkash" ? "bkash_number" : paymentMethod === "nagod" ? "nagod_number" : ""
                        }
                        label={
                            paymentMethod === "bkash" ? "Bkash Number" : paymentMethod === "nagod" ? "Nagod Number" : ""
                        }
                        name={
                            paymentMethod === "bkash" ? "bkash_number" : paymentMethod === "nagod" ? "nagod_number" : ""
                        }
                    />
                    <Input2
                        type="number"
                        value={paymentInformation.amount}
                        onChange={handleChangePaymentInformation}
                        label="Amount"
                        name="amount"
                    />
                    {/*<button className="bg-primary-400 px-4 text-white" onClick={handlePay}>Pay</button>*/}
                </div>
            </div>
        );
    }

    function renderPayCardMedium() {


        return (
            <div>
               <StripeForm />
            </div>
        );
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.value === "cash-on-delivery") {
            setPaymentInfoOk(true);
        } else {
            setPaymentInfoOk(false);
        }
        setPaymentMethod(e.target.value);
    }



    function handlePushBack() {
        // history.back()
        navigator(-1);
    }



    function handleCreateOrder(data: any) {

        setHttpResponse({message: "", loading: true, isSuccess: true})

        if(!productState.checkout.shippingAddress || !productState.checkout.shippingAddress._id){
            return setHttpResponse({message: "Please Select a shipping address", loading: false, isSuccess: false})
        }


        const { shippingAddress, products } = productState.checkout;

        let day = 1000 * 60 * 60 * 24;

        let payload = {
            shipping_id: shippingAddress._id,
            shipper_id: "62a6f01b44242ee481ada7df",
            delivery_date: new Date(Date.now() + day * 10).toString(),
            payment_method: paymentMethod,
            bkash_number: "",
            nagod_number: ""
        };

        if (paymentMethod === "cash-on-delivery") {
            delete payload.bkash_number;
            delete payload.nagod_number;
        }

        let orderPayload: any = {
            ...payload,
            quantity: productState.checkout?.products.length,
            totalPrice: productState.checkout?.products.reduce((acc, curr)=>acc + curr.price, 0),
            transactionId: "",
            payment_method: "cash-on-delivery",
            products: productState.checkout.products,
            name: productState.checkout.shippingAddress.firstName + " " + productState.checkout.shippingAddress.lastName,
        }
        if(productState.checkout?.products.length === 1) {
            orderPayload.product_id = productState.checkout?.products[0]._id
        }

        api.post("/api/order", {
            ...orderPayload,
        }).then((res) => {
        if (res.status === 201) {
            setTimeout(()=>{
                setHttpResponse({message: "Your Order successfully placed.", loading: false, isSuccess: true})
                navigate("/order/completed", {state: { orderId: res.data.orderId }})
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

    function renderPaymentMedium() {
        let pay = null;
        if (paymentMethod !== "") {

        }
        pay = allPay.find((p: any) => p.value === paymentMethod);

        return pay && pay.render()
    }

    return (
        <div className="relative">

            <HttpResponse onClose={()=> httpResponse.message && setHttpResponse(p=>({...p, message: "", loading: false})) }
                          {...httpResponse} loadingTitle={"Order Processing"} />


            <h1 className="page-title">Payment</h1>

            <div className="flex justify-between flex-col sm:flex-row ">
                <div className="flex-1">
                    <div className="all-payment-method">
                        <h4 className="mb-2">Choose Payment Method</h4>

                        {allPay.map((pay) => (
                            <div className={`pay ${pay.value}`}>
                                <input
                                    onChange={handleChange}
                                    type="radio"
                                    id={pay.value}
                                    value={pay.value}
                                    name="payment_method"
                                />
                                <label className="ml-1" htmlFor={pay.value}>
                                    {pay.name}
                                </label>
                            </div>
                        ))}
                    </div>
                    <div className="mb-8 mt-4">{renderPaymentMedium()}</div>
                </div>

                <div className="flex-4 ml-4">

                        <OrderSummary
                            checkout={productState.checkout}
                            shippingAddress={productState.checkout.shippingAddress}
                            nextLevel={
                                <div className="mt-5">
                                    <Button
                                        onClick={handleCreateOrder}
                                        disabled={!paymentInfoOk}
                                        className={`w-full justify-center flex-nowrap font-normal btn btn-primary flex items-center px-4 py-1 bg-primary-400`}
                                    >
                                        {paymentMethod !== "cash-on-delivery" ? "Pay And Order" : "Order"}
                                    </Button>
                                </div>
                            }
                        />

                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
