import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider,Router,Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
import LoginScreen from './screens/LoginScreen.jsx'
import RegisterScreen from './screens/RegisterScreen.jsx'
import ShippingScreen from './screens/ShippingScreen.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import PaymentScreen from './screens/PaymentScreen.jsx'
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx'
import OrderScreen from './screens/OrderScreen.jsx'
import ProfileScreen from './screens/ProfileScreen.jsx'
import OrderListScreen from './screens/admin/OrderListScreen.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import ProductListScreen from './screens/admin/ProductListScreen.jsx'
import ProductEditScreen from './screens/admin/ProductEditScreen.jsx'
import UserListScreen from './screens/admin/UserListScreen.jsx'
const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route  index={true}  path="/" element={<HomeScreen />} />
      <Route  path="product/:id" element={<ProductScreen />} />
      <Route  path="cart" element={<CartScreen />} />
      <Route path="login" element={<LoginScreen/>}/>
      <Route path="register" element={<RegisterScreen/>}/>

      <Route path="" element={<PrivateRoute/>}>
        <Route path="shipping" element={<ShippingScreen/>}/>
        <Route path="payment" element={<PaymentScreen/>}/>
        <Route path="placeorder" element={<PlaceOrderScreen/>}/>
        <Route path="order/:id" element={<OrderScreen/>}/>
        <Route path="profile" element={<ProfileScreen/>}/>
      </Route>
      <Route path="" element={<AdminRoute/>}>
        <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
        <Route path="/admin/productlist" element={<ProductListScreen/>}/>
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
        <Route path="/admin/userlist" element={<UserListScreen/>}/>
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
      <RouterProvider router={routes} />
      </PayPalScriptProvider>
    </Provider>
  </StrictMode>,
)