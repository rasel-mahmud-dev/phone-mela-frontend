import React, { FC, useEffect } from "react";
import {connect, useDispatch} from "react-redux";
import "./App.scss";
import { fetchCurrentAuth } from "src/store/actions/authAction";
import { fetchCarts, fetchWishlist} from "src/store/actions/productAction";
import Navigation from "./Common/Navigation";
import { togglePopup } from "actions/toolsAction";
import { ToolsReducerType } from "reducers/toolsReducer";
import { RootStateType } from "store/index";
import { FILTERED_PRODUCTS_TYPE } from "store/types/prouductReduceTypes";
import Footer from "./Common/Footer/Footer";
import MyRoutes from "./MyRoutes";
import { AuthStateType } from "reducers/authReducer";
import StripeForm from "pages/CartPages/paymentPage/StripeForm";

type AppProps = {
    togglePopup: any;
    fetchCurrentAuth?: any;
    fetchCart?: any;
    fetchWishlist?: any;
    auth?: AuthStateType;
    tools: ToolsReducerType;
    filteredProducts: FILTERED_PRODUCTS_TYPE;
    cartProducts?: any[];
    wishlist?: any[];
};

const App: FC<AppProps> = (props) => {
    const {
        auth: { auth },
        tools,
    } = props;

    const dispatch = useDispatch()

    useEffect(() => {
        props.fetchCurrentAuth();
        const loader_backdrop = document.querySelector(".spin_loader_root");
        loader_backdrop && loader_backdrop.remove();
    }, []);

    useEffect(() => {
        // load Cart products when user logged
        if (auth) {
            if (!props.cartProducts || props.cartProducts.length === 0) {
                fetchCarts(dispatch)
            }

            if (!props.wishlist || props.wishlist.length === 0) {
                fetchWishlist(dispatch);
            }
        }
    }, [auth]);

    return (
        <div className="App">
            <Navigation isOpenSearchBar={tools.isOpenSearchBar} />
            <div className="main">
                <MyRoutes auth={auth} />
            </div>
            <Footer />
        </div>
    );
};

function mapStateToDispatch(state: RootStateType) {
    return {
        auth: state.auth,
        tools: state.tools,
        filteredProducts: state.productState.filteredProducts,
        cartProducts: state.productState.cartProducts,
        wishlist: state.productState.wishlist,
    };
}

export default connect(mapStateToDispatch, { fetchCurrentAuth, fetchWishlist, togglePopup })(App);
