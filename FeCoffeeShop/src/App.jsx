import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout";
import DefautLayout from "./Layout/DefautLayout";
import AdminBranches from "./Pages/admin/AdminBranches/AdminBranches";
import DrinkManager from "./Pages/admin/DrinkManager/DrinkManager";
import StaffPage from "./Pages/admin/StaffPage/StaffPage";
import VouchersPage from "./Pages/admin/VouchersPage/VouchersPage";
import Login from "./Pages/Auth/Login/Login";
import HomePage from "./Pages/HomePage/HomePage";
import IngredientsStocksPage from "./Pages/admin/IngredientsStocksPage/IngredientsStocksPage";
import OrderDrinkDetailsPage from "./Pages/OrderDrinkDetails/OrderDrinkDetails";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import OrderDetailsPage from "./Pages/staff/OrderDetailsPage/OrderDetailsPage";
import OrdersPage from "./Pages/staff/OrdersPage/OrdersPage";
import AdminCustomers from "./Pages/admin/AdminCustomers/AdminCustomers";
import DrinkRatingsPage from "./Pages/staff/DrinkRatings/DrinkRatings";
import DrinkMenuDetailsPage from "./Pages/DrinkMenuDetailsPage/DrinkMenuDetailsPage";
import DetailProduct from "./Pages/DetailProduct/DetailProduct";
import CartPage from "./Pages/CartPage/CartPage";
import Branches from "./Pages/Branches/Branches";
import Register from "./Pages/Auth/Register/Register";
import IngredientsPage from "./Pages/admin/IngredientsPage/IngredientsPage";
import PaymentDetailsPage from "./Pages/admin/PaymentDetails/PaymentDetails";
import RecipeDetailsPage from "./Pages/staff/RecipeDetails/RecipeDetails";
import RecipesPage from "./Pages/staff/RecipesPage/RecipesPage";
import ServiceRatingsPage from "./Pages/staff/ServiceRatingsPage/ServiceRatingsPage";
import Profille from "./Pages/Profille/Profille";
const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<DefautLayout />}>
                    <Route path="/product/:id" element={<DetailProduct />} />
                    <Route index element={<HomePage />} />
                    <Route path="/carts" element={<CartPage />} />
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
                    {/* voucher */}
                    <Route
                        path="/manager-vouchers"
                        element={<VouchersPage />}
                    />
                    {/* IngredientsPage */}
                    <Route
                        path="/manager-ingredients"
                        element={<IngredientsPage />}
                    />
                    <Route
                        path="/manager-ingredients-stocks"
                        element={<IngredientsStocksPage />}
                    />
                    <Route path="/profile/:id" element={<Profille />} />
                </Route>
                <Route element={<AdminLayout />}>
                    <Route path="/manager-staffs" element={<StaffPage />} />
                    <Route path="/manager-drinks" element={<DrinkManager />} />
                    <Route
                        path="/manager-branches"
                        element={<AdminBranches />}
                    />
                    <Route
                        path="/manager-customers"
                        element={<AdminCustomers />}
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
