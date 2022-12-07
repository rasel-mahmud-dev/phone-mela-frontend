import React from 'react'


import {useDispatch, useSelector} from "react-redux"

import "./Orders.scss"

import {RootStateType} from "store/index";
import Table from "UI/Table/Table";
import fullLink from "src/utils/fullLink";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import {fetchOrders} from "actions/productAction";
import useScrollTop from "hooks/useScrollTop";


const Orders = (props) => {

    const {auth: {auth}, productState: {orders}} = useSelector((state: RootStateType) => state)

    const dispatch = useDispatch()

    useScrollTop()


    React.useEffect(() => {
        fetchOrders(dispatch).then(r => {

        }).catch(ex => {

        })
    }, [])



    let columns = [
        {
            title: "Image",
            key: "1",
            dataIndex: "product_id",
            render: (product_id: any) => <div style={{width: "40px"}}>
                <img className="w-full"
                     src={fullLink(product_id.cover)}/></div>
        },
        {
            title: "Order ID",
            key: "1122",
            dataIndex: "_id"
        },
        {
            title: "Product Name",
            key: "1",
            dataIndex: "product_id",
            width: 200,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.product_id.title.toLowerCase() > b.product_id.title.toLowerCase()) {
                        return 1
                    } else if (a.product_id.title.toLowerCase() < b.product_id.title.toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
                }
            },
            render: (product_id: any) => {
                return product_id.title
            }
        },
        {
            title: "Created At",
            key: "3",
            dataIndex: "createdAt",
            width: 150,
            render: (text: string) => new Date(text).toDateString(),
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.createdAt > b.createdAt) {
                        return 1
                    } else if (a.createdAt < b.createdAt) {
                        return -1
                    } else {
                        return 0
                    }
                }
            },
        },
        {
            title: "Price",
            key: "3",
            dataIndex: "price",
            width: 150,
            render: (price: number) => "TK. " + price,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.price > b.price) {
                        return 1
                    } else if (a.price < b.price) {
                        return -1
                    } else {
                        return 0
                    }
                }
            },
        }
    ]


    return (
        <div className="my-4">

            <WithSidebarButton>
                <h1 className="page-title">My Orders</h1>
            </WithSidebarButton>

            <div className="mt-5">

                {orders && orders.length > 0 ? (
                    <div className="card overflow-hidden mt-4">
                        <div className="overflow-x-auto">

                            <Table dataSource={orders} columns={columns} fixedHeader={true} scroll={{y: '80vh'}}/>

                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>No Order found.</h3>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Orders