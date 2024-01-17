import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Cart } from "./pages/cart";

import { Layout } from "./components/Layout";
import ProductListPage from "./pages/productListPage";
import ProductPage from "./pages/productPage";
import ProductDetail from "./pages/details";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/cart",
                element: <Cart />,
            },
            {
                path: "/product-list",
                element: <ProductListPage />,
            },
            {
                path: "/new-product",
                element: <ProductPage />,
            },
            {
                path: "/edit-product/:id",
                element: <ProductPage />,
            },
            {
                path: "/product/:id",
                element: <ProductDetail />,
            },
        ],
    },
]);

export { router };
