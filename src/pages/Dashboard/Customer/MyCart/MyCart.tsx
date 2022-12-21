import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {fetchCarts, toggleHandleCart, toggleHandleWishlist} from "actions/productAction"
import {useSelector} from "react-redux"

import fullLink from "src/utils/fullLink";
import {RootStateType} from "store/index";
import {ActionTypes} from "actions/actionTypes";
import {CartProductType, ProductType} from "reducers/productReducer";
import Table from "UI/Table/Table";
import Preload from "UI/Preload/Preload";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import useScrollTop from "hooks/useScrollTop";
import {BiHeart, BsFillTrash2Fill, FaHeart, FaMinus, FaPlug, FaPlus} from "react-icons/all";
import Button from "UI/Button/Button";
import slugify from "../../../../utils/slugify";



const MyCart = () => {
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const {productState: {cartProducts, wishlist}, auth} = useSelector((state: RootStateType) => state)

    useScrollTop()

    useEffect(() => {
        if (!cartProducts || cartProducts.length === 0) {
            fetchCarts(dispatch)
        }
    }, [])

    const [selectCartItems, setSelectCartItems] = useState({
        items: [],
        totalPrice: 0
    })


    function handlePushBack() {
        // history.back()
        navigate("/")
    }


    function calculateTotalPrice(items: any[]) {
        let totalPrice = 0;
        for (let i = 0; i < items.length; i++) {
            totalPrice += (items[i].price * items[i].quantity)
        }
        return totalPrice.toFixed(2) || 0.00
    }

    function handleSelectCartItem(cart) {
        let updateItems = [...selectCartItems.items] || []
        let updateTotalPrice = selectCartItems.totalPrice


        let index = updateItems?.findIndex(item => item._id === cart._id)

        if (index === -1) {
            updateItems = [...updateItems, cart]
            updateTotalPrice += cart.price
        } else {
            updateTotalPrice -= cart.price
            updateItems.splice(index, 1)
        }

        setSelectCartItems({
            ...selectCartItems,
            items: updateItems,
            totalPrice: updateTotalPrice
        })

        dispatch({
            type: ActionTypes.SET_CHECKOUT_PRODUCTS,
            payload: {products: updateItems, totalPrice: updateTotalPrice}
        })


    }


    function renderCartItems() {
        const isInWished = (id: string) => {
            let i = wishlist.findIndex(cp => cp.product_id === id)
            return i !== -1
        }


        let columns = [
            {
                title: "",
                key: "",
                dataIndex: "",
                render: (item: any) => <div style={{width: ""}}>
                    <input type="checkbox" onChange={() => handleSelectCartItem(item)}/>
                </div>
            },
            {
                title: "Image",
                key: "1",
                dataIndex: "cover",
                render: (text: string) => <div style={{width: "40px"}}>
                    <img style={{width: "100%"}}
                         src={fullLink(text)}/>
                </div>
            },
            {
                title: "Name",
                key: "2",
                dataIndex: "title",
                width: 200,
                sorter: {
                    compare: (a: any, b: any) => {
                        if (a.title.toLowerCase() > b.title.toLowerCase()) {
                            return 1
                        } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
                            return -1
                        } else {
                            return 0
                        }
                    }
                },
                render: (text: string, prod: CartProductType) => {
                    return <Preload to={`/product/${slugify(prod.title)}/${prod.product_id}`}>{text}</Preload>
                }
                // <Tooltip theme="simple-white" tooltip={text}><a>{text.slice(0, 20)}{.length > 21 && "..."}</a></Tooltip>

            },
            {
                title: "Price",
                key: "10",
                dataIndex: "price",
                width: 200,
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
                render: (text: string) => {
                    return text
                }
            },
            {
                title: "Added At",
                key: "3",
                dataIndex: "createdAt",
                width: 150,
                className: "white-space-nowrap",
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
                title: "Quantity",
                key: "45435",
                width: 100,
                className: "text-center",
                render: (product: CartProductType) => {
                    return (
                        <div>
                            <div className="flex items-center justify-center select-none min-w-[150px]">
                                <button>
                                    <FaPlus onClick={() => dispatch({
                                        type: ActionTypes.INCREASE_CART_ITEM,
                                        payload: product._id
                                    })}/>
                                </button>
                                <span
                                    className="bg-primary-400 rounded-full text-sm leading-[25px]  font-normal h-6 w-10 text-white mx-4  px-4">{product.quantity}</span>
                                <button>
                                    <FaMinus onClick={() => dispatch({
                                        type: ActionTypes.DECREASE_CART_ITEM,
                                        payload: product._id
                                    })}/>
                                </button>
                            </div>
                        </div>
                    )
                }
            },
            {
                title: "Actions",
                key: "45435",
                width: 100,
                className: "text-center",
                render: (product: CartProductType) => {
                    return (
                        <div>
                            <div className="flex justify-content-end  ">

                                {isInWished(product.product_id) ? (
                                    <FaHeart title="Remove from Wishlist"
                                             className="flex-nowrap flex text-2xl py-1 text-red-200 cursor-pointer"
                                             onClick={() => dispatch(toggleHandleWishlist({
                                                 title: product.title,
                                                 price: product.price,
                                                 cover: product.cover ? product.cover : "",
                                                 product_id: product.product_id
                                             }, false))}
                                    />


                                ) : (
                                    <BiHeart className="flex-nowrap flex text-2xl py-1 cursor-pointer" title="Add to Wishlist"
                                             onClick={() => dispatch(toggleHandleWishlist({
                                                 title: product.title,
                                                 price: product.price,
                                                 cover: product.cover ? product.cover : "",
                                                 product_id: product.product_id
                                             }, false))}
                                    />
                                )}
                                <BsFillTrash2Fill className=" py-1 ml-2 text-2xl cursor-pointer" title="Delete from cart"
                                                  onClick={() => dispatch(toggleHandleCart({
                                                      title: product.title,
                                                      price: product.price,
                                                      cover: product.cover ? product.cover : "",
                                                      product_id: product.product_id
                                                  }, false))}
                                />

                            </div>

                            {/*<FontAwesomeIcon className="text-gray-700 mr-2 text-lg" onClick={()=>dispatch({type: "REMOVE_CART_ITEM", payload: item._id})} icon={faHeart} />*/}
                            {/*<FontAwesomeIcon className="text-gray-700 text-lg" onClick={()=>dispatch({type: "REMOVE_CART_ITEM", payload: item._id})} icon={faTrash} />*/}

                        </div>

                    )
                }
            }
        ]


        return (
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <Table dataSource={cartProducts} checkBox={false} columns={columns} fixedHeader={true}/>

                </div>
                <h4 className="text-right font-normal text-sm mt-4 px-4 pb-3">SUBTOTAL:
                    <span className="text-primary-400 ml-2 font-medium">{selectCartItems.totalPrice} TK</span>
                </h4>
            </div>
        )
    }


    return (
        <div className="my-4">

            <WithSidebarButton>
                <h1 className="page-title mb-0">YOUR SHOPPING CART</h1>
            </WithSidebarButton>

            <div className="w-full">

                <div className="">
                    <div className="cart_items">


                        {cartProducts && cartProducts.length === 0 && (
                            <div className="text-md font-medium text-center">
                                <h1>Your Cart is Empty</h1>
                            </div>
                        )}

                        {cartProducts && cartProducts.length > 0 && renderCartItems()}


                        <div className="flex justify-between mt-4">
                            <button onClick={handlePushBack} className="link_btn text-sm font-normal flex items-center">
                                {/*<FontAwesomeIcon icon={faChevronLeft} className="mr-1 text-xs"/>*/}
                                <span className="text-sm font-normal">Back to Shop</span>
                            </button>
                            {/*<Link to="/shopping/cart/checkout">*/}

                            <Preload to="/order/checkout"
                                     className={["flex-nowrap px-4 flex items-center  py-1", selectCartItems.items && selectCartItems.items.length === 0 ? " pointer-events-none" : ""].join(" ")}>
                                <Button className={`btn-primary ${selectCartItems.items && selectCartItems.items.length === 0 ? "btn-disable" : ""}`}>
                                    Proceed to checkout
                                </Button>
                            </Preload>

                        </div>
                    </div>
                </div>

            </div>


            {/*{ cartProducts && cartProducts.length > 0 && renderCartItems() }*/}

        </div>
    )
};


export default MyCart
