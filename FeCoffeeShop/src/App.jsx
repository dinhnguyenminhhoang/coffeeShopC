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
import OrdersPage from "./Pages/staff/OrdersPage/OrdersPage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import OrderDetailsPage from "./Pages/staff/OrderDetailsPage/OrderDetailsPage";
import DrinkRatingsPage from "./Pages/DrinkRatings/DrinkRatings";
import DrinkMenuDetailsPage from "./Pages/DrinkMenuDetailsPage/DrinkMenuDetailsPage";
import DrinksSizePage from "./Pages/DrinksSizePage/DrinksSizePage";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<DefautLayout />}>
                    <Route path="/product/:id" element={<DetailProduct />} />
                    <Route index element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/branches" element={<Branches />} />
                    <Route path="/orders" element={<OrdersPage />} />
                    {/* drink */}
                    <Route
                        path="/drink-rating"
                        element={<DrinkRatingsPage />}
                    />
                    <Route
                        path="/drink-menu-detail"
                        element={<DrinkMenuDetailsPage />}
                    />{" "}
                    <Route path="/drink-size" element={<DrinksSizePage />} />
                    <Route
                        path="/order-detail/:id"
                        element={<OrderDetailsPage />}
                    />
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
