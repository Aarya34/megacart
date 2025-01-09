import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,createRoutesFromElements,Route,RouterProvider } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store'
import ProductScreen from './screens/ProductScreen.jsx'
import CartScreen from './screens/CartScreen.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css'

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route  index={true}  path="/" element={<HomeScreen />} />
      <Route  path="product/:id" element={<ProductScreen />} />
      <Route  path="cart" element={<CartScreen />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
)