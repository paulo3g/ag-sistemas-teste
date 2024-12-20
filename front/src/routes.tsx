import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/_layout/app'
import { AuthLayout } from '@/pages/_layout/auth'
import { NotFound } from '@/pages/404'
import { ProductsPage } from '@/pages/app/products'
import { SignIn } from '@/pages/auth/sign-in'
import { SignUp } from '@/pages/auth/sign-up'
import { Error } from '@/pages/error'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [{ path: '/products', element: <ProductsPage /> }],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/sign-in', element: <SignIn /> },
      { path: '/sign-up', element: <SignUp /> },
    ],
  },
  { path: '*', element: <NotFound /> },
])
