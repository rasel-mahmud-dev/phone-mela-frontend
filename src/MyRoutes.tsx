import { Suspense} from "react";
import {useRoutes} from "react-router-dom";
import ProgressBar from "UI/ProgressBar/ProgressBar";
import Dashboard from "pages/Dashboard/Dashboard";
import PrivateRoute from "./middleware/PrivateRoute";
import AdminDashboardHome from "pages/Dashboard/Admin/AdminDashboardHome";
import reactLazyPreload from "./utils/reactLazyPreload";


const GoogleLogin = reactLazyPreload(() => import("pages/auth/GoogleLogin"));
const AccountInfo = reactLazyPreload(() => import("pages/Dashboard/Customer/AccountInfo/AccountInfo"));
const AddressBook = reactLazyPreload(() => import("pages/Dashboard/Customer/AddressBook/AddressBook"));
const Orders = reactLazyPreload(() => import("pages/Dashboard/Shared/Orders/Orders"));
const MyReviews = reactLazyPreload(() => import("pages/Dashboard/Customer/MyReviews/MyReviews"));
const OrderDetails = reactLazyPreload(() => import("pages/Dashboard/Customer/OrderDetails/OrderDetails"));
const MyCart = reactLazyPreload(() => import("pages/Dashboard/Customer/MyCart/MyCart"));
const MyWishlist = reactLazyPreload(() => import("pages/Dashboard/Shared/MyWishlist"));
const Transactions = reactLazyPreload(() => import("pages/Dashboard/Shared/Transactions"));

const Sales = reactLazyPreload(() => import("pages/Dashboard/Admin/Sales/Sales"));
const Customers = reactLazyPreload(() => import("pages/Dashboard/Admin/Customers/Customers"));
const BrandList = reactLazyPreload(() => import("pages/Dashboard/Admin/BrandList/BrandList"));


const HomePage = reactLazyPreload(() => import("pages/HomePage/HomePage"));
const ProductPage = reactLazyPreload(() => import("./pages/ProductPage/ProductPage"));
const ProductDetailLite = reactLazyPreload(() => import("./pages/ProductPage/ProductDetails/ProductDetailsLite"));


const LoginPage = reactLazyPreload(() => import("./pages/auth/loginPage/LoginPage"));
const SignupPage = reactLazyPreload(() => import("pages/auth/signupPage/SignupPage"));

const CartPage = reactLazyPreload(() => import("pages/CartPages/CartPage"));
const Wishlist = reactLazyPreload(() => import("src/pages/CartPages/wishlist/Wishlist"));
const CheckoutPage = reactLazyPreload(() => import("pages/CartPages/checkout/CheckoutPage"));
const OrderComplete = reactLazyPreload(() => import("pages/CartPages/OrderComplete/OrderComplete"));
const DashboardHome = reactLazyPreload(() => import("pages/Dashboard/DashboardHome"));


const ProductList = reactLazyPreload(() => import("pages/Dashboard/Admin/ProductList/ProductList"));
const Category = reactLazyPreload(() => import("pages/Dashboard/Admin/BrandList/BrandList"));
const AddProduct = reactLazyPreload(() => import("./pages/Dashboard/Shared/AddProduct/AddProduct"));
const MoreProducts = reactLazyPreload(() => import("pages/ProductPage/moreProducts/MoreProducts"));

const OrderHomePage = reactLazyPreload(() => import("pages/CartPages/OrderHomePage"));
const PaymentPage = reactLazyPreload(() => import("pages/CartPages/paymentPage/PaymentPage"));

const Faq = reactLazyPreload(() => import("pages/commonPages/FAQ/FAQ"));
const AboutMe = reactLazyPreload(() => import("pages/commonPages/aboutMe/AboutMe"));
const ContactMe = reactLazyPreload(() => import("pages/commonPages/contactMe/ContactMe"));

export let myRoutes = [];

function MyRoutes() {
    myRoutes = [
        {path: "/", index: true, element: <HomePage/>},
        {path: "/products", index: true, element: <ProductPage/>},
        {path: "/products/:slug", index: true, element: <MoreProducts/>},
        {path: "/q", element: <ProductPage/>},
        {path: "/product/:slug/:productId", element: <ProductDetailLite/>},
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
        {
            path: "/admin",
            element: <PrivateRoute><Dashboard/></PrivateRoute>,
            children: [
                {path: "dashboard", index: true, element: <AdminDashboardHome/>},
                {path: "products", index: true, element: <ProductList/>},
                {path: "sales", index: true, element: <Sales/>},
                {path: "brands", index: true, element: <BrandList/>},
                {path: "orders", index: true, element: <Orders/>},
                {path: "customers", index: true, element: <Customers/>},
                {path: "products/category", index: true, element: <Category/>},
                {path: "product/add-product", index: true, element: <AddProduct/>},
                {path: "product/update-product/:productId", index: true, element: <AddProduct/>}
            ],
        },
        {path: "/faqs", element: <Faq/>},
        {path: "/about-me", element: <AboutMe/>},
        {path: "/contact-me", element: <ContactMe/>},
        {path: "/products/:authorId", index: true, element: <ProductPage/>},
        {path: "/auth/login", index: true, element: <LoginPage/>},
        {path: "/auth/callback/google", index: true, element: <GoogleLogin/>},
        {path: "/auth/signup", index: true, element: <SignupPage/>},

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
                }, {
                    path: "completed",
                    index: true,
                    element: (
                        <PrivateRoute>
                            <OrderComplete/>
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
