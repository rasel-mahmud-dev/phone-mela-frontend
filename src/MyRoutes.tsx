import {lazy, Suspense} from "react";
import {useRoutes} from "react-router-dom";
import ProgressBar from "UI/ProgressBar/ProgressBar";
import AccountInfo from "pages/Dashboard/Customer/AccountInfo/AccountInfo";
import AddressBook from "pages/Dashboard/Customer/AddressBook/AddressBook";
import Orders from "pages/Dashboard/Customer/Orders/Orders";
import MyReviews from "pages/Dashboard/Customer/MyReviews/MyReviews";
import OrderDetails from "pages/Dashboard/Customer/OrderDetails/OrderDetails";
import MyCart from "pages/Dashboard/Customer/MyCart/MyCart";
import MyWishlist from "pages/Dashboard/Customer/MyWishlist/MyWishlist";
import Transactions from "pages/Dashboard/Shared/Transactions";
import PrivateRoute from "./middleware/PrivateRoute";
import Dashboard from "pages/Dashboard/Dashboard";

// this function for lazy route load...........
const ReactLazyPreload = (importStatement: any) => {
    const Component = lazy(importStatement);
    // Component.preload call when preload link clicked
    // @ts-ignore
    Component.preload = importStatement;
    return Component;
};

const HomePage = ReactLazyPreload(() => import("pages/HomePage/HomePage"));
const ProductPage = ReactLazyPreload(() => import("./pages/ProductPage/ProductPage"));
const ProductDetails = ReactLazyPreload(() => import("./pages/ProductPage/ProductDetails/ProductDetails"));

// const signupPage = ReactLazyPreload( ()=>import("./pages/signupPage/signupPage") )
const LoginPage = ReactLazyPreload(() => import("./pages/auth/loginPage/LoginPage"));
const SignupPage = ReactLazyPreload(() => import("pages/auth/signupPage/SignupPage"));
// const ProfilePage = ReactLazyPreload( ()=>import("./pages/ProfilePage/ProfilePage") )

// const Category = ReactLazyPreload(()=> import("pages/Admin/Components/Category/Category") )

// import NotFound from './pages/Exceptions/NotFoundPage/NotFoundPage'
const CartPage = ReactLazyPreload(() => import("pages/CartPages/CartPage"));
const Wishlist = ReactLazyPreload(() => import("src/pages/CartPages/wishlist/Wishlist"));
const CheckoutPage = ReactLazyPreload(() => import("pages/CartPages/checkout/CheckoutPage"));
const DashboardHome = ReactLazyPreload(() => import("pages/Dashboard/DashboardHome"));

const AdminDashboard = ReactLazyPreload(() => import("./pages/Admin/AdminDashboard/AdminDashboard"));
const ProductList = ReactLazyPreload(() => import("pages/Admin/AdminDashboard/productList/ProductList"));
const Category = ReactLazyPreload(() => import("pages/Admin/Components/Category/Category"));
const Logs = ReactLazyPreload(() => import("pages/Admin/AdminDashboard/Server/logs/Logs"));
const AddProduct = ReactLazyPreload(() => import("./pages/ProductPage/AddProduct/AddProduct"));
const MoreProducts = ReactLazyPreload(() => import("pages/ProductPage/moreProducts/MoreProducts"));

const OrderHomePage = ReactLazyPreload(() => import("pages/CartPages/OrderHomePage"));
const PaymentPage = ReactLazyPreload(() => import("pages/CartPages/paymentPage/PaymentPage"));

const Faq = ReactLazyPreload(() => import("pages/commonPages/FAQ/FAQ"));
const AboutMe = ReactLazyPreload(() => import("pages/commonPages/aboutMe/AboutMe"));
const ContactMe = ReactLazyPreload(() => import("pages/commonPages/contactMe/ContactMe"));

export let myRoutes: any = [];

let isAuth: boolean | null = null;

function MyRoutes(props: any) {
    let {auth, where} = props;

    myRoutes = [
        {path: "/", index: true, element: <HomePage/>},
        {path: "/products", index: true, element: <ProductPage/>},
        {path: "/products/:slug", index: true, element: <MoreProducts/>},
        {path: "/q", element: <ProductPage/>},
        {path: "/product/:title/:productId", element: <ProductDetails/>},
        {
            path: "/dashboard",
            element: <PrivateRoute><Dashboard/></PrivateRoute>,
            children: [
                {path: "", index: true, element: <DashboardHome/>},
                {path: "account-info", index: true, element: <AccountInfo/>},
                {path: "address-book", index: true, element: <AddressBook/>},
                {path: "orders", index: true, element: <Orders/>},
                {path: "orders/:orderId", index: true, element: <OrderDetails/>},
                {path: "carts", index: true, element: <MyCart/>},
                {path: "transactions", index: true, element: <Transactions/>},
                {path: "wishlist", index: true, element: <MyWishlist/>},
                {path: "reviews", index: true, element: <MyReviews/>},
            ],
        },

        {path: "/faqs", element: <Faq/>},
        {path: "/about-me", element: <AboutMe/>},
        {path: "/contact-me", element: <ContactMe/>},

        // { path: "/add-product", index: true,  element: <AddProduct/> },
        // { path: "/update-product/:productId", index: true, element: <AddProduct/> },
        // { path: "/auth/profile",  element: <ProfilePage/ },
        {path: "/products/:authorId", index: true, element: <ProductPage/>},
        // { path: "/admin/dashboard",  element: <AdminDashboard/> },
        {path: "/auth/login", index: true, element: <LoginPage/>},
        {path: "/auth/signup", index: true, element: <SignupPage/>},
        {
            path: "/admin/dashboard",
            element: <AdminDashboard/>,
            children: [
                {path: "products/product-list", index: true, element: <ProductList/>},
                {path: "products/category", index: true, element: <Category/>},
                {path: "products/add-product/:productId", index: true, element: <AddProduct/>},
                {path: "products/server/logs", index: true, element: <Logs/>},
            ],
        },
        {
            path: "/cart",
            element: (
                <PrivateRoute>
                    <CartPage/>
                </PrivateRoute>
            ),
        },
        {
            path: "/wishlist",
            element: (
                <PrivateRoute>
                    <Wishlist/>
                </PrivateRoute>
            ),
        },
        {
            path: "/order",
            element: (
                <PrivateRoute>
                    <OrderHomePage/>
                </PrivateRoute>
            ),
            children: [
                {
                    path: "checkout",
                    index: true,
                    element: (
                        <PrivateRoute>
                            <CheckoutPage/>{" "}
                        </PrivateRoute>
                    ),
                },
                {
                    path: "payment",
                    index: true,
                    element: (
                        <PrivateRoute>
                            <PaymentPage/>
                        </PrivateRoute>
                    ),
                },
            ],
        },

    ];

    return (
        <Suspense fallback={<ProgressBar/>}>
            {useRoutes(myRoutes)}
        </Suspense>
    );
}

export default MyRoutes;
