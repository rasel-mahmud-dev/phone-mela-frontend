import React, {ChangeEvent, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Input2 from "UI/Form/Input/Input2";
import { RootStateType } from "store/index";
import { useNavigate } from "react-router-dom";
import api from "apis/api";
import OrderContext from "pages/CartPages/orderContext";
import OrderSummary from "pages/CartPages/orderSummary/OrderSummary";


import "./styles.scss";
import { CartProductType } from "reducers/productReducer";
import StripeForm from "pages/CartPages/CreditCardPayment/CreditCardPayment";
import Button from "UI/Button/Button";

const PaymentPage = (props: any) => {
    const orderContext = React.useContext(OrderContext);

    const navigator = useNavigate();
    const dispatch = useDispatch();

    const {
        auth: { auth },
        productState,
        tools,
    } = useSelector((state: RootStateType) => state);

    const [paymentMethod, setPaymentMethod] = React.useState("");
    const [paymentInfoOk, setPaymentInfoOk] = React.useState(false);
    const orderState = React.useContext(OrderContext);

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
                <p>Prepare Money, when shipper reach your home </p>
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

    useEffect(() => {
        if (!orderState.state) {
            navigator("/order/checkout");
        }
    }, [orderState.state]);

    function handlePushBack() {
        // history.back()
        navigator(-1);
    }

    function handleProductAction() {}

    function handlePay() {
        api.post("/api/pay", { total: 300 })
            .then((doc) => {
                console.log(doc);
            })
            .catch((ex) => {
                console.log(ex);
            });
    }

    function handleCreateOrder(data: any) {
        const { product_id, customer_id, shipper_id, price, quantity, delivery_date } = data;

        const { shippingAddress, cartProducts } = orderContext.state;

        let day = 1000 * 60 * 60 * 24;

        let payload = {
            product_id: 0,
            price: 0,
            quantity: 0,
            customer_id: auth._id,
            shipping_id: shippingAddress._id,
            shipper_id: "62a6f01b44242ee481ada7df",
            delivery_date: new Date(Date.now() + day * 10).toString(),
            payment_method: paymentMethod,
            bkash_number: "",
            nagod_number: "",
            card_number: "",
            card_cvc: "",
            card_dd: "",
            card_mm: "",
        };

        if (paymentMethod === "cash-on-delivery") {
            delete payload.card_number;
            delete payload.card_cvc;
            delete payload.card_dd;
            delete payload.card_mm;
            delete payload.bkash_number;
            delete payload.nagod_number;
        }

        cartProducts.forEach((cart: CartProductType) => {
            api.post("/api/order", {
                ...payload,
                price: cart.quantity * cart.price,
                quantity: cart.quantity,
                product_id: cart.product_id,
            }).then((res) => {
                if (res.status === 201) {
                    alert("Order Created");
                    navigator("/");
                }
            });
        });
    }

    function renderPaymentMedium() {
        let pay = null;
        if (paymentMethod !== "") {
        }
        pay = allPay.find((p: any) => p.value === paymentMethod);

        return pay ? pay.render() : "";
    }

    return (
        <div className="relative">
            {/*<Backdrop bg="#2020208f" onCloseBackdrop={()=>dispatch({type: ActionTypes.TOGGLE_BACKDROP})} as={"contentMask"} isOpenBackdrop={tools.isShowBackdrop}/>*/}

            {/*<div className="content-mask"></div>*/}

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
