import React, {useEffect, useRef} from "react";
import {connect, useDispatch} from "react-redux";
import { logoutAction} from "src/store/actions/authAction";

import "./Navigation.scss";

import {useLocation, useNavigate} from "react-router-dom";
import Modal from "UI/Modal/Modal";
import {toggleSearchBar, toggleSideBar} from "actions/toolsAction";

import {onFilterSearchChange, onSearchChange} from "actions/productAction";
import Preload from "UI/Preload/Preload";
import Avatar from "src/components/Avatar/Avatar";
import useWindowResize from "src/hooks/useWindowResize";
import {BiShoppingBag, BiUser} from "react-icons/bi";
import {HiOutlineShoppingBag} from "react-icons/hi";
import {FaAngleDown, FaHeart, FaSearch, FaSignInAlt, FaSignOutAlt, FaTimes, FaUserAlt} from "react-icons/all";

const offerText =
    "ফোন মেলা এর যেকোনো আউটলেট অথবা অনলাইন শপ\n" +
    "থেকে নির্দিষ্ট ব্র্যান্ডের স্মার্টফোন কিনলেই পাচ্ছেন\n" +
    "আকর্ষণীয় গিফট! Samsung, Xiaomi, Oppo, Nokia এই ঈদে দিচ্ছে বিশাল ডিসকাউন্ট এবং সাথে থাকছে অনেক গিফট | যোগাযোগ ইমেইল rasel.mahmud.dev@gmail.com, ফোন ০১৭৮৫৫১৩৫৩৫";

