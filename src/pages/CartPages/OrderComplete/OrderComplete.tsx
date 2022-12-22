import React, {useEffect, useState} from 'react';
import Button from "UI/Button/Button";
import {getApi} from "apis/api";
import {useLocation} from "react-router-dom";
import Avatar from "components/Avatar/Avatar";
import {ActionTypes} from "../../../store/actions/actionTypes";
import {useDispatch} from "react-redux";

const OrderComplete = () => {
    const [orderDetail, setOrderDetail] = useState(null)
    const location: any = useLocation()
    const orderId = location.state?.orderId
    const dispatch = useDispatch()

    useEffect(() => {

        if (orderId) {
            getApi().get("/api/order/" + orderId).then(({data, status}) => {
                setOrderDetail(data)

                localStorage.removeItem("checkout")
                dispatch({
                    type: ActionTypes.SET_CHECKOUT_PRODUCTS,
                    payload: {
                        shippingAddress: null,
                        products: []
                    }
                })

            })
        }

    }, [orderId])

    function renderAddress(recentShipAddr) {
        return <h4 className="mb-0 text-sm">Address:
            <span
                className="ml-1"> {recentShipAddr.address} {recentShipAddr.post_code} {recentShipAddr.city} {recentShipAddr.state} {recentShipAddr.country}</span>
        </h4>
    }


    return (
        <div className="relative">
            <h1 className="page-title">Order Completed</h1>
            <p className="mt-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci autem corporis culpa cupiditate deleniti
                deserunt dolore dolorum, eius eos et excepturi fugiat fugit impedit incidunt iure labore magnam neque nisi non nostrum
                officia officiis omnis, perferendis placeat possimus quas quibusdam quis quos rerum saepe sit tenetur, velit. Aliquam autem
                hic nemo nesciunt nobis obcaecati quos repudiandae saepe temporibus vero! Adipisci aliquid blanditiis consequuntur dolor
                eius enim explicabo in ipsa nemo nesciunt officiis perspiciatis quo rem repellendus soluta, unde vel veritatis vero
                voluptatem voluptates? A alias beatae consequatur distinctio dolor dolorem eaque, eius impedit ipsa minima quasi qui veniam?
                Neque?
            </p>

            {orderDetail && (
                <div className="mt-6 border-b">
                    <h1 className="text-lg font-medium mb-4">Order ID #{orderDetail?.orderId}</h1>

                    <h4  className="mb-3">Items</h4>
                    { orderDetail?.products?.map(item=>(
                        <div className="border-b pb-2 mb-2">
                            <Avatar className="w-8" imgClass="rounded-none" src={item.cover} />
                            <p>{item.title}</p>
                        </div>
                    )) }


                    <div className="">

                        <div className="min-w-[150px]">
                            <h1 className="text-xl font-medium mt-4">Payment</h1>
                            <div className="mt-2">
                                <h2 className="font-normal text-dark-300 text-sm">Payment Method: {orderDetail.payment_method}</h2>
                            </div>
                            <div className="mt-2">
                                <h2 className="font-normal text-dark-300 text-sm">Transaction No: {orderDetail?.transactionId}</h2>
                            </div>
                        </div>

                        <div>

                            <h1 className="text-xl font-medium mt-4">Delivery Address</h1>
                            <div className="mt-2">
                                <h2 className="font-normal text-dark-600 text-[15px]"></h2>
                                <div className="font-normal text-dark-300 text-sm mt-2">
                                    <p>{orderDetail?.shipping_id && renderAddress(orderDetail.shipping_id)}</p>
                                    <h4 className="mt-1">Email: {orderDetail?.shipping_id?.email}</h4>
                                    <h4 className="mt-1">Phone: {orderDetail?.shipping_id?.phone}</h4>
                                </div>
                            </div>

                        </div>

                    </div>

                    <h1 className="text-xl mt-8 font-medium">Total Price: {orderDetail?.price}</h1>

                </div>
            )}


            <Button className="btn-primary my-8">Download Invoice</Button>

        </div>
    );
};

export default OrderComplete;