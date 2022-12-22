## Phone Mela (Frontend)

Phone Mela is Online buying best smartphone. In this website customer can find smartphone, search mobile phone using title,
filter with varies attributes.
Customer can added mobile wishlist, cart, also they can buy with credit card and cash on delivery build with Nodejs, React js and Mongodb


## Application Features
- Search mobile phone using title, filter with varies attributes.
- It has multiple role customer and admin, customer can buy products. Also has customer and admin dashboard.
- Admin user can add product, update, delete. Block customer.
- Customer can add mobile in wish list, cart, also they can buy with credit card.


# This Application under development

Live Link https://phone-mela.vercel.app


## Technology used.
- react
- redux
- react-router-dom (Route base code spliting)
- Tailwindcss
- stripe-payments
- expressjs
- mongoose
- formidable
- jsonwebtoken etc....


```js

const productRoutes = (app: Application)=> {
	app.get("/api/products", controllers.productController.fetchProducts)
	app.post("/api/homepage-products", controllers.productController.fetchHomePageProducts)
	app.post("/api/top-wishlist-products", controllers.productController.topWishlistProducts)
	app.post("/api/add-product", admin, controllers.productController.addProduct)
}
const authRoutes = (app: Application)=> {		
	app.post("/api/signup", controllers.authController.userRegistration)
	app.post("/api/sign-in", controllers.authController.login)
	app.get("/api/sign-current-user", controllers.authController.loginCurrentUser)
}
const orderRoutes = (app: Application)=> {		
	app.post("/api/order", controllers.orderController.createOrder)
	app.post("/api/orders", controllers.orderController.fetchOrders)
	app.get("/api/order/:orderId", controllers.orderController.fetchOrder)
}
const wishlistRoutes = (app: Application)=> {
	app.post("/api/wishlist-products", auth, controllers.wishlistController.fetchWishlistProducts)
	app.post("/api/add-wishlist", auth, controllers.wishlistController.addToWishlist)	
	app.post("/api/remove-wishlist", auth, controllers.wishlistController.removeToWishlist)
}
const shippingAddressRoutes = (app: Application)=> {
	app.get("/api/shipping-addresses/:customer_id", auth, controllers.shippingAddressController.getShippingAddress)
	app.post("/api/shipping-address", auth, controllers.shippingAddressController.addShippingAddress)
}
const cartRoutes = (app: Application)=> {		
	app.post("/api/cart-products", auth, controllers.cartController.fetchCartProducts)
	app.post("/api/add-cart", auth, controllers.cartController.addToCart)
	app.post("/api/remove-cart", auth, controllers.cartController.removeToCart)
}
// and much more routing
```




### Preview screenshot

#### Homepage
![preview-image](./public/images/Backgroundcopy.webp)

<br/>

#### Product Filter Page
![preview-image](./public/images/2022-12-06_212129 copy.webp)

<br/>

#### Carts Items
![preview-image](./public/images/2022-05-06_203542.jpg)



<br/>

####  Customer Dashboard
![preview-image](./public/images/user-dashboard.jpg)


<br/>

####  Admin Dashboard Adding Product
![preview-image](./public/images/adding-product.jpg)

