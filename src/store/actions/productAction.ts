import {ActionTypes, SET_ACTION_TYPE} from "./actionTypes"
import api, {getApi} from "../../apis/api"
import {BrandType, CartProductType, HomePageSectionProductsType, ProductType, WishList} from "reducers/productReducer";
import {togglePopup} from "actions/toolsAction";
import {RootStateType} from "store/index";
import {
    CHANGE_SEARCH_VALUE_ACTION,
    FETCH_HOMEPAGE_PRODUCTS_ACTION,
    FetchBrands,
    FILTER_SEARCH_CHANGE_ACTION,
    FILTERED_PRODUCTS_ACTION,
    FILTERED_PRODUCTS_TYPE,
    SELECTED_ATTRIBUTE_FILTER_Action_Type
} from "store/types/prouductReduceTypes";

import {AxiosInstance} from "axios";
import errorMessage from "../../response/errorResponse";
import {Order} from "store/types/Order";
import {Cart} from "store/types/Cart";
import {toast} from "react-toastify";
// import {toast} from "react-toastify";


const {
    DELETE_PRODUCT,
    IS_LOADING,
    CLEAR_PRODUCT_DETAILS,
    ADD_BRAND,
    FETCH_WISHLIST, SET_ACTION
} = ActionTypes


export const setHomePageSectionProducts = (payload: HomePageSectionProductsType): FETCH_HOMEPAGE_PRODUCTS_ACTION => {
    return {
        type: ActionTypes.FETCH_HOMEPAGE_PRODUCTS,
        payload: payload
    }
}

export const fetchProduct = (id: number) => async (dispatch: (args: { type: ActionTypes.FETCH_PRODUCT, payload: any } | any) => void, api: AxiosInstance) => {
    try {
        dispatch(loading(true))
        const response = await getApi().get(`/api/product/${id}`)
        if (response.status === 200) {
            if (response.data._id) {
                dispatch(loading(false))
                dispatch({
                    type: ActionTypes.FETCH_PRODUCT,
                    payload: response.data
                })
            }
        }
    } catch (ex) {
        dispatch(loading(false))
    }
}


export const deleteProduct = (id: number) => async (dispatch: any) => {
    try {
        const product = await getApi().post(`/api/delete-product/${id}`)
        if (product.data._id) {
            dispatch({
                type: DELETE_PRODUCT,
                payload: product.data._id
            })
        }
    } catch (ex) {
        console.log(ex);
    }
}


export const fetchBrands = async (dispatch) => {

    try {
        const response = await getApi().get(`/api/brands`)
        if (response.status === 200) {

            dispatch({
                type: ActionTypes.FETCH_BRANDS,
                payload: response.data
            })

        }
    } catch (ex) {

    }


}

export const fetchOrders = (dispatch) => {
    return new Promise<Order[]>(async (resolve, reject) => {
        try {
            const response = await getApi().get<Order[]>(`/api/orders`)
            if (response.status === 200 && response.data) {

                dispatch({
                    type: ActionTypes.FETCH_ORDERS,
                    payload: response.data
                })
                resolve(response.data)

            } else {
                resolve([])
            }
        } catch (ex) {
            reject(errorMessage(ex))
        }
    })
}
export const fetchCarts = (dispatch) => {
    return new Promise<Cart[]>(async (resolve, reject) => {
        try {
            const response = await getApi().get<Cart[]>(`/api/carts`)
            if (response.status === 200 && response.data) {

                dispatch({
                    type: ActionTypes.FETCH_CARTS,
                    payload: response.data
                })
                resolve(response.data)

            } else {
                resolve([])
            }
        } catch (ex) {
            reject(errorMessage(ex))
        }
    })
}

export const setSelectedAttributeFilter = (payload: object): SELECTED_ATTRIBUTE_FILTER_Action_Type => {
    return {
        type: ActionTypes.SELECTED_ATTRIBUTE_FILTER,
        payload: payload
    }
}

export const setFilteredProducts = (payload: FILTERED_PRODUCTS_TYPE): FILTERED_PRODUCTS_ACTION => {
    return {
        type: ActionTypes.SET_FILTERED_PRODUCTS,
        payload: payload
    }
}

export const addNewBrand = (brandName: string) => async (dispatch: any, getState: any, api: AxiosInstance) => {
    try {
        const brandId = await getApi().post(`/api/add-brand`, JSON.stringify({name: brandName}))

        if (brandId) {
            dispatch({
                type: ADD_BRAND,
                payload: brandId
            })
        }
    } catch (ex) {
        console.log(ex);
    }
}


export interface AddCartPayload {
    cover: string,
    price: number,
    title: string,
    product_id: string
}

export interface TOGGLE_CART_ACTION {
    type: ActionTypes.REMOVE_CART_ITEM | ActionTypes.ADD_CART_ITEM,
    payload: CartProductType[] | null
}

let id: NodeJS.Timeout;

