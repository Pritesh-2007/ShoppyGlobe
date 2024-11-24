import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './components/ErrorPage.jsx'
import ProductList from './components/ProductList.jsx'
import CartItem from './components/CartItem.jsx'
import { lazy } from 'react'
import { Suspense } from 'react'
import Loader from './components/Loader.jsx'
const App =lazy(()=>import('./App.jsx'))
const ProductDetail =lazy(()=>import('./components/ProductDetail.jsx'))
const Checkout =lazy(()=>import('./components/Checkout.jsx'))
const Cart =lazy(()=>import('./components/Cart.jsx'))
const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<Suspense fallback={<Loader/>}>
      <App/>
    </Suspense>,
    errorElement:<ErrorPage/>,
    children:[
      {
        index: true,
        path:"/",
        element:<ProductList/>
      },
      {
        path:"/cart",
        element:<Suspense fallback={<Loader/>}>
        <Cart/>
      </Suspense>,
      },
      {
        path:"/cartitem",
        element:<CartItem></CartItem>
      },
      {
        path:"/productdetails/:id",
        element:<Suspense fallback={<Loader/>}>
        <ProductDetail></ProductDetail>
      </Suspense>,
      },
      {
        path:"/checkout",
        element:<Suspense fallback={<Loader/>}>
        <Checkout></Checkout>
      </Suspense>,
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}></RouterProvider>
  </StrictMode>,
)
