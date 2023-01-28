import React, {lazy, Suspense} from 'react'
import {connect} from "react-redux"
import {
    AddCartPayload, AddWishlistPayload,
    clearProductDetails,
    deleteProduct,
    fetchProduct, toggleHandleCart, toggleHandleWishlist
} from "src/store/actions/productAction"

import {NavigateFunction} from "react-router-dom"


import Loader from "UI/Loader/Loader";



import "./product_details.scss"
import fullLink from "src/utils/fullLink";

import {RootStateType} from "store/index";
import {ProductDetailType} from "store/types/prouductReduceTypes";
import api from "apis/api";

import Helmet from "react-helmet";
import {CartProductType, ProductType, WishList} from "reducers/productReducer";


// Import Swiper React components
import {Swiper, SwiperSlide} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import {ActionTypes} from "actions/actionTypes";
import {Dispatch} from "redux";

import WithNavigate from "src/Hoc/WithNavigate";
import WithParams from "src/Hoc/WithParams";
import Button from "UI/Button/Button";
import {BsStar, FaHeart} from "react-icons/all";
import ProductDetailsSkeleton from "pages/ProductPage/ProductDetails/ProductDetails.Skeleton";

const QuestionAnswer = lazy(() => import("pages/ProductPage/ProductDetails/QuestionAnswer"));
const UserReviewRatings = lazy(() => import("pages/ProductPage/ProductDetails/UserReviewRatings"));
const Slats = lazy(() => import("pages/ProductPage/ProductDetails/Slats"));


interface Props {
    productDetails: any,
    isLoading: boolean,
    cartProducts: CartProductType[],
    wishlist: WishList[],
    auth: object,
    dispatch: Dispatch
    navigate: NavigateFunction
    fetchProduct: any
    params: { productId: string },
    toggleHandleCart: (arg0: AddCartPayload) => void,
    toggleHandleWishlist: (arg0: AddWishlistPayload) => void,
}

interface State {
    productDetail: ProductDetailType,

    detail: {
        colors: string[],
        createdAt: Date
        description: string,
        detail: object,
        highlights: string[],
        productId: string
        ram: number[],
        storage: number[]
        questions?: object[]
        updatedAt: Date,
        _id: string

    }
    amountOfRate: {
        [key: number]: number
    },
    allStar: number
    currentPageForReview: number
}


const FAKE_POST_DETAIL = "63a48393355d872777f973d2"

class ProductDetails extends React.Component<Readonly<Props>, Readonly<State>> {


    constructor(props: Readonly<Props>) {

        super(props);
        this.state = {
            productDetail: {
                attributes: null,
                author_id: "",
                avatar: "",
                brand_id: "",
                brand_name: "",
                rate: 0,
                cover: "",
                created_at: "",
                description: "",
                discount: 0,
                email: "",
                _id: "",
                price: 0,
                seller_id: "",
                stock: "",
                tags: "",
                title: "",
                updated_at: "",
                specification_id: 0,
                username: "",
                highlights: null,
                product_questions: null,
                reviews: null,
                specifications: null,
                colors: null,
                ram: null,
                storage: null
            },
            detail: {
                colors: [],
                createdAt: null,
                description: "",
                detail: {},
                highlights: [],
                productId: null,
                ram: [],
                storage: [],
                updatedAt: null,
                _id: null
            },
            amountOfRate: {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
            },
            currentPageForReview: 1,
            allStar: 0
        }

        this.handleBuy = this.handleBuy.bind(this)
    }

    rating = [
        {rating: 1, amount: 10},
        {rating: 2, amount: 30},
        {rating: 3, amount: 10},
        {rating: 4, amount: 20},
        {rating: 5, amount: 20},
    ]


    async componentDidMount() {

        const {productId} = this.props.params
        /// fetch product with id
        // this.props.fetchProduct(productId)

        try {
            const response = await api.get(`/api/product/${productId}`)

            if (response.status === 200) {
                if (response.data._id) {
                    let {attributes} = response.data
                    try {
                        attributes = attributes && JSON.parse(attributes)
                    } catch (ex) {

                    }

                    this.setState((prevState: State): State => {
                        return {
                            ...prevState,
                            productDetail: {
                                ...prevState.productDetail,
                                _id: response.data._id,
                                stock: response.data.stock,
                                averageRate: response.data.averageRate,
                                title: response.data.title,
                                brand_id: response.data.brand_id,
                                brand_name: response.data.brand_name,
                                description: response.data.description,
                                price: response.data.price,
                                author_id: response.data.author_id,
                                cover: response.data.cover,
                                discount: response.data.discount,
                                tags: response.data.tags,
                                attributes: attributes,
                                created_at: response.data.created_at,
                                updated_at: response.data.updated_at,
                                username: response.data.username,
                                avatar: response.data.avatar,
                                email: response.data.email
                            }
                        }
                    })

                    await this.fetchProductDetail(FAKE_POST_DETAIL) // fake product data for re use able all data
                }
            }
        } catch (ex) {
            // console.log(ex)
        }
    }


    handleBuy() {
        this.props.dispatch({
            type: ActionTypes.SET_CHECKOUT_PRODUCTS,
            payload: {
                products: [
                    {
                        _id: this.state.productDetail._id,
                        title: this.state.productDetail.title,
                        cover: this.state.productDetail.cover,
                        price: this.state.productDetail.price,
                        quantity: 1
                    }
                ],
                totalPrice: this.state.productDetail.price
            }
        })

        this.props.navigate("/order/checkout")

    };


    fetchProductDetail = async (productId: string) => {
        // fetch product product_specification

        //? Note i use specification details for all from product specification for product id 1
        const response = await api.get(`/api/product/detail/${productId}`)

        if (response.status === 200 && response.data) {

            this.setState((prevState: State): State => {
                return {
                    ...prevState,
                    detail: response.data
                }
            })
        }
    }


    isInCart = (id: string) => {
        let i = this.props.cartProducts?.findIndex(cp => cp.product_id.toString() === id.toString())
        return i !== -1
    }


    isInWished = (id: string) => {
        let i = this.props.wishlist?.findIndex(cp => cp.product_id.toString() === id.toString())
        return i !== -1
    }


