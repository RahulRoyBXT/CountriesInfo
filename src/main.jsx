import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Error from './pages/Error.jsx'
import CountryDetails from './components/countries/CountryDetails.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { NetworkProvider } from './contexts/NetworkContext'
import Layout from './components/layout/Layout'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/about',
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
  {
    path: '/:CountryDetails',
    element: (
      <Layout>
        <CountryDetails />
      </Layout>
    ),
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <NetworkProvider>
        <RouterProvider router={router} />
      </NetworkProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
