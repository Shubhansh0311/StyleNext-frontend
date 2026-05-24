import React from 'react'
import Navigation from '../Customers/components/Navigation/Navigation'
import Footer from '../Customers/components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../Customers/components/pages/homepage'
// import Cart from '../Customers/components/Cart/Cart'
import Product from '../Customers/components/Products/Product'
import ProductDetails from '../Customers/components/ProductDetails/ProductDetails'
import { Checkout } from '../Customers/components/Checkout/Checkout'
import OrderPage from '../Customers/components/Order/OrderPage'
import OrderDetails from '../Customers/components/Order/OrderDetails'
import CartPage from '../Customers/components/Cart/CartPage'
import OrderSummary from '../Customers/components/Checkout/OrderSummary'
// import ProductCard from '../Customers/components/Products/ProductCard'
// import LoginForm from '../Customers/Auth/LoginForm'
import PaymentSuccess from '../Customers/components/Payment/Payment'

const CustomerRoutes = () => {
    return (





        <div>
            <div>

                <Navigation />
            </div>
            <Routes>
                <Route path='/' element={<Homepage/>}></Route>
                <Route path='/login' element={<Homepage/>}></Route>
                <Route path='/register' element={<Homepage/>}></Route>

                <Route path='/:level1/:level2/:level3' element={<Product />}></Route>
                <Route path='/product/:productId' element={<ProductDetails />}></Route>
                <Route path='/cart' element={<CartPage />}></Route>
                <Route path='/account/order' element={<OrderPage />}></Route>
                <Route path='/account/order/:orderId' element={<OrderDetails />}></Route>
                <Route path='/checkout' element={<Checkout />}></Route>
                <Route path='/ordersummary' element={<OrderSummary />}></Route>
                <Route
                path='/payment/:orderId' element={<PaymentSuccess/>}
                ></Route>
            </Routes>
            <div>
                <Footer />
            </div>

        </div>
        
    )
}

export default CustomerRoutes