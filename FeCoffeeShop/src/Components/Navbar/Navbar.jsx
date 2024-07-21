import React, { useEffect, useState } from "react";
import Logo from "@/assets/website/coffee_logo.png";
import { FaCoffee, FaUserAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import {
    BiLogOut,
    BiRegistered,
    BiSolidRegistered,
    BiUser,
} from "react-icons/bi";
import { Button, Divider, Dropdown, Flex, Menu } from "antd";
import { PiCashRegister } from "react-icons/pi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { getInitials } from "@/utils/resuableFuc";
import useNotification from "@/hooks/NotiHook";
const Menus = [
    {
        id: 1,
        name: "Sản phẩm",
        link: "/#ProductShow",
    },
    {
        id: 3,
        name: "Liên hệ",
        link: "/#about",
    },
];

const Navbar = () => {
    const [userData, setUserData] = useState();
    const [isLogger, setisLogger] = useState(false);
    const openNotification = useNotification();
    const navigator = useNavigate();
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
    const menu = (
        <Menu>
            <Menu.Item
                key="profile"
                icon={<BiUser />}
                onClick={() => navigator(`/profile/${userData.Id}`)}
            >
                Profile
            </Menu.Item>
            <Menu.Item key="logout" icon={<BiLogOut />} onClick={handleLogout}>
                Logout
            </Menu.Item>
        </Menu>
    );
    return (
        <div className="bg-gradient-to-r from-secondary to-secondary/90 text-white">
            <div className="container py-2">
                <div className="flex justify-between items-center gap-4">
                    <div>
                        <Link
                            to="/"
                            className="font-bold text-2xl sm:text-3xl flex justify-center items-center gap-2 tracking-wider font-cursive"
                        >
                            <img src={Logo} alt="Logo" className="w-14" />
                            COFFEE HOUSE
                        </Link>
                    </div>
                    <div className="flex justify-between items-center gap-4">
                        <ul className="hidden sm:flex items-center gap-4">
                            {Menus.map((data, index) => (
                                <li key={index}>
                                    <a
                                        href={data.link}
                                        className="inline-block  py-4 px-4 text-white/70 hover:text-white duration-200"
                                    >
                                        {data.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <button
                            className="bg-primary/70 px-4 py-2 rounded-full hover:scale-105 duration-200 flex items-center gap-3"
                            onClick={() => navigator("/carts")}
                        >
                            Cart
                            <FaCoffee className="text-xl cursor-pointer" />
                        </button>
                        {isLogger ? (
                            <Dropdown
                                overlay={menu}
                                placement="bottomRight"
                                arrow
                            >
                                <Button
                                    shape="circle"
                                    style={{
                                        fontWeight: "700",
                                        fontSize: "20px",
                                        padding: "22px 16px",
                                    }}
                                    className="bg-primary text-white border border-secondary"
                                >
                                    {getInitials(userData?.username)}
                                </Button>
                            </Dropdown>
                        ) : (
                            <Flex align="center" gap={2}>
                                <button
                                    className="hover:scale-105 duration-200 flex items-center gap-2"
                                    onClick={() => navigator("/login")}
                                >
                                    Login
                                    <FaUserAlt
                                        className="cursor-pointer"
                                        size={16}
                                    />
                                </button>
                                <Divider type="vertical" className="bg-white" />
                                <button
                                    className="hover:scale-105 duration-200 flex items-center gap-2"
                                    onClick={() => navigator("/register")}
                                >
                                    Register
                                    <PiCashRegister
                                        className="cursor-pointer"
                                        size={16}
                                    />
                                </button>
                            </Flex>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