const Navigation = (props) => {
    const {auth: {auth}, totalCartProducts, search} = props;
    const navigationRef = useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    let width = useWindowResize()


    const [isShow_authMenuPanelId, set_authMenuPanelId] = React.useState(null);
    const [expandDropdown, setExpandDropdown] = React.useState("");
    const [showSearchBar, setShowSearchBar] = React.useState(false);
    const [showSidebarButton, setShowSidebarButton] = React.useState(false);

    const searchInputRef = React.useRef();

    function toggleAuthMenuPanel(e) {
        if (e.target.dataset.set === isShow_authMenuPanelId) {
            set_authMenuPanelId(null);
        } else {
            set_authMenuPanelId(e.target.dataset.set ? e.target.dataset.set : null);
        }
    }

    function handleLogOut() {
        logoutAction(dispatch, () => {
            setExpandDropdown("_");
            navigate("/");
        });
    }

    function authDropdown(isShow) {
        let callback = location.pathname + location.search;

        return (
            isShow && (
                <div className="dropdown_nav rounded-md py-4">
                    <ul className="min-w-[200px] bg-white text-sm font-normal">
                        {auth ? (
                            <>
                                {auth.role === "admin" && (
                                    <li className="auth-menu__item">
                                        <FaUserAlt className="mr-2 text-gray-800"/>
                                        <Preload
                                            onClickCallback={() => setExpandDropdown("_")}
                                            className="font-normal text-gray-800"
                                            onClick={() => setExpandDropdown("_")}
                                            to="/admin/dashboard"
                                        >
                                            Dashboard
                                        </Preload>
                                    </li>
                                )}

                                <li className="auth-menu__item">
                                    <Preload
                                        onClickCallback={() => setExpandDropdown("_")}
                                        className="text-sm font-normal"
                                        to={`/dashboard`}
                                    >
                                        <FaUserAlt  className="mr-2 dark_title text-gray-800"/>
                                        Profile
                                    </Preload>
                                </li>

                                <li className="auth-menu__item">
                                    <Preload
                                        onClickCallback={() => setExpandDropdown("_")}
                                        className=""
                                        to={`/dashboard/wishlist`}
                                    >
                                        <FaHeart
                                            className="mr-2 dark_title text-gray-800 block w-10"
                                        />
                                        My Wishlist
                                    </Preload>
                                </li>

                                <li className="auth-menu__item">
                                    <Preload onClickCallback={() => setExpandDropdown("_")} className="" to={`/dashboard/carts`}>
                                        <BiShoppingBag

                                            className="mr-2 w-4 dark_title text-gray-800"
                                        />
                                        My Cart
                                    </Preload>
                                </li>

                                <li onClick={handleLogOut} className="auth-menu__item ">
                                    <FaSignOutAlt  className="mr-2 dark_title text-gray-800"/>
                                    Logout
                                </li>
                            </>
                        ) : (
                            <li
                                className="auth-menu__item"
                                // onClick={()=> pushRoute("/auth/login") }
                            >
                                <Preload
                                    onClickCallback={() => setExpandDropdown("_")}
                                    className="block w-full text-gray-800"
                                    to={`/auth/login?callback=${callback}`}
                                >
                                    <FaSignInAlt className="mr-2 text-gray-800" />
                                    Login
                                </Preload>
                            </li>
                        )}
                    </ul>
                </div>
            )
        );
    }


    function handleSetExpandDropdown(s) {
        setExpandDropdown(s);
    }

    function openMenuHandler() {
    }

    function calculateSpace() {
        const leftSidebar = document.querySelector(".left_sidebar");
        let content = document.getElementById("content");
        const d = document.querySelector(".d");
        const navi = document.querySelector(".navigation");
        const footer = document.querySelector(".footer");

        if (d && navi) {
            d.style.height = navi.offsetHeight + "px";
        }
        if (leftSidebar && navi) {
            leftSidebar.style.top = navi.offsetHeight + "px";
        }

        if (!content) {
            setTimeout(() => {
                content = document.getElementById("content");
            }, 10);
        }


        // if(content && navi && footer){
        //   content.style.height = `calc(100vh - ${navi.offsetHeight + footer.offsetHeight}px)`
        // }
        // console.log(content )
    }


    useEffect(() => {
        setShowSearchBar(!!search);
        calculateSpace();

        if (navigationRef.current) {
            document.documentElement.style.setProperty(`--header-height`, navigationRef.current.offsetHeight + "px")
        }

    }, [width, navigationRef.current])


    let whiteLists = ["/", "/q", "/auth/customer", "/admin/dashboard", "/auth/customer/account-info"];

    React.useEffect(() => {
        // whiteList = ["/", "/q/", "/auth/customer", "/admin/dashboard", "/auth/customer/account-info"]
        if (whiteLists.indexOf(location.pathname) !== -1) {
            setShowSidebarButton(true);
        } else if (location.pathname.indexOf("auth/customer") !== -1) {
            setShowSidebarButton(true);
        } else {
            setShowSidebarButton(false);
        }
    }, [location]);

    React.useEffect(() => {
        showSearchBar && callBack();
    }, [showSearchBar]);

    const callBack = () => {
        searchInputRef.current && searchInputRef.current.focus();
    };

    function openSearchPanel() {
        setShowSearchBar(!showSearchBar);
    }

    function renderSearchBar() {
        return (
            <div className="search_input_wrapper">
                <input type="text" placeholder="Enter Search Products"/>
            </div>
        );
    }

    function handleSearch(e) {
        e.preventDefault();
        // let val = searchInput.current?.value
        dispatch(onFilterSearchChange(search));
        if (search !== "") {
            return Preload.Load("/q", () => {
                navigate("/q/?search=" + search);
            });
        }
    }

    function onChangeSearch(e) {
        if (e.target.value === "") {
            dispatch(onFilterSearchChange(""));
            dispatch(onSearchChange(""));
            return Preload.Load("/q", () => {
                navigate("/q");
            });
        } else {
            dispatch(onSearchChange(e.target.value));
        }
    }

    function handleToggleSideBar() {
        dispatch(
            toggleSideBar({
                isOpen: true,
            })
        );
    }

    function handleSearchClear() {
        dispatch(onFilterSearchChange(""));
        dispatch(onSearchChange(""));
        return Preload.Load("/q", () => {
            navigate("/q");
        });
    }


    return (
        <>
            <div ref={navigationRef} className="navigation select-none bg-primary-400 text-light-600" id="navigation">
                <div className="container-1400 flex-1 px-2">
                    {/* top_navigation hide on mobile view */}
                    <div className="md:flex justify-between hidden pt-3">
                        <div className="flex items-center gap-x-2">
                            <a
                                target={"_blank"}
                                href="https://www.facebook.com/raselmraju"
                                className="top_navigation__icon_item"
                            >
                                {/*<FontAwesomeIcon icon={faFacebookF}/>*/}
                            </a>
                            <a
                                target={"_blank"}
                                href="https://rasel-portfolio.vercel.app"
                                className="top_navigation__icon_item"
                            >
                                {/*<FontAwesomeIcon icon={faGlobe}/>*/}
                            </a>
                            <a
                                target={"_blank"}
                                href="https://github.com/rasel-mahmud-dev"
                                className="top_navigation__icon_item"
                            >
                                {/*<FontAwesomeIcon icon={faGithub}/>*/}
                            </a>
                        </div>
                        <div className="flex-1 px-0 sm:px-4">
                            <marquee className="text-sm font-light flex" behavior="slider">
                                {offerText}
                            </marquee>
                        </div>
                        <div className="hidden sm:flex">
                            <span className="top_navigation_item items-center flex">
                                {/*<FontAwesomeIcon icon={faFlagUsa} className="text-xs"/>*/}
                                <a className="hover:text-primary-400 cursor-pointer ml-1 text-sm">EN</a>
                            </span>
                        </div>
                    </div>

                    <div className="main_nav !mb-0 sm:!mb-[10px]">
                        <div className="left_nav ">
                            {/*{ showSidebarButton && <FontAwesomeIcon onClick={handleToggleSidebar} className="block md:hidden text-xl text-dark-5 mr-2" icon={faBars} />}*/}

                            <Preload to="/" className="flex items-center text-decoration-none text-initial">
                                <div className="w-36 md:w-40">
                                    <img className="w-full" src="/Group3.png" alt=""/>
                                </div>
                            </Preload>
                        </div>

                        <div className="center_nav bg-light-900/10 py-2 px-4 rounded-md text-light-900 hidden lg:block ">
                            <form onSubmit={handleSearch} className="w-full">
                                <div className="nav-search flex items-center">
                                    <input
                                        ref={searchInputRef}
                                        value={search}
                                        className="bg-transparent outline-none border-none w-full placeholder-dark-50"
                                        onChange={onChangeSearch}
                                        type="text"
                                        placeholder="Search products"
                                    />
                                    {search && (
                                        <button type="button" className="search_clear_icon mr-3">
                                            <FaTimes  onClick={handleSearchClear}/>
                                        </button>
                                    )}
                                    <button type="submit" className="search_icon">
                                        <FaSearch onClick={handleSearch}/>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="right_nav justify-content-end">
                            {((search && showSearchBar) || showSearchBar) && (
                                <div className="floating_search_wrapper">
                                    <div className="w-full floating_search_backdrop" onClick={() => setShowSearchBar(false)}></div>
                                    <div className="floating_search">
                                        <div className="input_wrapper">
                                            <form onSubmit={handleSearch} className="w-full">
                                                <input
                                                    ref={searchInputRef}
                                                    value={search}
                                                    onChange={onChangeSearch}
                                                    type="text"
                                                    placeholder="Enter Product Name"
                                                />
                                            </form>
                                            <FaSearch onClick={handleSearch}  className="text-lg"/>
                                        </div>
                                    </div>
                                </div>
                            )}


                            <li onClick={handleToggleSideBar}
                                className="nav_item flex md:!hidden w-8 h-8  items-center justify-center bg-white/10 rounded-full">
                                <FaAngleDown className="text-light-500"/>
                            </li>

                            <li onClick={openSearchPanel} className="nav_item block md:!hidden">
                                <FaSearch onClick={handleSearch} className="w-5 !text-light-500"/>
                            </li>

                            <li className="nav_item relative ">
                                <Preload to="/dashboard/carts" className="flex justify-center items-center gap-x-2">
                                    <span className="hidden text-sm font-normal sm:inline-block">My Cart</span>
                                    <HiOutlineShoppingBag className="!text-light-500 text-2xl"/>
                                    {/*<FontAwesomeIcon icon={faShoppingBag} className="!text-light-700 !text-2xl" />*/}
                                    {totalCartProducts !== 0 && <span className="badge">{totalCartProducts}</span>}
                                </Preload>
                            </li>
                            <li
                                className="nav_item relative items-center gap-x-2"
                                onMouseLeave={() => handleSetExpandDropdown("")}
                                onMouseEnter={() => handleSetExpandDropdown("user_menu")}
                                onClick={openMenuHandler}
                            >
                                <span className="hidden text-sm font-normal  sm:inline-block">My Account</span>

                                <div>
                                    {auth ? (
                                        <div className="flex items-center gap-x-1">
                                            <Avatar src={auth.avatar} username={auth.username} imgClass="w-8 h-8 !text-xs !bg-dark-900/30"
                                                    className="ml-2"/>
                                            <span>{auth.username}</span>
                                        </div>
                                    ) : (
                                        <BiUser className="text-light-500 text-2xl"/>
                                    )}
                                    {authDropdown(expandDropdown === "user_menu")}
                                </div>
                            </li>
                        </div>

                        <Modal isOpen={showSearchBar} title="Search Products">
                            <div>
                                {renderSearchBar()}
                                <button className="search_btn">Search</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            </div>
            <div className="header-height"/>
        </>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    totalCartProducts: state.productState
        ? state.productState.cartProducts
            ? state.productState.cartProducts.length
            : 0
        : 0,
    search: state.productState.search.value,
});

export default connect(mapStateToProps, {toggleSearchBar})(Navigation);