import React from "react";
import { Outlet } from "react-router-dom";
import SidebarAdmin from "./SidebarAdmin/SidebarAdmin";
const AdminLayout = () => {
    return (
        <div className="flex items-start min-h-screen">
            <SidebarAdmin />
            <Outlet />
        </div>
    );
};

export default AdminLayout;