export function toggleHandleCart(product: AddCartPayload) {


    return async function (dispatch: any, getState: any) {


        id && clearTimeout(id)
        const {productState, auth: {auth}}: RootStateType = getState()
        let updatedCartProducts = [...productState.cartProducts]

        // toast("----------------------------------")


        if (auth) {
            let newCart: CartProductType;
            let index = updatedCartProducts.findIndex(cp => cp.product_id === product.product_id)
            if (index === -1) {
                // add product into cart
                if (product) {
                    newCart = {
                        _id: "",
                        title: product.title,
                        price: product.price,
                        quantity: 1,
                        cover: product.cover,
                        product_id: product.product_id,
                        customer_id: auth._id,
                        createdAt: new Date()
                    }

                    try {
                        const r = await getApi().post("api/add-cart", {
                            product_id: product.product_id,
                            quantity: 1
                        })
                        if (r.status === 201) {
                            newCart._id = r.data._id
                            updatedCartProducts = [...updatedCartProducts, newCart]
                            dispatch({
                                type: ActionTypes.ADD_CART_ITEM,
                                payload: updatedCartProducts
                            })
                            toast("Product added to cart")
                        }
                    } catch (ex) {
                        toast.error(errorMessage(ex))
                        dispatch({
                            type: ActionTypes.ADD_CART_ITEM,
                            payload: null
                        })
                    }

                }
            } else {
                // remove this product from cart...
                let cart: CartProductType = updatedCartProducts[index]
                if (cart) {
                    try {
                        const r = await getApi().post("api/remove-cart", {
                            cart_id: cart._id,
                            customer_id: auth._id
                        })
                        if (r.status === 201) {
                            updatedCartProducts.splice(index, 1)
                            dispatch({
                                type: ActionTypes.REMOVE_CART_ITEM,
                                payload: updatedCartProducts
                            })
                            toast("Product Remove from cart")
                        }
                    } catch (ex) {
                        dispatch({
                            type: ActionTypes.REMOVE_CART_ITEM,
                            payload: null
                        })
                    }
                }

            }

        } else {

            toast.error("Please login to add cart")
        }
    }
}


export const toggleLoader = () => {
}


// toggle wishlist products
export interface TOGGLE_WISHLIST_ACTION {
    type: ActionTypes.REMOVE_FROM_WISHLIST | ActionTypes.ADD_TO_WISHLIST,
    payload: WishList[] | null
}


export interface AddWishlistPayload {
    cover: string,
    price: number,
    title: string,
    product_id: string
}

export function toggleHandleWishlist(product: AddWishlistPayload, cb?: any) {
    return async function (dispatch: (args: TOGGLE_WISHLIST_ACTION | SET_ACTION_TYPE) => TOGGLE_WISHLIST_ACTION, getState: any) {

        const {productState, auth: {auth}}: RootStateType = getState()
        let updatedWishlist = [...productState.wishlist]


        if (auth && auth._id) {
            let newWishlist: WishList

            let index = updatedWishlist.findIndex(cp => cp.product_id === product.product_id)

            if (index === -1) {
                newWishlist = {
                    _id: "",
                    title: product.title,
                    price: product.price,
                    cover: product.cover,
                    product_id: product.product_id,
                    customer_id: auth._id,
                    createdAt: new Date()
                }

                const r = await getApi().post("api/add-wishlist", newWishlist)
                if (r.status === 201) {
                    newWishlist._id = r.data._id
                    updatedWishlist.push(newWishlist)
                    dispatch({
                        type: ActionTypes.ADD_TO_WISHLIST,
                        payload: updatedWishlist
                    })

                    toast("Product successfully add on wishlist")

                    if (cb) {
                        cb(undefined, "Add wishlist successfully")
                    }
                }

            } else {
                // remove wishlist items
                let wishItem = updatedWishlist[index]
                if (!wishItem) return null

                const r = await getApi().post("api/remove-wishlist", {wishlist_id: wishItem._id, customer_id: auth._id})
                if (r.status === 201) {
                    updatedWishlist.splice(index, 1)
                    dispatch({
                        type: ActionTypes.REMOVE_FROM_WISHLIST,
                        payload: updatedWishlist
                    })
                    toast("Product successfully remove from wishlist")
                    cb && cb("", "Remove wishlist successfully")
                }

            }

        } else {

            toast.error("Please login to add wishlist")
        }
    }
}


// fetch all transactions from database
export const fetchTransactions = (dispatch) => {
    return new Promise<Cart[]>(async (resolve, reject) => {
        try {
            const response = await getApi().get<any[]>(`/api/orders/transactions`)
            if (response.status === 200 && response.data) {

                dispatch({
                    type: ActionTypes.FETCH_TRANSACTIONS,
                    payload: response.data
                })
                resolve(response.data)

            } else {
                resolve([])
            }
        } catch (ex) {
            reject(errorMessage(ex))
        }
    })
}


export function fetchWishlist(dispatch) {
    return new Promise((resolve, reject) => {
        getApi().get("/api/wishlist").then(res => {
            dispatch({
                type: FETCH_WISHLIST,
                payload: res.data
            })
        }).catch(ex => {

        })
    })

}


export function loading(isLoading: boolean) {
    return {
        type: IS_LOADING,
        payload: isLoading
    }
}

export function clearProductDetails() {
    return {
        type: CLEAR_PRODUCT_DETAILS,
        payload: {}
    }
}


export function onFilterSearchChange(value: string): FILTER_SEARCH_CHANGE_ACTION {
    return {
        type: ActionTypes.FILTER_SEARCH_CHANGE,
        payload: value
    }
}

export function onSearchChange(value: string): CHANGE_SEARCH_VALUE_ACTION {
    return {
        type: ActionTypes.SEARCH_CHANGE,
        payload: {value: value, fields: []}
    }
}