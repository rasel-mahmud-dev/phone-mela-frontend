import {ActionTypes} from "src/store/actions/actionTypes";
import {FilterAttributesType, FILTERED_PRODUCTS_TYPE, ProductReducerActionType} from "store/types/prouductReduceTypes";
import {Order} from "store/types/Order";
import avatar from "components/Avatar/Avatar";
import {ShippingAddress} from "reducers/userReducer";

export interface WishList {
    _id: string
    cover?: string
    title: string
    customer_id: string
    createdAt: Date
    price: number
    product_id: string
}

export interface CartProductType {
    _id: string
    cover?: string
    title: string
    customer_id: string
    quantity: number
    createdAt: Date
    price: number
    product_id: string
}

export type ProductType = {
    _id: string
    attributes: string
    author_id: string
    seller_id: string
    averageRate?: number
    sold?: number
    brand_id: string
    cover: string
    createdAt: Date
    description: string
    discount: number
    stock?: number
    price: number
    tags: string
    title: string
    updatedAt: string
}
export type BrandType = {
    _id: string
    name: string
    updatedAt: string
}

export type HomePageSectionProductsType = {
    latest?: {
        label?: string,
        fields?: string[],
        products: ProductType[],
        sliderImages?: { url: string, low: string }[]
    },
    topRating?: {
        label?: string,
        fields?: string[],
        products: ProductType[],
        sliderImages?: { url: string, low: string }[]
    },
    topDiscount?: {
        label?: string,
        fields?: string[],
        products: ProductType[],
        sliderImages?: { url: string, low: string }[]
    },
    topFavorites?: {
        label?: string,
        fields?: string[],
        products: ProductType[],
        sliderImages?: { url: string, low: string }[]
    },
    topSales?: {
        label?: string,
        fields?: string[],
        products: ProductType[],
        sliderImages?: { url: string, low: string }[]
    }
}

export interface ProductStateType {
    currentPage: number,
    perPageShow: number,
    sortValue: { field: string, order: string },   // * ==>
    filteredProducts: FILTERED_PRODUCTS_TYPE,
    cacheProducts: [
        // { pageNo: 1, perPage: 5, products: {} },
        // { pageNo: 2, perPage: 5, products: {} },
        // { pageNo: 3, perPage: 5, products: {} },
        // { pageNo: 4, perPage: 5, products: {} }
    ],
    homePageSectionProducts: HomePageSectionProductsType,
    fetchedHomePageSectionProduct: {},
    checkout: {
        totalPrice: number,
        products: ProductType[]
        shippingAddress: ShippingAddress
    },
    cartProducts: CartProductType[
        // {id: 0, product_id: 0, customer_id: 0,  title: "", price: 0, quantity: 10}
        ],
    wishlist: WishList[
        // {id: 0, product_id: 0, customer_id: 0, title: "", price: 0}
        ],
    brands: BrandType[]
    filterGroup: {
        // price: [10, 100],
        // brand:["brand_id", "brand_id"],
        // sortBy: [{field: "views", order: -1, id: "1"}],
        // display: ["super", "IPS"],

        selectedBrands: { name: string, _id: string }[],
        range: {
            // "rom": [["8", "16"]]
            // "ram": [["4", "8"]]
            "battery": [number, number][] // [["4000", "5000"], ["5000", "6000"]] //  battery 4000 - 5000 and 5000 - 6000
        },
        in: {
            display: string[],
            camera: number[],
            ram: number[],
            rom: number[]
        }
    },
    selectedAttributeFilter: FilterAttributesType,
    search: { value: string, fields: string[] },
    products: [],
    productDetails: {},   // ? for single product
    isAuthProducts: "",
    totalProducts: 0,
    lastVisitPageNumber: 1,
    isLoading: false,
    orders: Order[]
    transactions: any[]
    reviews: any[]
}


