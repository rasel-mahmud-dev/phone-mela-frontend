import React from "react";
import fullLink from "../../../utils/fullLink";
import Carousel from "UI/Carousel/Carousel";

const Banner = () => {
    return (
        <Carousel>
            <div>
                <img className="swiper-lazy" data-src={fullLink("/images/nx6-slider copy.webp")} alt="" />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                    <img className="" src={fullLink("/images/nx6-slider copy_low.webp")} alt="" />
                </div>
            </div>
            <div>
                <img className="swiper-lazy" data-src={fullLink("/images/gh11-banner copy.webp")} alt="" />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                    <img className="" src={fullLink("/images/gh11-banner copy 2.webp")} alt="" />
                </div>
            </div>
            <div>
                <img className="swiper-lazy" data-src={fullLink("/images/s8-without-prebook copy.webp")} alt="" />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                    <img className="" src={fullLink("/images/s8-without-prebook copy 2.webp")} alt="" />
                </div>
            </div>
            <div>
                <img
                    className="swiper-lazy"
                    data-src={fullLink(
                        "/images/a99e09a1-9edb-45b5-81fd-a4db52828e83___d42a8f07dd542a306c582345181ce344 copy.webp"
                    )}
                    alt=""
                />
                <div className="swiper-lazy-preloader swiper-lazy-preloader-white">
                    <img
                        className=""
                        src={fullLink(
                            "/images/a99e09a1-9edb-45b5-81fd-a4db52828e83___d42a8f07dd542a306c582345181ce344 copy 2.webp"
                        )}
                        alt=""
                    />
                </div>
            </div>

            {/*<div>*/}
            {/*    <img className="swiper-lazy" data-src={fullLink("/nx6-slider.jpg")} alt=""/>*/}
            {/*    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">*/}
            {/*      <img className="" src={fullLink("/nx6-slider.jpg")} alt=""/>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <img className="swiper-lazy" data-src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653667/phone_mela/products/c7.jpg")} alt=""/>*/}
            {/*    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">*/}
            {/*      <img className="" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c7_low.jpg")} alt=""/>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*  <div>*/}
            {/*    <img className="swiper-lazy" data-src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653643/phone_mela/products/c6.jpg")} alt=""/>*/}
            {/*    <div className="swiper-lazy-preloader swiper-lazy-preloader-white">*/}
            {/*      <img className="" src={fullLink("https://res.cloudinary.com/rasel/image/upload/v1650653556/phone_mela/products/c6_low.jpg")} alt=""/>*/}
            {/*    </div>*/}
            {/*  </div>*/}
        </Carousel>
    );
};

export default Banner;