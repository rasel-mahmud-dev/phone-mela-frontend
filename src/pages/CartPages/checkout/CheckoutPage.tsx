import React, {ChangeEvent, FC, useEffect} from 'react'
import {useParams, Link, useNavigate} from "react-router-dom"

import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";

import Input2 from "UI/Form/Input/Input2";
import Checkbox from "UI/Form/Checkbox/Checkbox";
import OrderSummary from "pages/CartPages/orderSummary/OrderSummary";
import {ShippingAddress} from "reducers/userReducer";
import api, {getApi} from "src/apis/api";
import OrderContext, {OrderContextType} from "pages/CartPages/orderContext";
import Button from "UI/Button/Button";
import {ActionTypes} from "actions/actionTypes";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import Modal from "UI/Modal/Modal";
import AddShippingAddress from "pages/Dashboard/Customer/AddressBook/AddShippingAddress";
import Preload from "UI/Preload/Preload";


type CheckoutPageProps = {}


const CheckoutPage: FC<CheckoutPageProps> = (props) => {

    const dispatch = useDispatch()


    let navigator = useNavigate()

    const {productState, auth: {auth}} = useSelector((state: RootStateType) => state)

    const {cartProducts} = productState

    const orderState: OrderContextType = React.useContext(OrderContext)


    const [isShowAddShippingForm, setShowAddShippingForm] = React.useState(false)

    const [recentShippingAddress, setRecentShippingAddress] = React.useState<ShippingAddress[]>()



    const [selectShippingAddress, setSelectShippingAddress] = React.useState(0)


    /**
     * fetch customer default shipping addresses.
     * */
    useEffect(() => {
        (async function () {
            if (auth) {
                let response = await api.get(`/api/shipping-addresses`)
                for (const responseElement of response.data) {
                    if (responseElement.isDefault) {
                        setSelectShippingAddress(responseElement._id)
                    }
                }
                setRecentShippingAddress(response.data)
            } else {
            }
        }())
    }, [auth])


    useEffect(()=>{
        if(productState.checkout?.products.length){
            // set checkout product in localstorage, so that it is not lost after reload page.
            localStorage.setItem("checkout", JSON.stringify(productState.checkout))
        } else {
            // take checkout product from localstorage
            dispatch({
                type: ActionTypes.SET_CHECKOUT_PRODUCTS,
                payload: JSON.parse( localStorage.getItem("checkout"))
            })
        }
    }, [productState.checkout.products])




    function handleChangeShippingAddress(id: number) {
        setSelectShippingAddress(id)
    }




    function renderRecentShippingAddress() {
        return (
            <div className="mt-4">
                <h4 className="font-medium text-base text-gray-800">Yours Saved Shipping Addresses</h4>
                {recentShippingAddress && recentShippingAddress.map((recentShipAddr: ShippingAddress, i) => (
                    <div onClick={() => recentShipAddr._id && handleChangeShippingAddress(recentShipAddr._id)}
                         className="flex items-center my-2 py-2 cursor-pointer">
                        <input
                            type="radio"
                            name="shipping-address"
                            // value={selectShippingAddress === recentShipAddr._id}
                            checked={recentShipAddr._id === selectShippingAddress}
                        />

                        <div
                            className={["border hover:border-primary-400/40 hover:bg-primary-10 rounded mx-2 p-2 text-sm", selectShippingAddress === recentShipAddr._id ? "border-primary-400/40 bg-primary-10" : ""].join(" ")}>
                            <h4 className="mb-0 text-sm">Phone:
                                <span className="ml-1">{recentShipAddr.phone}</span>
                            </h4>
                            <h4 className="mb-0 text-sm">Email:
                                <span className="ml-1">{recentShipAddr.email}</span>
                            </h4>
                            <h4 className="mb-0 text-sm">Address:
                                <span
                                    className="ml-1"> {recentShipAddr.address} {recentShipAddr.post_code} {recentShipAddr.city} {recentShipAddr.state} {recentShipAddr.country}</span>
                            </h4>
                        </div>
                    </div>

                ))
                }
            </div>
        )
    }

    function handleToggleAddShippingAddressForm() {
        if(recentShippingAddress?.length === 0){
            setShowAddShippingForm(!isShowAddShippingForm)
            setSelectShippingAddress(0)
        }
    }



    function handleToPay() {
        if (selectShippingAddress !== 0) {
            if (recentShippingAddress) {
                let s = recentShippingAddress.find(r => r._id === selectShippingAddress)
                orderState.actions.save({
                    shippingAddress: s,
                    cartProducts: cartProducts
                })
                navigator("/order/payment")
            }
        }

    }

    return (
        <div>
            <div className="">

                <h1 className="page-title">ORDER CHECKOUT</h1>


                <div className="">

                    <div>
                        <div className="cart_items">

                            <div className="flex justify-between sm:flex-row flex-col mt-10">

                                <div className="sm:flex-4 lg:flex-5 mr-4">



                                    <AddShippingAddress
                                        auth={auth}
                                        isOpen={isShowAddShippingForm}
                                        onClose={()=>setShowAddShippingForm(false)}
                                        onAdd={(address: ShippingAddress)=>setRecentShippingAddress([...recentShippingAddress, address])}
                                    />



                                    <Button className="btn-primary" onClick={handleToggleAddShippingAddressForm}>
                                        <span>
                                            {recentShippingAddress?.length === 0 ?  "Add shipping address" :
                                            <Preload to={"/dashboard/shipping-addresses"}>"Manage Shipping Address"</Preload> }
                                        </span>
                                    </Button>

                                    {recentShippingAddress?.length > 0 && renderRecentShippingAddress()}


                                    {/*<div className="flex justify-between mt-4">*/}
                                    {/*    <Link to="/dashboard/carts">*/}
                                    {/*        <button className="link_btn text-sm font-normal flex items-center">*/}
                                    {/*            /!*<FontAwesomeIcon icon={faChevronLeft} className="mr-1 text-xs" />*!/*/}
                                    {/*            <span className="text-sm font-normal">Back to Cart</span>*/}
                                    {/*        </button>*/}
                                    {/*    </Link>*/}
                                    {/*</div>*/}

                                </div>

                                <div className="sm:flex-5 lg:flex-2">
                                    <OrderSummary
                                        checkout={productState.checkout}
                                        shippingAddress={selectShippingAddress !== 0 ? recentShippingAddress ? recentShippingAddress.find(r => r._id === selectShippingAddress) : false : false}
                                        nextLevel={
                                            <div className="mt-5">
                                                <Button
                                                    disabled={selectShippingAddress === 0}
                                                    className={["w-full justify-center flex-nowrap text-white flex items-center px-4 py-1 bg-primary-400",
                                                    ].join(" ")}>
                                                    <button onClick={handleToPay}>Continue To Payment</button>
                                                </Button>
                                            </div>
                                        }

                                    />
                                </div>

                            </div>

                        </div>

                    </div>
                    <div>
                        <div className="mt-4">
                            <h3 className="section_title">Recommend Products</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage