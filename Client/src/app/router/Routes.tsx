import { createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import { Home } from "@mui/icons-material";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import About from "../../features/about/AboutPage";
import Contact from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "catalog",
                element: <Catalog />
            },
            {
                path: "catalog/:id",
                element: <ProductDetails />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "server-error",
                element: <ServerError />
            }
        ]
    }
])