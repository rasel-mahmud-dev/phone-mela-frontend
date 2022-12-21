import React from 'react'


import {useDispatch, useSelector} from "react-redux"

import {RootStateType} from "store/index";
import Table from "UI/Table/Table";
import fullLink from "src/utils/fullLink";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import {fetchTransactions} from "actions/productAction";
import useScrollTop from "hooks/useScrollTop";


const Transactions = (props) => {

    const {auth: {auth}, productState: {transactions}} = useSelector((state: RootStateType) => state)

    const dispatch = useDispatch()

    useScrollTop()


    React.useEffect(() => {
        fetchTransactions(dispatch).then(r => {

        }).catch(ex => {

        })
    }, [])



    let columns = [
        {
            title: "Transaction ID",
            key: "1122",
            dataIndex: "transactionId"
        },
        {
            title: "Order ID",
            key: "1122",
            dataIndex: "_id"
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
                <h1 className="page-title">My transactions</h1>
            </WithSidebarButton>

            <div className="mt-5">

                {transactions && transactions.length > 0 ? (
                    <div className="card overflow-hidden mt-4">
                        <div className="overflow-x-auto">

                            <Table dataSource={transactions} columns={columns} fixedHeader={true} scroll={{y: '80vh'}}/>

                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>No Transaction found.</h3>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Transactions