let initialProductState: ProductStateType = {
    currentPage: 1,
    perPageShow: 100,
    sortValue: {field: "", order: ""},   // * ==>
    filteredProducts: {
        products: [], // * all products
        totalProducts: 0,
        isLoading: false,
        message: "",
        search: "",
        currentPage: 1,
        perPageShow: 20,

        orderBy: "createdAt",
        orderDirection: "desc"
    },
    cacheProducts: [
        // { pageNo: 1, perPage: 5, products: {} },
        // { pageNo: 2, perPage: 5, products: {} },
        // { pageNo: 3, perPage: 5, products: {} },
        // { pageNo: 4, perPage: 5, products: {} }
    ],
    brands: [],
    fetchedHomePageSectionProduct: {},
    homePageSectionProducts: {
        latest: {
            label: "LATEST DEVICES",
            fields: ["createdAt"],
            products: []
        },
        topFavorites: {label: "TOP 10 BY FANS", products: []},
        topSales: {
            label: "Top Selling",
            fields: ["sold"],
            products: [],
            sliderImages: [
                {
                    url: "/images/h10-slider copy-hd.webp",
                    low: "/images/h10-slider copy.webp"
                }, {
                    url: "/images/motoedge20pro copy-hd.webp",
                    low: "/images/motoedge20pro copy.webp"
                },
                {
                    url: "/images/a99e09a1-9edb-45b5-81fd-a4db52828e83___d42a8f07dd542a306c582345181ce344 copy.webp",
                    low: "/images/a99e09a1-9edb-45b5-81fd-a4db52828e83___d42a8f07dd542a306c582345181ce344 copy 2.webp"
                },
                {
                    url: "/images/ECabQNuW4AEVEdr copy.webp",
                    low: "/images/ECabQNuW4AEVEdr copy-low.webp"
                },
                {
                    url: "/images/nx6-slider copy.webp",
                    low: "/images/nx6-slider copy_low.webp"
                },
            ]
        },
        topDiscount: {
            label: "Top Offers",
            // fields: ["discount"],
            products: [],
            sliderImages: [
                // {
                //   url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4.jpg",
                //   low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
                // },
                // {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c3.jpg",
                //   low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
                // },
                // {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c6.jpg",
                //   low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
                // },
                // {url: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c7.jpg",
                //   low: "https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c4_low.jpg"
                // },
            ]
        },
        topRating: {
            label: "Top Rating",
            fields: ["rate"],
            products: [],
            sliderImages: [
                {
                    url: "/images/ECabQNuW4AEVEdr copy.webp",
                    low: "/images/ECabQNuW4AEVEdr copy-low.webp"
                },
                {
                    url: "/images/a99e09a1-9edb-45b5-81fd-a4db52828e83___d42a8f07dd542a306c582345181ce344 copy.webp",
                    low: "/images/a99e09a1-9edb-45b5-81fd-a4db52828e83___d42a8f07dd542a306c582345181ce344 copy 2.webp"
                },
                {
                    url: "/images/motoedge20pro copy-hd.webp",
                    low: "/images/motoedge20pro copy.webp"
                },
                {
                    url: "/images/nx6-slider copy.webp",
                    low: "/images/nx6-slider copy_low.webp"
                },
            ]
        }
    },
    checkout: {
        totalPrice: 0,
        products: [],
        shippingAddress: null
    },
    cartProducts: [
        // {_id: 0, product_id: 0, customer_id: 0,  title: "", price: 0, quantity: 10}
    ],
    wishlist: [
        // {id: 0, product_id: 0, customer_id: 0, title: "", price: 0}
    ],

    filterGroup: {
        // price: [10, 100],
        // brands: [],
        // sortBy: [{field: "views", order: -1, id: "1"}],
        // brand:["brand_id", "brand_id"],
        // display: ["super", "IPS"],
        range: {
            // "rom": [["8", "16"]]
            // "ram": [["4", "8"]]
            battery: [[4000, 5000], [5000, 6000]] //  battery 4000 - 5000 and 5000 - 6000
        },
        in: {
            display: [],
            camera: [13],
            ram: [4],
            rom: [16]
        },
        selectedBrands: []
    },

    selectedAttributeFilter: {
        // battery: [],
        // ram: [
        // {name: '2GB', value: 2},
        // {name: '4GB', value: 4},
        // {name: '6GB', value: 6},
        // ]
// display: []
    },

    search: {value: "", fields: ["name", "brand"]},

    products: [],

    productDetails: {},   // ? for single product
    isAuthProducts: "",
    totalProducts: 0,
    lastVisitPageNumber: 1,
    isLoading: false,
    orders: null,
    transactions: null,
    reviews: null
}



