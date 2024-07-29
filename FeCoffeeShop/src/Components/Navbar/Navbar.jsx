import Logo from "@/assets/website/coffee_logo.png";
import useNotification from "@/hooks/NotiHook";
import { getInitials } from "@/utils/resuableFuc";
import { Button, Divider, Dropdown, Flex, Menu } from "antd";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { BiCartAdd, BiLogOut, BiUser } from "react-icons/bi";
import { FaUserAlt } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { PiCashRegister } from "react-icons/pi";
import { TbMenuOrder } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
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
    const [cartInfo, setCartInfo] = useState([]);
    const [branchInfo, setBranchInfo] = useState({});
    const navigator = useNavigate();
    useEffect(() => {
        const token = Cookies.get("AccessToken");
        if (token) {
            const data = jwtDecode(token);
            setUserData({
                fullname: data.fullname,
                phone: data.phone.trim(),
                username: data.username,
                role: data.role,
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
    useEffect(() => {
        const cartLocal = localStorage.getItem("cartInfo");
        const branchLocal = localStorage.getItem("branch");
        if (cartLocal) {
            setCartInfo(JSON.parse(cartLocal));
        }
        if (branchLocal) setBranchInfo(JSON.parse(branchLocal));
    }, [localStorage]);
    const menu = (
        <Menu>
            {userData?.role === "ROLE_CUSTOMER" ? (
                <Menu.Item
                    key="profile"
                    icon={<BiUser />}
                    onClick={() => navigator(`/profile`)}
                >
                    Profile
                </Menu.Item>
            ) : (
                <Menu.Item
                    key="manager"
                    icon={<GrUserManager />}
                    onClick={() => navigator(`/manager-drinks`)}
                >
                    Manager
                </Menu.Item>
            )}
            <Menu.Item
                key="orders"
                icon={<TbMenuOrder />}
                onClick={() => navigator(`/orders`)}
            >
                Order
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
                    </div>{" "}
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
                            <li>
                                {branchInfo?.Name ? (
                                    <a
                                        href={"/branches"}
                                        className="inline-block  py-4 px-4 text-white/70 hover:text-white duration-200"
                                    >
                                        {`Cửa hàng - ${branchInfo.Name}`}
                                    </a>
                                ) : (
                                    <a
                                        href={"/branches"}
                                        className="inline-block  py-4 px-4 text-white/70 hover:text-white duration-200"
                                    >
                                        {`Cửa hàng`}
                                    </a>
                                )}
                            </li>
                        </ul>
                        <button
                            className="bg-primary/70 px-4 py-2 rounded-md hover:scale-105 duration-200 flex items-center gap-3 relative"
                            onClick={() => {
                                userData?.role === "ROLE_STAFF"
                                    ? navigator("/carts/staff")
                                    : navigator("/carts/customer");
                            }}
                        >
                            Cart
                            <BiCartAdd className="text-xl cursor-pointer" />
                            {cartInfo?.length ? (
                                <div className="absolute -top-1 -right-2 bg-[rgba(255,74,74,0.8)] px-2 rounded-full w-2 h-4"></div>
                            ) : null}
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
