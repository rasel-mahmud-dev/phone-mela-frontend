import React, {SyntheticEvent, useEffect, useState} from 'react';
import fullLink from "../../../utils/fullLink";
import Pagination from "UI/Pagination/Pagination";
import api, {getApi} from "apis/api";
import {TbStar} from "react-icons/all";
import AccountInfo from "pages/Dashboard/Customer/AccountInfo/AccountInfo";
import RatingChooser from "components/RatingChooser/RatingChooser";
import Modal from "UI/Modal/Modal";
import Input from "UI/Form/Input/Input";
import Button from "UI/Button/Button";
import productDetails from "pages/ProductPage/ProductDetails/ProductDetails";
import {toast} from "react-toastify";
import {stat} from "fs";
import errorMessage from "../../../response/errorResponse";

const UserReviewRatings = (props) => {

    const {_id, title,} = props.productDetail

    const rating = []

    const [state, setState] = useState({
        amountOfRate: 0,
        allStar: [],
        // totalAverageRate: Number((allStar / totalRate).toFixed(1)),
        reviews: []
    })

    useEffect(() => {
        fetchProductReviews()
    }, [])


    const fetchProductReviews = async (productId: string | number) => {
        // fetch product Questions and Answers

        //!Note i use reviews for all from product review for product id 1
        const response: any = await api.get(`/api/reviews/${_id}`)
        if (response.status === 200) {
            setState((prevState) => {


                let stars = {
                    1: 0,
                    2: 0,
                    3: 0,
                    4: 0,
                    5: 0
                }

                response.data && response.data.map(review => {
                    switch (true) {
                        case review.one_star !== 0:
                            stars["1"] += 1
                            break

                        case review.two_star !== 0:
                            stars["2"] += 1
                            break

                        case review.three_star !== 0:
                            stars["3"] += 1
                            break

                        case review.four_star !== 0:
                            stars["4"] += 1
                            break

                        case review.five_star !== 0:
                            stars["5"] += 1
                            break

                        default:
                            return 0
                    }
                    // subTotalRate += (rate.rating * rate.amount)
                    // totalAmount += rate.amount

                })

                let allStar = 0
                let totalRate = 0
                let starKey: any

                for (starKey in stars) {
                    allStar += (starKey * stars[starKey])
                    totalRate += stars[starKey]
                }

                return {
                    ...prevState,
                    amountOfRate: stars,
                    allStar: allStar,
                    // totalAverageRate: Number((allStar / totalRate).toFixed(1)),

                    reviews: response.data

                }
            })

            // let { created_at, customer_id, customer_uploads, customer_avatar, product_id, rate, review_id, summary, title } = response.data
            // try {
            //   specifications = specifications && JSON.parse(specifications)
            //   colors = specifications && JSON.parse(colors)
            //   highlights = highlights && JSON.parse(highlights)
            //   ram = ram && JSON.parse(ram)
            //   storage = storage && JSON.parse(storage)
            //
            // } catch (ex ){
            //
            // }
            //
            // this.setState((prevState: State): State => {
            //   let specifications = null;
            //   try {
            //     specifications = response2.data.specifications && JSON.parse(response2.data.specifications)
            //   } catch (ex ){
            //
            //   }
            //   return {
            //     ...prevState,
            //     productDetail: {
            //       ...prevState.productDetail,
            //       description: description,
            //       specifications: specifications ? specifications : null ,
            //       colors: colors ? colors : null ,
            //       highlights: highlights ? highlights : null ,
            //       ram: ram ? ram : null ,
            //       storage: storage ? storage : null,
            //       specification_id: specification_id
            //     }
            //   }
            // })
        }
    }


    function calculateRate() {

        let subTotalRate = 0
        let totalAmount = 0
        state.reviews && state.reviews.map(review => {
            // subTotalRate += (rate.rating * rate.amount)
            // totalAmount += rate.amount
        })

        return (subTotalRate / totalAmount).toFixed(1)
    }

    function getTime(timestamp: number) {
        return new Date(timestamp * 1000).toLocaleString()
    }


    function totalRating() {
        let totalAmount = 0
        this.rating.map(rate => {
            totalAmount += rate.amount
        })
        return 15
    }


    function renderRatings() {


        return (
            <div className="rating_ flex-1 flex justify-between items-center">
                <div className="rating_left flex-1">
                    <div className="flex items-center justify-center">
                        <h1 className="big_rating_num ">
                            {state.averageRate}
                        </h1>
                        {/*<FontAwesomeIcon icon={faStar} className="text-4xl text-dark-800"/>*/}
                    </div>
                    <div className="total_rating_count">
                        <h2>{state.reviews?.length} ratings</h2>
                        <h2>&</h2>
                        <h2>reviews</h2>
                    </div>
                </div>
                <div className="rating_right flex-1">
                    {Object.keys(state.amountOfRate).map(rate => (
                        <div className="flex items-center">
                <span className="flex items-center">
                  <span className="text-dark-800 text-[13px] font-normal" style={{width: "10px"}}>{rate} </span>
                    {/*<FontAwesomeIcon className="text-dark-800 text-[13px] font-normal" icon={faStar}/>*/}
                </span>
                            <div className="rating_bar ml-2">
                                <span
                                    style={{width: ((state.amountOfRate[rate] * 100) / (state.reviews ? state.reviews.length : 0)) + "%"}}
                                    className="color_bar"/>
                            </div>
                            <span className="total_rating_num  ml-2 min-w-[10px]">
                  <span className="text-dark-800 text-[13px] font-normal">{state.amountOfRate[rate]}</span>
                </span>
                        </div>
                    ))}

                    {/*<div className="flex items-center">*/}
                    {/*    <span className="flex items-center">*/}
                    {/*      <span>5</span>*/}
                    {/*      <FontAwesomeIcon className="ml-2" icon={faStar} />*/}
                    {/*    </span>*/}
                    {/*  <div className="rating_bar ml-2">*/}
                    {/*    <span className="color_bar"/>*/}
                    {/*  </div>*/}
                    {/*  <span className="total_rating_num  ml-2">*/}
                    {/*      <span>50</span>*/}
                    {/*    </span>*/}
                    {/*</div>*/}
                </div>
            </div>
        )
    }

    function fetchMoreReview(pageNumber: number) {
        // this.setState(prevState => {
        //     return {
        //         ...prevState,
        //         currentPageForReview: pageNumber
        //     }
        // })
    }

    let pageNumber = 1
    let currentPageForReview = 1


    const [ratingState, setRatingState] = useState({
        rate: 0,
        title: "",
        summary: ""
    })

    function handleChange(e) {
        setRatingState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    function handleAddReview(e: SyntheticEvent<HTMLFormElement>){
        e.preventDefault();


        let a = e.target as any;

        let title = (a.title as HTMLInputElement).value
        let summary = (a.summary as HTMLInputElement).value

        if(!(title && summary && ratingState.rate)){
            return toast.info("Please provide al fields")
        }

        getApi().post("/api/review", {
            product_id: _id,
            title,
            rate: ratingState.rate,
            summary
        }).then(({status, data}) => {
            if(status === 201){
                toast.success("Review Added successfully")
               setOpenAddRatingModal(false)
                setState((prevState=>({
                    ...prevState,
                    reviews: [
                        data,
                        ...state.reviews,
                    ]
                })))
            }
        }).catch(ex=>{
            return toast.error(errorMessage(ex))
        })

    }


    function addRatingModal() {
        return (
            <form onSubmit={handleAddReview}>
                <RatingChooser onChange={handleChange} name="rate" label="Rate" defaultValue={ratingState.rate} total={5}/>
                <Input name="title" label="Title" />
                <Input name="summary" type="textarea" label="Summary" />

                <Button type="submit" className="btn-primary">Submit</Button>

            </form>
        )
    }

    const [isOpenAddRatingModal, setOpenAddRatingModal] = useState(true)


    return (
        <div>
            <div className="">

                <Modal isOpen={isOpenAddRatingModal} className="max-w-lg" backdropClass="bg-dark-900/80" onClose={()=>setOpenAddRatingModal(false)}>
                    {addRatingModal()}
                </Modal>


                <div className="flex justify-between items-center">
                    <h1 className="sec_label font-normal text-base min-w-[150px]">All User Opinions and Reviews</h1>
                    <button className="btn bg-primary-400 text-white" onClick={()=>setOpenAddRatingModal(true)}>Rate This</button>
                </div>
                <h2 className="mt-5 font-normal text-[14px]">{title} - USER OPINIONS AND REVIEWS AND
                    RATINGS</h2>
            </div>

            <div className="sec">
                {renderRatings()}
            </div>

            <div className="mt-8">

                {state.reviews &&
                    state.reviews.slice(
                        (currentPageForReview === 1 ? 0 : (currentPageForReview - 1) * 5),
                        (currentPageForReview * 5)
                    ).map(review => (
                        <div className="border-b border-gray-200 py-4">

                            <h1 className="font-normal flex items-center gap-x-1">
                                <span className="flex items-center gap-x-1 bg-primary-400 text-white px-2.5 py-1 rounded text-sm">
                                    <span>{review.rate}</span>
                                    <TbStar className="text-sm"/>
                                </span>
                                {review.title}</h1>
                            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">{review.summary}</p>


                            <div className="flex mt-4 relative">
                                <div className="flex">
                                    {new Array(review.rate).fill(1).map(s => (
                                        <div className="mr-1">
                                            {/*<FontAwesomeIcon className="text-xs text-dark-100" icon={faStar} />*/}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex absolute left-0">
                                    {new Array(3).fill(1).map(s => (
                                        <div className="mr-1">
                                            {/*<FontAwesomeIcon className="text-xs text-orange" icon={faStar} />*/}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex">
                                <img className="w-4 mr-1 rounded-full"
                                     src={fullLink(review?.customer?.avatar)} alt=""/>
                                <h4 className="text-[13px]">
                                    <span className="font-normal">{review?.customer?.first_name}</span>
                                    <span className="ml-8">{new Date(review.created_at).toDateString()}</span>
                                </h4>
                            </div>

                        </div>
                    ))}

                {/* Review pagination  */}
                <div className="flex justify-center">
                    <Pagination
                        totalProducts={state.reviews ? state.reviews.length : 0}
                        perPageShow={5}
                        currentPage={currentPageForReview}
                        onPageChange={(pageNumber) => fetchMoreReview(pageNumber)}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserReviewRatings;