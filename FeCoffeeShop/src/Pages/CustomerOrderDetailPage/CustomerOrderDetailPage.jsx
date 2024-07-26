import { Button, Input, InputNumber, Popconfirm, Table } from "antd";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../hooks/NotiHook";
import { formatVND } from "../../utils/resuableFuc";
import { getCustomerOrderDetail } from "../../service/CustomerOrder";
import OrderInfo from "../../Components/OrderInfo/OrderInfo";
const CustomerOrderDetailPage = () => {
    const openNotification = useNotification();
    const { orderId } = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetchOrderDetail();
    }, []);

    const fetchOrderDetail = async () => {
        const response = await getCustomerOrderDetail({
            orderId: orderId,
        });

        if (response.data.Success) {
            setOrderDetail(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    return <OrderInfo order={orderDetail} />;
};

export default CustomerOrderDetailPage;
