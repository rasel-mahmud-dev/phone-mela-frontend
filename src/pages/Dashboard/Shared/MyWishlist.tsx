import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "store/index";
import fullLink from "src/utils/fullLink";


import {ProductType, WishList} from "reducers/productReducer";
import {toggleHandleCart, toggleHandleWishlist} from "actions/productAction";
import Table from "UI/Table/Table";
import WithSidebarButton from "components/WithSidebarButton/WithSidebarButton";
import useScrollTop from "hooks/useScrollTop";
import {BsCartPlusFill, BsFillCartDashFill, BsFillTrash2Fill, BsTrash} from "react-icons/all";
import Preload from "UI/Preload/Preload";
import slugify from "../../../utils/slugify";


const MyWishlist = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch()

    useScrollTop()

    const {productState, auth} = useSelector((state: RootStateType) => state)

    const {cartProducts, wishlist} = productState

    function handlePushBack() {
        navigate(-1)
    }

    const isInCart = (id: string) => {
        let i = cartProducts && cartProducts.findIndex(cp => cp.product_id.toString() === id.toString())
        return i !== -1
    }


    function addToCartHandler(wish: WishList) {
        // dispatch(addToCart({
        //   id: wish.product_id,
        //   cover: wish.cover ? wish.cover : "",
        //   title: wish.title,
        //   price: wish.price
        // }))
    }


    let columns = [
        {
            title: "Image",
            key: "1",
            dataIndex: "cover",
            render: (text: string) => <div style={{width: "40px"}}><img style={{width: "100%"}} src={fullLink(text)}
                                                                        alt=""/></div>
        },
        {
            title: "Name",
            key: "1",
            dataIndex: "title",
            render: (text: string, prod: WishList) => {
                return <Preload to={`/product/${slugify(prod.title)}/${prod.product_id}`}>{text}</Preload>
            },
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

            // <Tooltip theme="simple-white" tooltip={text}><a>{text.slice(0, 20)}{.length > 21 && "..."}</a></Tooltip>

        },
        {
            title: "Price",
            key: "10",
            dataIndex: "price",
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
            title: "Actions",
            key: "45435",
            className: "text-center",
            render: (wish: WishList) => {
                return (
                    <div className='flex items-center justify-center '>

                        {isInCart(wish.product_id) ? (
                            <button
                                onClick={() => dispatch(toggleHandleCart({
                                    title: wish.title,
                                    price: wish.price,
                                    cover: wish.cover ? wish.cover : "",
                                    product_id: wish.product_id
                                }))}
                                className="flex-nowrap white-space-nowrap flex-nowrap  text-[13px] font-normal  px-2 py-1 flex items-center ml-2">
                                <BsFillCartDashFill className="text-lg"/>
                            </button>
                        ) : (
                            <button
                                className="flex-nowrap white-space-nowrap  px-2 py-1 flex items-center ml-2"
                                onClick={() => dispatch(toggleHandleCart({
                                    title: wish.title,
                                    price: wish.price,
                                    cover: wish.cover ? wish.cover : "",
                                    product_id: wish.product_id
                                }))}

                            >
                                <BsCartPlusFill className="text-lg"/>
                            </button>
                        )}

                        <button className="flex-nowrap text-[13px]  px-2 py-1 flex items-center ml-2"
                                onClick={() => dispatch(toggleHandleWishlist({
                                    title: wish.title,
                                    price: wish.price,
                                    cover: wish.cover ? wish.cover : "",
                                    product_id: wish.product_id
                                }, false))}
                        >

                            <BsFillTrash2Fill className="text-red-100 text-lg"/>

                        </button>

                    </div>
                )
            }
        }
    ]


    function renderCartItems() {
        return (
            <div className="overflow-x-auto">
                <Table checkBox={false} dataSource={wishlist} columns={columns} fixedHeader={true}
                       scroll={{y: '80vh'}}/>
            </div>
        )
    }

    return (
        <div className="my-4">

            <WithSidebarButton className="my-4">
                <h1 className="page-title">My Wishlist</h1>
            </WithSidebarButton>


            <div className="card overflow-hidden">
                {wishlist && wishlist.length > 0 && renderCartItems()}
            </div>

            {wishlist && wishlist.length === 0 && (
                <div className="text-md font-medium text-center">
                    <h1>Your Wishlist is Empty</h1>
                </div>
            )}


        </div>
    )
};


export default MyWishlist