import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import HomePage from "./Pages/HomePage/HomePage";
import Order from "./Pages/Order/Order";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<HomePage />} />
                <Route path="/order" element={<Order />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
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
