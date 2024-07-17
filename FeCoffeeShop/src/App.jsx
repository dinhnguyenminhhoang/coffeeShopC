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
import OrderDrinkDetailsPage from "./Pages/OrderDrinkDetails/OrderDrinkDetails";
import PaymentDetailsPage from "./Pages/PaymentDetails/PaymentDetails";
import RecipeDetailsPage from "./Pages/RecipeDetails/RecipeDetails";
import RecipesPage from "./Pages/RecipesPage/RecipesPage";
import ServiceRatingsPage from "./Pages/ServiceRatingsPage/ServiceRatingsPage";
import StaffPage from "./Pages/admin/StaffPage/StaffPage";
import VouchersPage from "./Pages/admin/VouchersPage/VouchersPage";
import IngredientsPage from "./Pages/IngredientsPage/IngredientsPage";
import IngredientsStocksPage from "./Pages/IngredientsStocksPage/IngredientsStocksPage";

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
                    {/* order */}
                    <Route path="/orders" element={<OrdersPage />} />
                    <Route
                        path="/order-detail/:id"
                        element={<OrderDetailsPage />}
                    />
                    <Route
                        path="/order-drink/:id"
                        element={<OrderDrinkDetailsPage />}
                    />
                    {/* drink */}
                    <Route
                        path="/drink-rating"
                        element={<DrinkRatingsPage />}
                    />
                    <Route
                        path="/drink-menu-detail"
                        element={<DrinkMenuDetailsPage />}
                    />
                    <Route path="/drink-size" element={<DrinksSizePage />} />
                    {/* payment */}
                    <Route
                        path="/payment-detail"
                        element={<PaymentDetailsPage />}
                    />
                    {/* Recipe */}
                    <Route
                        path="/recipe-detail"
                        element={<RecipeDetailsPage />}
                    />
                    <Route path="/recipe" element={<RecipesPage />} />
                    {/* service */}
                    <Route
                        path="/service-rating"
                        element={<ServiceRatingsPage />}
                    />
                    {/* staff */}
                    <Route path="/manager-staff" element={<StaffPage />} />
                    {/* voucher */}
                    <Route
                        path="/manager-vouchers"
                        element={<VouchersPage />}
                    />
                    {/* IngredientsPage */}
                    <Route
                        path="/manager-ingredients"
                        element={<IngredientsPage />}
                    />{" "}
                    <Route
                        path="/manager-ingredients-stocks"
                        element={<IngredientsStocksPage />}
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
