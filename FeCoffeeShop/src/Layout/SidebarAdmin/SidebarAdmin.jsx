import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/website/coffee_logo.ico";
import Cookies from "js-cookie";
import useNotification from "@/hooks/NotiHook";
import { jwtDecode } from "jwt-decode";
import { RiAdminFill } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
const { Sider } = Layout;
const { SubMenu } = Menu;

const SidebarAdmin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [userData, setUserData] = useState();
    const [isLogger, setisLogger] = useState(false);
    const openNotification = useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        const token = Cookies.get("AccessToken");
        if (token) {
            const data = jwtDecode(token);
            setUserData({
                fullname: data.fullname,
                phone: data.phone.trim(),
                username: data.username,
            });
            localStorage.setItem("isLogger", true);
            localStorage.setItem(
                "userInfo",
                JSON.stringify({
                    fullname: data.fullname,
                    phone: data.phone.trim(),
                    username: data.username,
                })
            );
            setisLogger(true);
        } else {
            localStorage.setItem("isLogger", false);
            setisLogger(false);
        }
    }, []);
    const handleLogout = () => {
        Cookies.remove("AccessToken");
        localStorage.clear();
        setisLogger(false);
        openNotification({ type: "info", description: "Đăng xuất thành công" });
    };
    const adminLinks = [
        { path: "/manager-summary", label: "DASBOARD" },
        { path: "/manager-staffs", label: "MANAGER STAFF" },
        { path: "/manager-customers", label: "MANAGER CUSTOMER" },
        { path: "/manager-drinks", label: "MANAGER DRINKS" },
        { path: "/manager-branches", label: "MANAGER BRANCHES" },
        { path: "/manager-ingredients", label: "MANAGER INGREDIENTS" },
        { path: "/manager-vouchers", label: "MANAGER VOUCHERS" },
    ];
    const staffLinks = [
        { path: "/manager-orders", label: "STAFF ORDER" },
        { path: "/manager-categories", label: "STAFF CATEGORIES" },
        { path: "/manager-ratings", label: "STAFF RATINGS" },
        { path: "/manager-ratings", label: "STAFF RATINGS" },
    ];
    return userData ? (
        <Layout className="flex-none pt-3 border-r border-[#ccc] min-h-screen">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={setCollapsed}
                theme="light"
            >
                <div className="logo" />
                <Menu theme="light" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item
                        onClick={() => navigate("/")}
                        key="1"
                        style={{
                            height: "200px",
                            background: "white",
                        }}
                    >
                        <img
                            src={logo}
                            alt="logo"
                            style={{ width: "100%", objectFit: "contain" }}
                        />
                    </Menu.Item>

                    {/* {userData.role === "ADMIN" && ( */}
                    <SubMenu
                        key="sub1"
                        icon={<MdOutlineAdminPanelSettings size={20} />}
                        title="Admin"
                    >
                        {adminLinks.map((link, index) => (
                            <Menu.Item
                                key={`admin-${index}`}
                                onClick={() => navigate(link.path)}
                            >
                                {link.label}
                            </Menu.Item>
                        ))}
                    </SubMenu>

                    <SubMenu key="sub3" icon={<UserOutlined />} title="Staff">
                        {staffLinks.map((link, index) => (
                            <Menu.Item
                                key={`staff-${index}`}
                                onClick={() => navigate(link.path)}
                            >
                                {link.label}
                            </Menu.Item>
                        ))}
                    </SubMenu>
                </Menu>
            </Sider>
        </Layout>
    ) : null;
};

export default SidebarAdmin;
