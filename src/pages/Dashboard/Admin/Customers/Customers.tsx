import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {RootStateType} from "store/index";
import Table from "UI/Table/Table";
import fullLink from "src/utils/fullLink";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import {blockCustomer, fetchCustomers} from "actions/usersAction";
import useScrollTop from "hooks/useScrollTop";
import Avatar from 'components/Avatar/Avatar';
import Switch from "UI/Form/Switch/Switch";


const Customer = (props) => {

    const {auth: {auth}, users: {customers}} = useSelector((state: RootStateType) => state)

    const dispatch = useDispatch()

    useScrollTop()


    useEffect(() => {

        if (!customers || customers.length === 0) {
                fetchCustomers(dispatch).then(r => {
            }).catch(ex => {
            })
        }
    }, [])

    function handleChangeCustomerStatus(_id: string, isBlock: boolean) {
        blockCustomer(dispatch, _id, !isBlock)
    }


    let columns = [
        {
            title: "Image",
            key: "1",
            dataIndex: "avatar",
            render: (avatar: any, user: any) =>
                <Avatar imgClass="w-20 h-20" username={user.username} src={fullLink(avatar)}/>
        },
        {
            title: "Name",
            key: "1",
            dataIndex: "first_name",
            width: 200,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.first_name.toLowerCase() > b.first_name.toLowerCase()) {
                        return 1
                    } else if (a.first_name.toLowerCase() < b.first_name.toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
                }
            }
        },
        {
            title: "Email",
            key: "1235345",
            dataIndex: "email",
            width: 200,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.email.toLowerCase() > b.email.toLowerCase()) {
                        return 1
                    } else if (a.email.toLowerCase() < b.email.toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
                }
            }
        },
        {
            title: "Role",
            key: "1132",
            dataIndex: "role",
            width: 200,
            sorter: {
                compare: (a: any, b: any) => {
                    if (a.role.toLowerCase() > b.role.toLowerCase()) {
                        return 1
                    } else if (a.role.toLowerCase() < b.role.toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
                }
            },
            render: (first_name: string) => {
                return first_name
            }
        },
        {
            title: "Join On",
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
            title: "Block",
            key: "33",
            dataIndex: "",
            render: (customer) => <Switch
                onChange={() => handleChangeCustomerStatus(customer._id, customer?.isBlock)}
                name="block"
                on={customer?.isBlock}
            />
        }
    ]


    return (
        <div className="my-4">

            <WithSidebarButton>
                <h1 className="page-title">Customer</h1>
            </WithSidebarButton>

            <div className="mt-5">

                {customers && customers.length > 0 ? (
                    <div className="card overflow-hidden mt-4">
                        <div className="overflow-x-auto">

                            <Table dataSource={customers} columns={columns} fixedHeader={true} scroll={{y: '80vh'}}/>

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

export default Customer