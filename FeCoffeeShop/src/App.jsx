import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
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
import AdminVouchers from "./Pages/admin/AdminVouchers/AdminVouchers";
import DrinkManager from "./Pages/admin/DrinkManager/DrinkManager";
import StaffPage from "./Pages/admin/StaffPage/StaffPage";
import ForgotPassword from "./Pages/Auth/ForgotPassword/ForgotPassword";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import ResetPassword from "./Pages/Auth/ResetPassword/ResetPassword";
import Branches from "./Pages/Branches/Branches";
import CartPage from "./Pages/CartPage/CartPage";
import CustomerOrderDetailPage from "./Pages/Customer/CustomerOrderDetailPage/CustomerOrderDetailPage";
import CustomerOrders from "./Pages/Customer/CustomerOrders/CustomerOrders";
import Profile from "./Pages/Customer/Profille/Profille";
import DetailDrink from "./Pages/DetailDrink/DetailDrink";
import HomePage from "./Pages/HomePage/HomePage";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import ManagerCategories from "./Pages/staff/ManagerCategories/ManagerCategories";
import ManagerOrder from "./Pages/staff/ManagerOrder/ManagerOrder";
import ManagerOrderDetailPage from "./Pages/staff/ManagerOrderDetailPage/ManagerOrderDetailPage";
const App = () => {
    const token = Cookies.get("AccessToken");
    const userDecode = jwtDecode(token);
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
                    <Route path="/product/:id" element={<DetailDrink />} />
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

                    <Route path="/profile" element={<Profile />} />
                    <Route path="/orders" element={<CustomerOrders />} />
                </Route>
                <Route element={<AdminLayout />}>
                    {userDecode?.role === "ROLE_STAFF" ||
                    userDecode?.role === "ROLE_ADMIN" ? (
                        <>
                            <Route
                                path="/manager-staffs"
                                element={<StaffPage />}
                            />
                            <Route
                                path="/manager-drinks"
                                element={<DrinkManager />}
                            />
                            <Route
                                path="/manager-branches"
                                element={<AdminBranches />}
                            />
                            <Route
                                path="/manager-customers"
                                element={<AdminCustomers />}
                            />
                            <Route
                                path="/manager-orders"
                                element={<ManagerOrder />}
                            />
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
                        </>
                    ) : null}
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
