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
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    useEffect(() => {
        fetchOrderDetail(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchOrderDetail = async (pageIndex, pageSize) => {
        const response = await getCustomerOrderDetail({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
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

    // const totalAmount = orderDetail.reduce((sum, item) => sum + item.total, 0);
    return <OrderInfo order={orderDetail} />;
};

export default CustomerOrderDetailPage;
