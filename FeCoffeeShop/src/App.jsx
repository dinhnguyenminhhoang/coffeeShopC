import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route index element={<Home />} />
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
