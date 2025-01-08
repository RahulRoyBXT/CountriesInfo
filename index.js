import { createRoot } from 'react-dom/client';
import App from "./App.jsx";

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Error from './components/Error.jsx';
import CountryDetails from './components/countryDetails.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                path:'/',
                element: <Home />,
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/:CountryDetails',
                element: <CountryDetails />,
            }
        ]
    },

]);

const root = createRoot(document.querySelector('#root'));
root.render(<RouterProvider router={router} />);