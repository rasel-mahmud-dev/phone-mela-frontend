import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import Input2 from "UI/Form/Input/Input2";
import {ShippingAddress} from "reducers/userReducer";
import Modal from "UI/Modal/Modal";
import Button from "UI/Button/Button";
import {getApi} from "apis/api";
import {AuthStateType} from "reducers/authReducer";


interface Props {
    onClose?: () => void,
    onAdd?: (data: ShippingAddress) => void
    isOpen: boolean
    auth?: any
}


const AddShippingAddress: FC<Props> = (props) => {
    const {onClose, onAdd, isOpen, auth} = props


    const [shippingAddress, setShippingAddress] = React.useState<ShippingAddress>({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        idDefault: false,
        post_code: "",
        state: "",
        city: "",
        address: "",
        apartment_suit: "",
        country: "",
    })
    const [errorMessage, setErrorErrorMessage] = React.useState({
        firstName: "",
        lastName: "",
        phone: "",
        idDefault: "",
        post_code: "",
        state: "",
        email: "",
        city: "",
        address: "",
        apartment_suit: "",
        country: "",
    })

    useEffect(() => {
        return () => {
            setShippingAddress({
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                idDefault: false,
                post_code: "",
                state: "",
                city: "",
                address: "",
                apartment_suit: "",
                country: "",
            })
        }
    }, [])


    async function handleSave(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (!auth) {
            alert("please login")
        } else {
            try {
                let response = await getApi().post("/api/shipping-address", {
                    ...shippingAddress,
                    customer_id: auth._id
                })
                if (response.status === 201) {
                    onClose()
                    onAdd(response.data)
                }
            } catch (ex){
                alert("Please Try again.")
            }
        }
    }

    function handleFilFakeData() {
        setShippingAddress({
            firstName: "Rahim",
            lastName: "mahmud",
            email: 'rasel@gmail.com',
            phone: '1712513135',
            idDefault: true,
            post_code: '7726',
            state: "Bogra",
            city: "Sador",
            address: "Feri, Sador-bogra",
            apartment_suit: "none",
            country: "Bangladesh",
        })
    }


    function handleChange(e: ChangeEvent<HTMLInputElement>) {

        if (e.target.name === "post_code" || e.target.name === "phone") {
            setShippingAddress({
                ...shippingAddress,
                [e.target.name]: Number(e.target.value)
            })
        } else if (e.target.name === "isDefault") {
            setShippingAddress({
                ...shippingAddress,
                // @ts-ignore
                [e.target.name]: e.target.checked
            })
        } else {
            setShippingAddress({
                ...shippingAddress,
                [e.target.name]: e.target.value
            })
        }
    }


    return (
        <Modal isOpen={isOpen} backdropClass="bg-dark-900/70" className="max-w-xl  !top-10" onClose={onClose}>
            <div className="">
                <div className="mt-4">

                    <h4 className="font-medium text-center text-xl text-gray-800">Add New Shipping Address</h4>


                    <form className="">
                        <Input2
                            className=""
                            name="firstName"
                            label="FirstName"
                            value={shippingAddress.firstName}
                            error={errorMessage.firstName}
                            onChange={handleChange}
                        />


                        <Input2
                            className=""
                            name="lastName"
                            label="LastName"
                            value={shippingAddress.lastName}
                            error={errorMessage.lastName}
                            onChange={handleChange}
                        />


                        <Input2
                            className=""
                            name="email"
                            label="Email"
                            value={shippingAddress.email}
                            error={errorMessage.email}
                            onChange={handleChange}
                        />

                        <Input2
                            className=""
                            name="phone"
                            label="Phone"
                            value={shippingAddress.phone}
                            error={errorMessage.phone}
                            onChange={handleChange}
                        />

                        <Input2
                            className=""
                            name="address"
                            label="Enter address"
                            value={shippingAddress.address}
                            error={errorMessage.address}
                            onChange={handleChange}
                        />

                        <Input2
                            className=""
                            name="apartment_suit"
                            label="Enter apartment_suit"
                            value={shippingAddress.apartment_suit}
                            error={errorMessage.apartment_suit}
                            onChange={handleChange}
                        />

                        <Input2
                            className=""
                            name="city"
                            label="Enter city"
                            value={shippingAddress.city}
                            error={errorMessage.city}
                            onChange={handleChange}
                        />
                        <Input2
                            className=""
                            name="state"
                            label="Enter state"
                            value={shippingAddress.state}
                            error={errorMessage.state}
                            onChange={handleChange}
                        />
                        <Input2
                            className=""
                            name="post_code"
                            label="Enter post_code"
                            value={shippingAddress.post_code}
                            error={errorMessage.post_code}
                            onChange={handleChange}
                        />

                        {/*<Button*/}
                        {/*    className={`mt-5 text-white !w-full !ml-0 ${*/}
                        {/*        fetchLoading ? "bg-primary-400 pointer-events-none" : "bg-primary-400"*/}
                        {/*    }`}*/}
                        {/*>*/}
                        {/*    Login*/}
                        {/*</Button>*/}


                        <div className="flex items-center mt-4">
                            <input onChange={handleChange} name="idDefault" checked={shippingAddress.idDefault} type="checkbox"
                                   id="make-default"/>
                            <label htmlFor="make-default" className="text-sm ml-2">Make default</label>
                        </div>

                        <div className="flex gap-x-2">
                            <Button onClick={handleSave} className="btn-primary mt-4">
                                Save Shipping Address
                            </Button>

                            <Button type="button" onClick={handleFilFakeData} className="btn-primary mt-4">
                                Fill up fake Address
                            </Button>
                        </div>


                    </form>


                </div>
            </div>
        </Modal>
    );
};

export default AddShippingAddress;