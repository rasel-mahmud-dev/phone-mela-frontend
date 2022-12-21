import React, {FC, useEffect, useRef} from "react";
import api from "apis/api";
import "./homePage.scss";
import fullLink from "../../utils/fullLink";


import {toggleHandleCart, toggleHandleWishlist} from "actions/productAction";

import {useDispatch, useSelector} from "react-redux";
import {BrandType, HomePageSectionProductsType, ProductType} from "reducers/productReducer";
import {toggleSideBar} from "actions/toolsAction";
import {RootStateType} from "store/index";
import Product from "../../Common/Product/Product";
import Helmet from "react-helmet";
import Preload from "UI/Preload/Preload";
import Carousel from "UI/Carousel/Carousel";
import {ActionTypes} from "actions/actionTypes";
import {useNavigate} from "react-router-dom";
import Banner from "pages/HomePage/components/Banner";
import HomePageSidebar from "pages/HomePage/components/HomePageSidebar";
import Sidebar from "components/Sidebar/Sidebar";
import ProductSkeleton from "../../Common/Product/Product.Skeleton";
import {FaAngleDown, FaAngleRight} from "react-icons/all";

interface HomePageProps {

}

const HomePage: FC<HomePageProps> = (props) => {
    const {
        productState: {cartProducts, homePageSectionProducts, fetchedHomePageSectionProduct, wishlist, brands},
        auth,
        tools: {isOpenSideBar},
    } = useSelector((state: RootStateType) => state);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contentRef = useRef();

    const [state, setState] = React.useState({
        products: [],
        cutOffBrands: [],
    });

    const [showBrands, setShowBrands] = React.useState<{ status: "top" | "all"; brands: BrandType[] }>({
        status: "top",
        brands: [],
    });

    useEffect(() => {
        let h = {};

        let data = Object.keys(homePageSectionProducts);
        data.push("topBrands");
        api.post(`/api/homepage-products/v2`, {
            data: data,
        }).then(({data, status}) => {
            if (status === 200) {
                dispatch({
                    type: ActionTypes.FETCH_HOMEPAGE_SECTION_PRODUCTS,
                    payload: data,
                });
            }
        }).catch(ex => {

        })
    }, []);

    function handleShowAllBrands(status: "top" | "all") {
        if (fetchedHomePageSectionProduct["topBrands"] && fetchedHomePageSectionProduct["topBrands"].length > 0) {
            setShowBrands({
                status,
                brands:
                    status === "top"
                        ? fetchedHomePageSectionProduct["topBrands"].slice(0, 15)
                        : fetchedHomePageSectionProduct["topBrands"],
            });
        }
    }

    useEffect(() => {
        handleShowAllBrands("top");
    }, [fetchedHomePageSectionProduct["topBrands"]]);

    function renderBanner(label: string, btnName: string, slug: string) {
        return (
            <div className="banner_row mt-4 px-4">
                <h1 className="text-xl font-normal">{label}</h1>
                <Preload to={`/products/${slug}`} className="link_btn flex items-center">
                    <span className="text-sm font-normal">{btnName}</span>
                    <FaAngleRight className="text-xs ml-2"/>
                </Preload>
            </div>
        );
    }


    function renderSectionHeader(label: string, slug: string) {
        return renderBanner(label, "View More", slug);
    }

    function clickOnOverlay() {
        dispatch(toggleSideBar(false))
    }

    function handleCloseSidebar() {
        dispatch(toggleSideBar(false));
    }

    function handleClickOnBrand(brand: BrandType) {
        dispatch({
            type: ActionTypes.SELECT_BRANDS,
            payload: [brand],
        });
        return Preload.Load("/q", () => {
            navigate("/q");
        });
    }

    return (
        <div>
            <Helmet>
                <link rel="canonical" href={`https://phone-mela.vercel.app`}/>
                <title>Home Page of phone-mela.vercel.app</title>
            </Helmet>

            <div className="container-1400 flex">
                <Sidebar
                    isOpenSidebar={isOpenSideBar}
                    onClose={handleCloseSidebar}
                >
                    <HomePageSidebar
                        showBrands={showBrands}
                        handleClickOnBrand={handleClickOnBrand}
                        handleShowAllBrands={handleShowAllBrands}
                        fetchedHomePageSectionProduct={fetchedHomePageSectionProduct}
                    />
                </Sidebar>

                <div className="content">


                    <div className="">
                        <Banner/>

                        <div
                            className={["page_wrapper", isOpenSideBar ? "open-sidebar" : "close-sidebar"].join(" ")}
                        >
                            <div className="w-full px-3">
                                {homePageSectionProducts &&
                                    Object.keys(homePageSectionProducts).map((section: string, i: number) => (
                                        <div key={i}>
                                            <div className="">
                                                {renderSectionHeader(homePageSectionProducts[section].label, section)}

                                                <div className="mt-2">
                                                    <div className="banner">
                                                        <Carousel>
                                                            {homePageSectionProducts[section] &&
                                                                homePageSectionProducts[section].sliderImages &&
                                                                homePageSectionProducts[section].sliderImages.map(
                                                                    (image, i) =>
                                                                        i === 0 ? (
                                                                            <div>
                                                                                <img
                                                                                    className="swiper-lazy"
                                                                                    src={fullLink(image.url)}
                                                                                    alt=""
                                                                                />
                                                                            </div>
                                                                        ) : (
                                                                            <div>
                                                                                <img
                                                                                    className="swiper-lazy"
                                                                                    data-src={fullLink(image.url)}
                                                                                    alt=""
                                                                                />
                                                                                <div
                                                                                    className="swiper-lazy-preloader swiper-lazy-preloader-white">
                                                                                    {image.low && (
                                                                                        <img
                                                                                            className=""
                                                                                            src={fullLink(image.low)}
                                                                                            alt=""
                                                                                        />
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                )}
                                                        </Carousel>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="">
                                                <div
                                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-4">
                                                    {fetchedHomePageSectionProduct[section as keyof HomePageSectionProductsType] ? (
                                                        fetchedHomePageSectionProduct[section].map(
                                                            (prod: ProductType, i: number) => (
                                                                <div className="home_product_item__wrapper">
                                                                    <Product
                                                                        key={i}
                                                                        prod={prod}
                                                                        fields={homePageSectionProducts[section].fields}
                                                                        wishlist={wishlist}
                                                                        cartProducts={cartProducts}
                                                                        // handleLoadError={} isInWished={} isInCart={}
                                                                        handleAddToCart={() =>
                                                                            dispatch(
                                                                                toggleHandleCart(
                                                                                    {
                                                                                        title: prod.title,
                                                                                        price: prod.price,
                                                                                        cover: prod.cover,
                                                                                        product_id: prod._id,
                                                                                    },
                                                                                    true,
                                                                                    1000
                                                                                )
                                                                            )
                                                                        }
                                                                        handleToggleWishlist={() =>
                                                                            dispatch(
                                                                                toggleHandleWishlist(
                                                                                    {
                                                                                        title: prod.title,
                                                                                        price: prod.price,
                                                                                        cover: prod.cover,
                                                                                        product_id: prod._id,
                                                                                    },
                                                                                    true,
                                                                                    1000
                                                                                )
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <>
                                                            {new Array(15).fill(1).map((item) => (
                                                                <ProductSkeleton className="py-4 white-bg"/>
                                                            ))}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
