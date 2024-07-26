import useNotification from "@/hooks/NotiHook";
import { Button, Modal, Popconfirm, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
    CusotmerGetListOrder,
    CustomerCancelOrder,
} from "../../service/CustomerOrder";
import {
    formatVND,
    ORDERSTATUS,
    ORDERSTATUSCUSTOMERARRAY,
} from "../../utils/resuableFuc";
import FeedbackCForm from "../../Components/FormManager/FeedbackCForm";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const CustomerOrders = () => {
    const navigator = useNavigate();
    const [customerOrders, setCustomerOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [isFeedback, setIsFeedback] = useState(false);
    const [selectStatus, setSelectStatus] = useState(
        ORDERSTATUSCUSTOMERARRAY[0].key
    );
    const [orderCancelId, setOrderCancelId] = useState();
    const openNotification = useNotification();
    useEffect(() => {
        fetchListOrder(currentPage, pageSize, selectStatus);
    }, [currentPage, pageSize]);

    const fetchListOrder = async (pageIndex, pageSize, selectStatus) => {
        const response = await CusotmerGetListOrder({
            listParam: {
                PageIndex: pageIndex,
                PageSize: pageSize,
                Status: selectStatus,
            },
        });

        if (response.data.Success) {
            setCustomerOrder(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleCancelOrder = async (orderId) => {
        setIsFeedback(true);
        setOrderCancelId(orderId);
    };
    const onSave = async (value) => {
        try {
            const response = await CustomerCancelOrder({
                formData: {
                    Id: orderCancelId,
                    CancelComment: value,
                },
            });
            if (response.data?.Success) {
                fetchListOrder(currentPage, pageSize, selectStatus);
                openNotification({
                    type: "success",
                    description: "canel order successfully",
                });
            }
        } catch (error) {
            openNotification({
                type: "error",
                message: "Thông báo",
                error: error,
            });
        }
    };
    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        {
            title: "Địa chỉ",
            dataIndex: "ShippingAddress",
            key: "ShippingAddress",
        },
        {
            title: "Thời gian đặt",
            dataIndex: "OrderdAt",
            key: "OrderdAt",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Thanh toán",
            dataIndex: "PaymentMethod",
            key: "PaymentMethod",
            render: (text) => (
                <span>{text === "PAY_CASH" ? "Tiền mặt" : "Tiền thẻ"}</span>
            ),
        },
        {
            title: "Tổng tiền",
            dataIndex: "TotalPrice",
            key: "TotalPrice",
            render: (text) => <span>{formatVND(text)}</span>,
        },
        {
            title: "Trạng thái",
            dataIndex: "Status",
            key: "Status",
            render: (text) => {
                const status = ORDERSTATUS[text];
                return (
                    <span
                        style={{ background: status.color }}
                        className="p-2 rounded-md text-xs font-bold text-white"
                    >
                        {status.title}
                    </span>
                );
            },
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button
                        icon={<BsArrowRight />}
                        onClick={() => navigator(`/order-drink/${record.Id}`)}
                    >
                        Xem chi tiết
                    </Button>
                    <Popconfirm
                        title={`Bạn có chắc chắn hủy đơn hàng #${record.Id} không ?`}
                        onConfirm={() => handleCancelOrder(record.Id)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger disabled={record.Status !== "ODR_INIT"}>
                            Cancel
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    return (
        <>
            <div className="container mx-auto p-6">
                <Select
                    className="mb-2 min-w-52"
                    value={selectStatus}
                    onChange={(value) => {
                        setSelectStatus(value);
                        fetchListOrder(currentPage, pageSize, value);
                    }}
                >
                    {ORDERSTATUSCUSTOMERARRAY.map((item, index) => (
                        <Select.Option key={index} value={item.key}>
                            {item.title}
                        </Select.Option>
                    ))}
                </Select>
                <Table
                    columns={columns}
                    dataSource={customerOrders?.List}
                    rowKey="Id"
                    pagination={{
                        current: currentPage,
                        pageSize: pageSize,
                        total: totalCount,
                        showSizeChanger: true,
                    }}
                    onChange={handleTableChange}
                />
            </div>
            <Modal
                title="Feedback"
                visible={isFeedback}
                footer={null}
                onCancel={() => setIsFeedback(true)}
            >
                <FeedbackCForm
                    handleClose={() => setIsFeedback(false)}
                    onSave={onSave}
                />
            </Modal>
        </>
    );
};

export default CustomerOrders;
