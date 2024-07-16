import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import DefautLayout from "./Layout/DefautLayout";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import Branches from "./Pages/Branches/Branches";
import CartPage from "./Pages/CartPage/CartPage";
import DetailProduct from "./Pages/DetailProduct/DetailProduct";
import HomePage from "./Pages/HomePage/HomePage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path="/order" element={<OrdersPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<DefautLayout />}>
                    <Route path="/product/:id" element={<DetailProduct />} />
                    <Route index element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/branches" element={<Branches />} />
                    <Route path="/orders" element={<OrdersPage />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Route>
        )
    );

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