    render() {
        const {productDetail, detail, currentPageForReview, amountOfRate} = this.state

        return (
            <div className="container-1400 px-4 product_detail_page ">

                {productDetail && productDetail._id ? (
                    <div className="product_detail bg-white ">

                        <Helmet>
                            <link rel="canonical"
                                  href={`https://phone-mela.vercel.app/product/${productDetail.title}`}/>
                            <title>{productDetail.title} on phone-mela.vercel.app</title>
                        </Helmet>

                        <div className="page_wrapper2">
                            <div className="left_sidebar2">
                                <div className="left_sidebar_content">
                                    <div className="product_cover flex-2">

                                        <div className="flex-1">
                                            <div className="">
                                                <div className="cover_root">
                                                    <div>
                                                        <img src={fullLink(productDetail.cover)} alt=""/>
                                                    </div>
                                                </div>
                                                <div className="product_cover_thumbs mt-8">
                                                    <Swiper
                                                        slidesPerView={5}
                                                        spaceBetween={30}
                                                        loop={true}
                                                        loopFillGroupWithBlank={true}
                                                        navigation={false}
                                                        className="mySwiper"
                                                    >
                                                        {new Array(10).fill("1").map(item => (
                                                            <div>
                                                                <div className="thumb_pic">
                                                                    {/*<img src={fullLink(productDetail.cover)} alt=""/>*/}
                                                                    <SwiperSlide>
                                                                        <img src={fullLink(productDetail.cover)} alt=""/>
                                                                    </SwiperSlide>
                                                                </div>
                                                            </div>
                                                        ))}

                                                    </Swiper>

                                                </div>
                                            </div>

                                            <h4 className="text-center font-medium text-xl mt-10">{productDetail.stock ? productDetail.stock + " Stock" :
                                                <span className="text-red-300">Out of Stock</span>}</h4>


                                            <div className="flex justify-center mt-4">
                                                <Button onClick={() => this.props.toggleHandleCart({
                                                    title: productDetail.title,
                                                    price: productDetail.price,
                                                    cover: productDetail.cover,
                                                    product_id: productDetail._id
                                                })}
                                                        className="bg-secondary-400 font-normal text-white text-xl px-4 py-2 mr-1">{this.isInCart(productDetail._id) ? "Remove from cart" : "Add to Cart"}</Button>

                                                <Button onClick={this.handleBuy}
                                                        className={`bg-primary-400  font-normal text-white text-xl px-4 py-2 ${!productDetail.stock && 'btn-disable'}`}>Buy
                                                    Now
                                                </Button>
                                            </div>
                                        </div>

                                        <div className={["heart_btn", this.isInWished(productDetail._id) ? "active" : ""].join(" ")}>
                                            <FaHeart
                                                onClick={() => this.props.toggleHandleWishlist({
                                                    title: productDetail.title,
                                                    price: productDetail.price,
                                                    cover: productDetail.cover,
                                                    product_id: productDetail._id
                                                })}
                                            />
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="content mx-2 md:mx-3">
                                <div className="">
                                    <h1 className="text-3xl font-semibold my-4 ">{productDetail.title}</h1>
                                    <div className="flex items-center">
                    <span className="bg-primary-400 px-1.5 py-0.5 text-sm relative text-white rounded-[3px] mr-1.5 flex items-center">
                      <span>{this.state.productDetail.averageRate || 4.4}</span>
                      <span className="relative -top-[1px] ml-1">
                          <BsStar className="text-xs"/>
                      </span>
                    </span>
                                        <h4>{productDetail.reviews?.length} Ratings</h4>
                                    </div>

                                    <div>
                                        <h1 className="mt-4">
                                            {productDetail.discount && productDetail.discount !== 0
                                                ? (
                                                    <>
                                                        <span>TK {this.newPrice(productDetail.price, productDetail.discount)}</span>
                                                        <span
                                                            className="text-sm ml-2 text-gray-400 line-through text-secondary-400">{productDetail.price}</span>
                                                        <span
                                                            className="text-sm ml-2 font-medium text-primary-400 ">{productDetail.discount}% off</span>
                                                    </>
                                                )
                                                : (
                                                    <h1>TK {productDetail.price}</h1>
                                                )}
                                        </h1>
                                    </div>

                                    <div className="sec ">
                                        <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">{productDetail.brand_name}</h1>
                                        <span className="text-gray-900 text-sm">1 Year Warranty for Mobile and 6 Months for Accessories Know More</span>
                                    </div>

                                    <div className="sec ">
                                        <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">Seller</h1>
                                        <ul className="text-gray-900 text-sm">
                                            <li className="list-disc ml-3 mt-1">PETILANTE Online 4.7</li>
                                            <li className="list-disc ml-3 mt-1">7 Days Replacement Policy?</li>
                                            <li className="list-disc ml-3 mt-1">GST invoice available?</li>
                                        </ul>
                                    </div>


                                    <div className="sec">
                                        {ProductDetails.renderTwoColSection("Color variant",
                                            this.state.detail.colors,
                                            (colors: { v: string, url: string }[]) => <ul className="color_image_gallery">
                                                {colors.map((color: any) => (
                                                    <li className="mr-3 border px-2 py-1 rounded border-primary-300/30">
                                                        {/*<img src={fullLink(color.url)} alt=""/>*/}
                                                        <span className="text-sm font-normal">{color}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="sec">
                                        {ProductDetails.renderTwoColSection("Storage",
                                            this.state.detail.storage,
                                            (storage) => storage.map((s) => <span
                                                className="mr-3 border px-2 py-1 rounded border-primary-300/30">{s}GB</span>))}
                                    </div>
                                    <div className="sec">
                                        {ProductDetails.renderTwoColSection("Ram",
                                            this.state.detail.ram,
                                            (ram: string[]) => ram.map((s, i) => <span
                                                className="mr-3 border px-2 py-1 rounded border-primary-300/30">{s}GB</span>)
                                        )}
                                    </div>
                                    <div className="sec">
                                        {ProductDetails.renderTwoColSection(
                                            "Highlights",
                                            this.state.detail.highlights,
                                            (data: any) => (
                                                <ul className="text-gray-900 text-sm">
                                                    {
                                                        data.map((d: string, i: number) =>
                                                            <li className="list-disc ml-3 mt-1" key={i}>{d}</li>
                                                        )
                                                    }
                                                </ul>
                                            )
                                        )}
                                    </div>

                                    <div className="sec ">
                                        {ProductDetails.renderTwoColSection("Description",
                                            detail?.description,
                                            (description: any) => <p className="whitespace-pre-wrap text-gray-900 text-sm">{description}</p>
                                        )}
                                    </div>

                                    <Suspense fallback={<h1>Loading...</h1>}>
                                        <Slats detail={detail} productDetail={this.state.productDetail}/>
                                    </Suspense>

                                    <div className="sec">
                                        <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">Disclaimer</h1>
                                        <p className="mt-0 whitespace-pre-wrap text-gray-900 text-sm">We can not guarantee that the
                                            information on this page is 100% correct. Read more</p>
                                    </div>

                                    <Suspense fallback={<h1>Loading...</h1>}>
                                        <QuestionAnswer/>
                                    </Suspense>


                                    <Suspense fallback={<h1>Loading...</h1>}>
                                        <UserReviewRatings productDetail={this.state.productDetail}/>
                                    </Suspense>


                                </div>
                            </div>
                        </div>

                    </div>

                ) : (
                    <div className="container-1400 mt-4">
                        <ProductDetailsSkeleton />
                    </div>
                )}

            </div>
        )
    }

    handleError(e: any) {
        let p = e.target.parentElement
        p.removeChild(e.target)
    }

    private static renderTwoColSection(name: string, data: string | any[] | null, sectionRender: (args: any) => any) {

        return (
            <>
                <h1 className="sec_label font-normal text-[14px]  min-w-[150px]">{name}</h1>
                <ul>
                    {data
                        ? Array.isArray(data)
                            ? data.length === 0
                                ? <Loader className="small_loader"/>
                                : sectionRender(data)
                            : sectionRender(data)
                        : <Loader className="small_loader"/>
                    }
                </ul>
            </>
        )
    }


    private renderHighlight() {
        return ProductDetails.renderTwoColSection(
            "Highlights",
            this.state.productDetail.highlights,
            (data: any) => data.map((highlight: any, i: number) => (
                <li key={i}>{highlight}</li>
            ))
        )
    }

    private calculateRate1(price: string, discount: string) {
        let off = ((4 * Number(price) / 100))
        return Math.round(Number(price) - off)
    }

    private newPrice(price: number, discount: number) {
        let off = (Number(discount) * Number(price)) / 100
        return (Number(price) - off).toFixed(2)
    }
}

const mapStateToProps = (state: RootStateType, p: any) => ({
    p: p,
    productDetails: state.productState.productDetails,
    checkout: state.productState.checkout,
    isLoading: state.productState.isLoading,
    auth: state.auth,
    brands: state.productState.brands,
    cartProducts: state.productState.cartProducts,
    wishlist: state.productState.wishlist
})


export default connect(mapStateToProps, {
    fetchProduct,
    deleteProduct,
    clearProductDetails,
    toggleHandleCart,
    toggleHandleWishlist,
    dispatch: (dispatch: Dispatch) => dispatch
})(WithNavigate(WithParams(ProductDetails)))

