import React, {useEffect} from 'react'


import {useDispatch, useSelector} from "react-redux"



import {RootStateType} from "store/index";
import Table from "UI/Table/Table";

import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import {fetchBrands} from "actions/productAction";
import useScrollTop from "hooks/useScrollTop";



const BrandList = (props) => {

    const {auth: {auth}, productState: {brands}} = useSelector((state: RootStateType) => state)

    const dispatch = useDispatch()

    useScrollTop()


    useEffect(() => {

            fetchBrands(dispatch)

    }, [])


    let columns = [
        {
            title: "ID",
            key: "112234232",
            dataIndex: "_id"
        },
        {
            title: "Name",
            key: "1",
            dataIndex: "name",
            width: 200,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {
                        return 1
                    } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
                }
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
        }
    ]


    return (
        <div className="my-4">

            <WithSidebarButton>
                <h1 className="page-title">Brands</h1>
            </WithSidebarButton>

            <div className="mt-5">

                {brands && brands.length > 0 ? (
                    <div className="card overflow-hidden mt-4">
                        <div className="overflow-x-auto">

                            <Table dataSource={brands} columns={columns} fixedHeader={true} scroll={{y: '80vh'}}/>

                        </div>
                    </div>
                ) : (
                    <div>
                        <h3>No brands found.</h3>
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrandList