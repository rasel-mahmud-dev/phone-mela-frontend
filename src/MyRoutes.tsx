import {lazy, Suspense} from "react";
import {useRoutes} from "react-router-dom";
import ProgressBar from "UI/ProgressBar/ProgressBar";
import Dashboard from "pages/Dashboard/Dashboard";
import PrivateRoute from "./middleware/PrivateRoute";
import AdminDashboardHome from "pages/Dashboard/Admin/AdminDashboardHome";


// this function for lazy route load...........
const ReactLazyPreload = (importStatement: any) => {
    const Component = lazy(importStatement);
    // Component.preload call when preload link clicked
    // @ts-ignore
    Component.preload = importStatement;
    return Component;
};

const GoogleLogin = ReactLazyPreload(() => import("pages/auth/GoogleLogin"));
const AccountInfo = ReactLazyPreload(() => import("pages/Dashboard/Customer/AccountInfo/AccountInfo"));
const AddressBook = ReactLazyPreload(() => import("pages/Dashboard/Customer/AddressBook/AddressBook"));
const Orders = ReactLazyPreload(() => import("pages/Dashboard/Customer/Orders/Orders"));
const MyReviews = ReactLazyPreload(() => import("pages/Dashboard/Customer/MyReviews/MyReviews"));
const OrderDetails = ReactLazyPreload(() => import("pages/Dashboard/Customer/OrderDetails/OrderDetails"));
const MyCart = ReactLazyPreload(() => import("pages/Dashboard/Customer/MyCart/MyCart"));
const MyWishlist = ReactLazyPreload(() => import("pages/Dashboard/Shared/MyWishlist"));
const Transactions = ReactLazyPreload(() => import("pages/Dashboard/Shared/Transactions"));

const Sales = ReactLazyPreload(() => import("pages/Dashboard/Admin/Sales/Sales"));
const Customers = ReactLazyPreload(() => import("pages/Dashboard/Admin/Customers/Customers"));
const BrandList = ReactLazyPreload(() => import("pages/Dashboard/Admin/BrandList/BrandList"));


const HomePage = ReactLazyPreload(() => import("pages/HomePage/HomePage"));
const ProductPage = ReactLazyPreload(() => import("./pages/ProductPage/ProductPage"));
const ProductDetails = ReactLazyPreload(() => import("./pages/ProductPage/ProductDetails/ProductDetails"));

// const signupPage = ReactLazyPreload( ()=>import("./pages/signupPage/signupPage") )
const LoginPage = ReactLazyPreload(() => import("./pages/auth/loginPage/LoginPage"));
const SignupPage = ReactLazyPreload(() => import("pages/auth/signupPage/SignupPage"));
// const ProfilePage = ReactLazyPreload( ()=>import("./pages/ProfilePage/ProfilePage") )

// const BrandList = ReactLazyPreload(()=> import("pages/Admin/Components/BrandList/BrandList") )

// import NotFound from './pages/Exceptions/NotFoundPage/NotFoundPage'
const CartPage = ReactLazyPreload(() => import("pages/CartPages/CartPage"));
const Wishlist = ReactLazyPreload(() => import("src/pages/CartPages/wishlist/Wishlist"));
const CheckoutPage = ReactLazyPreload(() => import("pages/CartPages/checkout/CheckoutPage"));
const OrderComplete = ReactLazyPreload(() => import("pages/CartPages/OrderComplete/OrderComplete"));
const DashboardHome = ReactLazyPreload(() => import("pages/Dashboard/DashboardHome"));


const ProductList = ReactLazyPreload(() => import("pages/Dashboard/Admin/ProductList/ProductList"));
const Category = ReactLazyPreload(() => import("pages/Dashboard/Admin/BrandList/BrandList"));
const AddProduct = ReactLazyPreload(() => import("./pages/Dashboard/Shared/AddProduct/AddProduct"));
const MoreProducts = ReactLazyPreload(() => import("pages/ProductPage/moreProducts/MoreProducts"));

const OrderHomePage = ReactLazyPreload(() => import("pages/CartPages/OrderHomePage"));
const PaymentPage = ReactLazyPreload(() => import("pages/CartPages/paymentPage/PaymentPage"));

const Faq = ReactLazyPreload(() => import("pages/commonPages/FAQ/FAQ"));
const AboutMe = ReactLazyPreload(() => import("pages/commonPages/aboutMe/AboutMe"));
const ContactMe = ReactLazyPreload(() => import("pages/commonPages/contactMe/ContactMe"));

export let myRoutes: any = [];

function MyRoutes() {
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

                // admin routes
                {path: "sales", index: true, element: <Sales/>},
                {path: "customers", index: true, element: <Customers/>},
                {path: "products", index: true, element: <ProductList/>},
                {path: "brands", index: true, element: <BrandList/>},
            ],
        },
        {
            path: "/admin",
            element: <PrivateRoute><Dashboard/></PrivateRoute>,
            children: [
                {path: "dashboard", index: true, element: <AdminDashboardHome/>},
                {path: "products", index: true, element: <ProductList/>},
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
