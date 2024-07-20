import {
    AppstoreOutlined,
    SettingOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/website/coffee_logo.ico";
import Cookies from "js-cookie";
import useNotification from "../../hooks/NotiHook";
import { jwtDecode } from "jwt-decode";
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
        { path: "/adminRevenue", label: "Admin Dashboard" },
        { path: "/adminAccount", label: "Admin Account" },
        { path: "/adminCustomer", label: "Admin Customer" },
        { path: "/adminMetal", label: "Admin Metal" },
    ];

    const managerLinks = [
        { path: "/manager-revenue", label: "Manager Dashboard" },
        { path: "/manager-product", label: "Manager Product" },
        { path: "/managerPromotion", label: "Manager Promotion" },
        { path: "/manager-stall", label: "Manager Stall" },
        { path: "/manager-discount", label: "Manager Discount" },
        { path: "/manager-customer", label: "Manager Customer" },
        { path: "/manager-bill", label: "Manager Bill" },
        { path: "/manager-gem", label: "Manager Gem" },
    ];

    const staffLinks = [
        { path: "/staff-order", label: "Staff Order" },
        { path: "/staff-product", label: "Staff Product" },
        { path: "/staff-customer", label: "Staff Customer" },
        { path: "/staff-buy-back", label: "Staff Buy Back" },
        { path: "/staff-bill", label: "Staff Bill" },
    ];
    console.log(userData);
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

                    {userData.role === "ADMIN" && (
                        <SubMenu
                            key="sub1"
                            icon={<AppstoreOutlined />}
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
                    )}

                    {(userData.role === "ADMIN" ||
                        userData.role === "MANAGER") && (
                        <SubMenu
                            key="sub2"
                            icon={<SettingOutlined />}
                            title="Manager"
                        >
                            {managerLinks.map((link, index) => (
                                <Menu.Item
                                    key={`manager-${index}`}
                                    onClick={() => navigate(link.path)}
                                >
                                    {link.label}
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    )}

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