const productsReducer = (state = initialProductState, action: any): ProductStateType => {
    let updatedState = {...state}
    let index = -1
    switch (action.type) {

        case ActionTypes.FETCH_BRANDS:
            updatedState.brands = action.payload
            return updatedState

        case ActionTypes.FETCH_HOMEPAGE_SECTION_PRODUCTS:
            updatedState.fetchedHomePageSectionProduct = action.payload
            return updatedState

        case ActionTypes.SET_FILTERED_PRODUCTS:
            updatedState.filteredProducts = {
                ...updatedState.filteredProducts,
                ...action.payload
            }
            return updatedState


        case ActionTypes.SELECTED_ATTRIBUTE_FILTER:
            updatedState.selectedAttributeFilter = action.payload
            return updatedState


        case ActionTypes.SELECT_BRANDS:
            updatedState.filterGroup = {
                ...updatedState.filterGroup,
                selectedBrands: [...action.payload]
            }
            return updatedState

        case ActionTypes.FETCH_WISHLIST:
            if (action.payload) {
                updatedState.wishlist = action.payload
            }
            return updatedState

        case ActionTypes.FETCH_ORDERS:
                updatedState.orders = action.payload
            return updatedState

        case ActionTypes.ADD_TO_WISHLIST:
            if (action.payload) {
                updatedState.wishlist = action.payload
            }
            return updatedState

        case ActionTypes.REMOVE_FROM_WISHLIST:
            if (action.payload) {
                updatedState.wishlist = action.payload
            }
            return updatedState


        case ActionTypes.ADD_CART_ITEM:
            if (action.payload) {
                updatedState.cartProducts = action.payload
            }
            return updatedState

        case ActionTypes.REMOVE_CART_ITEM:
            if (action.payload) {
                updatedState.cartProducts = action.payload
            }
            return updatedState

        case ActionTypes.FETCH_CARTS:
            updatedState.cartProducts = action.payload
            return updatedState



        case ActionTypes.SET_CHECKOUT_PRODUCTS:
            let updateCheckout = {
                ...updatedState.checkout,
            }

            if(action.payload.products !== undefined){
                updateCheckout.products =  action.payload.products
            }

            if(action.payload.totalPrice !== undefined){
                updateCheckout.totalPrice =  action.payload.totalPrice
            }

            if(action.payload.shippingAddress !== undefined){
                updateCheckout.shippingAddress =  action.payload.shippingAddress
            }

            return {
                ...updatedState,
                checkout: updateCheckout
            }

        case ActionTypes.FETCH_TRANSACTIONS:
            updatedState.transactions = action.payload
            return updatedState

        case ActionTypes.INCREASE_CART_ITEM:
            index = updatedState.cartProducts.findIndex(cp => cp._id === action.payload)
            updatedState.cartProducts[index].quantity++
            return updatedState

        case ActionTypes.DECREASE_CART_ITEM:
            index = updatedState.cartProducts.findIndex(cp => cp._id === action.payload)
            if (updatedState.cartProducts[index].quantity > 1) {
                updatedState.cartProducts[index].quantity--
            } else {
                updatedState.cartProducts[index].quantity = 1
            }
            return updatedState

        case ActionTypes.SEARCH_CHANGE:

            updatedState.search.value = action.payload.value
            if(action.payload.value === ""){
                updatedState.filteredProducts = {
                    ...updatedState.filteredProducts,
                    search: action.payload
                }
            }
            return updatedState

        case ActionTypes.FILTER_SEARCH_CHANGE:
            updatedState.filteredProducts = {
                ...updatedState.filteredProducts,
                search: action.payload
            }
            return updatedState

        case ActionTypes.CLEAR_AUTH_USER_DATA:
            updatedState.cartProducts = null
            updatedState.wishlist = null
            return updatedState

        default:
            return state
    }
}

export default productsReducer
