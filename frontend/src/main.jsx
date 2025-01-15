import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
// import 'bootstrap/dist/css/bootstrap.min.css'

const routes = createBrowserRouter(
  createRoutesFromElements(
    // <Routes>
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
      </Route>
    </Route>
    // </Routes>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
)