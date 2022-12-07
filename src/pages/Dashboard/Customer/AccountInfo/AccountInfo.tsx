import React, {useEffect} from 'react'
import {useSelector} from "react-redux";

import {getApi} from "apis/api";
import {RootStateType} from "store/index";
import fullLink from "src/utils/fullLink";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import useScrollTop from "hooks/useScrollTop";


interface CustomerProfileType {
    avatar: string
    createdAt: string
    email: string
    first_name: string
    id: number
    last_name: string
    role: string
    username: string
}

const AccountInfo = (props) => {

    const {auth: {auth}} = useSelector((state: RootStateType) => state)

    let [customerProfile, setCustomerProfile] = React.useState<CustomerProfileType | null>(null)

    useScrollTop()


    useEffect(() => {
        if (auth) {
            getApi().get(`/api/auth/customer-profile/${auth._id}`).then(doc => {
                if (doc.data) {
                    setCustomerProfile(doc.data)
                }
            })
        }
    }, [])

    return (
        <div className="">
            <WithSidebarButton>
                <h1 className="page-title">Profile Information</h1>
            </WithSidebarButton>

            <div className="card p-4">


                {customerProfile && (
                    <div className="">
                        <div className="flex">
                            <div className="w-24">
                                <img className="w-full rounded-full" src={fullLink(customerProfile.avatar)} alt=""/>
                                <button className="text-sm hover:text-primary-400">Change Avatar</button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[100px]">First name: </label>
                            <h4>{customerProfile.first_name}</h4>
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[100px]">Last name: </label>
                            <h4>{customerProfile.last_name}</h4>
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[100px]">Email: </label>
                            <h4>{customerProfile.email}</h4>
                        </div>

                        <div className="border border-gray-900/10 my-4"/>

                        <div className="flex items-center">
                            <label htmlFor="" className="min-w-[150px]">Customer since: </label>
                            <h4>{new Date(customerProfile.createdAt).toDateString()}</h4>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}


export default AccountInfo
