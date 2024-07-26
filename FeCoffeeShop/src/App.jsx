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
import AdminCustomers from "./Pages/admin/AdminCustomers/AdminCustomers";
import AdminIngredientsPage from "./Pages/admin/AdminIngredientsPage/AdminIngredientsPage";
import AdminRecipes from "./Pages/admin/AdminRecipes/AdminRecipes";
import AdminVouchers from "./Pages/admin/AdminVouchers/AdminVouchers";
import DrinkManager from "./Pages/admin/DrinkManager/DrinkManager";
import IngredientsStocksPage from "./Pages/admin/IngredientsStocksPage/IngredientsStocksPage";
import PaymentDetailsPage from "./Pages/admin/PaymentDetails/PaymentDetails";
import StaffPage from "./Pages/admin/StaffPage/StaffPage";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import Branches from "./Pages/Branches/Branches";
import CartPage from "./Pages/CartPage/CartPage";
import CustomerOrderDetailPage from "./Pages/CustomerOrderDetailPage/CustomerOrderDetailPage";
import CustomerOrders from "./Pages/CustomerOrders/CustomerOrders";
import DetailProduct from "./Pages/DetailProduct/DetailProduct";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Profille from "./Pages/Profille/Profille";
import DrinkRatingsPage from "./Pages/staff/DrinkRatings/DrinkRatings";
import ManagerBill from "./Pages/staff/ManagerBill/ManagerBill";
import ManagerCategories from "./Pages/staff/ManagerCategories/ManagerCategories";
import ManagerOrder from "./Pages/staff/ManagerOrder/ManagerOrder";
import ManagerOrderDetailPage from "./Pages/staff/ManagerOrderDetailPage/ManagerOrderDetailPage";
import ServiceRatingsPage from "./Pages/staff/ServiceRatingsPage/ServiceRatingsPage";
const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path="/login" element={<Login />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route
                    path="/reset-password/:slug"
                    element={<ResetPassword />}
                />
                <Route element={<DefautLayout />}>
                    <Route path="/product/:id" element={<DetailProduct />} />
                    <Route index element={<HomePage />} />
                    <Route path="/carts/:role" element={<CartPage />} />
                    <Route path="/branches" element={<Branches />} />
                    <Route
                        path="/order-drink/:orderId"
                        element={<CustomerOrderDetailPage />}
                    />
                    <Route
                        path="/manager-order-drink/:orderId"
                        element={<ManagerOrderDetailPage />}
                    />
                    {/* drink */}
                    <Route
                        path="/drink-rating"
                        element={<DrinkRatingsPage />}
                    />
                    <Route
                        path="/payment-detail"
                        element={<PaymentDetailsPage />}
                    />
                    {/* service */}
                    <Route
                        path="/service-rating"
                        element={<ServiceRatingsPage />}
                    />
                    {/* voucher */}
                    <Route
                        path="/manager-ingredients-stocks"
                        element={<IngredientsStocksPage />}
                    />
                    <Route path="/profile" element={<Profille />} />
                    <Route path="/orders" element={<CustomerOrders />} />
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
                    <Route path="/manager-bills" element={<ManagerBill />} />
                    <Route path="/manager-orders" element={<ManagerOrder />} />
                    <Route path="/manager-recipes" element={<AdminRecipes />} />
                    <Route
                        path="/manager-vouchers"
                        element={<AdminVouchers />}
                    />
                    <Route
                        path="/manager-ingredients"
                        element={<AdminIngredientsPage />}
                    />
                    <Route
                        path="/manager-categories"
                        element={<ManagerCategories />}
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
