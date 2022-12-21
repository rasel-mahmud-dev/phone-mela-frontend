import React, {useEffect, useState} from 'react';
import Button from "UI/Button/Button";
import {getApi} from "apis/api";

const OrderComplete = () => {

    const [orderDetail, setOrderDetail] = useState(null)

    useEffect(()=>{

        getApi().get("/api/order/223423").then(({data, status})=>{
            setOrderDetail(data)
        })

    }, [])


    return (
        <div className="relative">
            <h1 className="page-title">Order Completed</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci autem corporis culpa cupiditate deleniti deserunt dolore dolorum, eius eos et excepturi fugiat fugit impedit incidunt iure labore magnam neque nisi non nostrum officia officiis omnis, perferendis placeat possimus quas quibusdam quis quos rerum saepe sit tenetur, velit. Aliquam autem hic nemo nesciunt nobis obcaecati quos repudiandae saepe temporibus vero! Adipisci aliquid blanditiis consequuntur dolor eius enim explicabo in ipsa nemo nesciunt officiis perspiciatis quo rem repellendus soluta, unde vel veritatis vero voluptatem voluptates? A alias beatae consequatur distinctio dolor dolorem eaque, eius impedit ipsa minima quasi qui veniam? Neque?
            </p>

            {orderDetail && (
                <div>
                    <h1>Order Id {orderDetail?.orderId}</h1>
                </div>
            )}


            <Button className="btn-primary">Download Invoice</Button>

        </div>
    );
};

export default OrderComplete;