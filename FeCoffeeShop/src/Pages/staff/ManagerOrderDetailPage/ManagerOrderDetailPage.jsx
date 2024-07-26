import { Button, Input, InputNumber, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "@/hooks/NotiHook";
import { formatVND } from "@/utils/resuableFuc";
import { getCustomerOrderDetail } from "../../../service/CustomerOrder";
import OrderInfo from "../../../Components/OrderInfo/OrderInfo";
import { staffGetOrderById } from "../../../service/staffOrder";
import { BsArrowLeft } from "react-icons/bs";
const ManagerOrderDetailPage = () => {
    const openNotification = useNotification();
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchOrderDetail();
    }, []);

    const fetchOrderDetail = async () => {
        const response = await staffGetOrderById({
            orderId: orderId,
        });

        if (response.data.Success) {
            setOrderDetail(response.data.ResultData);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    return (
        <div className="relative">
            <Button
                className="absolute right-8 top-8 z-10"
                icon={<BsArrowLeft />}
                onClick={() => navigate(-1)}
            >
                BACK
            </Button>
            <OrderInfo order={orderDetail} type="staff" />
        </div>
    );
};

export default ManagerOrderDetailPage;
