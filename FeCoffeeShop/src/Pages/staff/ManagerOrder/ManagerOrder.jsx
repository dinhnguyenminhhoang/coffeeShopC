import FeedbackCForm from "@/Components/FormManager/FeedbackCForm";
import useNotification from "@/hooks/NotiHook";
import { Button, Modal, Popconfirm, Select, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
    staffComfirmOrder,
    staffCompleteOrder,
    staffDeleteOrder,
    staffFailedOrder,
    staffGetListOrder,
    staffServedOrder,
    staffShippedOrder,
    staffShippingOrder,
} from "../../../service/staffOrder";
import {
    formatVND,
    ORDERSTAFFSTATUSARRAY,
    ORDERSTATUS,
    ORDERSTATUSARRAY,
} from "../../../utils/resuableFuc";
import { BiFilter, BiFilterAlt } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const ManagerOrder = () => {
    const [staffOrders, setStaffOrder] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const [isFeedback, setIsFeedback] = useState(false);
    const [selectStatusMap, setSelectStatusMap] = useState(ORDERSTATUSARRAY[0]);
    const [orderCancelId, setOrderCancelId] = useState();
    const openNotification = useNotification();
    const navigator = useNavigate();
    useEffect(() => {
        fetchListOrder(currentPage, pageSize, ORDERSTATUSARRAY[0].key);
    }, [currentPage, pageSize]);

    const fetchListOrder = async (pageIndex, pageSize, selectStatus) => {
        const response = await staffGetListOrder({
            listParam: {
                PageIndex: pageIndex,
                PageSize: pageSize,
                Status: selectStatus,
            },
        });

        if (response.data.Success) {
            setStaffOrder(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleCancelOrder = async (orderId, type = "cancel") => {
        setIsFeedback(true);
        setOrderCancelId({ Id: orderId, type: type });
    };

    const onSave = async (value) => {
        try {
            let response;
            if (orderCancelId?.type === "cancel") {
                response = await staffDeleteOrder({
                    formData: {
                        Id: orderCancelId.Id,
                        CancelComment: value,
                    },
                });
            } else if (orderCancelId?.type === "error") {
                response = await staffFailedOrder({
                    formData: {
                        Id: orderCancelId.Id,
                        FailedComment: value,
                    },
                });
            }
            if (response.data?.Success) {
                fetchListOrder(currentPage, pageSize, selectStatusMap);
                openNotification({
                    type: "success",
                    description: "Cancel order successfully",
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
    const handleChangeStatusOrder = async (value, order) => {
        const newSelectStatusMap = { ...selectStatusMap, [order.Id]: value };
        setSelectStatusMap(newSelectStatusMap);

        try {
            let response;
            if (value === ORDERSTAFFSTATUSARRAY[2].key) {
                response = await staffShippedOrder({ orderId: order.Id });
            } else if (value === ORDERSTAFFSTATUSARRAY[3].key) {
                response = await staffCompleteOrder({ orderId: order.Id });
            } else if (value === ORDERSTAFFSTATUSARRAY[4].key) {
                response = await staffServedOrder({ orderId: order.Id });
            } else if (value === ORDERSTAFFSTATUSARRAY[0].key) {
                response = await staffComfirmOrder({ orderId: order.Id });
            } else if (value === ORDERSTAFFSTATUSARRAY[1].key) {
                response = await staffShippingOrder({ orderId: order.Id });
            }
            if (response.data?.Success) {
                fetchListOrder(currentPage, pageSize, selectStatusMap);
                openNotification({
                    type: "success",
                    description: "Change status order successfully",
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
                        style={{ background: status?.color }}
                        className="p-2 rounded-md text-xs font-bold text-white"
                    >
                        {status?.title}
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
                        onClick={() =>
                            navigator(`/manager-order-drink/${record.Id}`)
                        }
                        icon={<BsArrowRight />}
                        iconPosition="end"
                    >
                        Chi tiết
                    </Button>
                    <Popconfirm
                        title={`Bạn có chắc chắn hủy đơn hàng #${record.Id} không ?`}
                        onConfirm={() => handleCancelOrder(record.Id, "cancel")}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger disabled={record.Status !== "ODR_INIT"}>
                            hủy
                        </Button>
                    </Popconfirm>
                    <Popconfirm
                        title={`Bạn có chắc chắn đơn hàng #${record.Id}  bị lỗi không ?`}
                        onConfirm={() => handleCancelOrder(record.Id, "error")}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button
                            danger
                            disabled={
                                record.Status === "ODR_INIT" ||
                                record.Status === "ODR_COML"
                            }
                        >
                            lỗi
                        </Button>
                    </Popconfirm>
                    <Select
                        type="link"
                        className="min-w-40"
                        value={selectStatusMap[record.Id] || record.Status}
                        onChange={(value) => {
                            handleChangeStatusOrder(value, record);
                        }}
                    >
                        {ORDERSTAFFSTATUSARRAY.map((item, index) => (
                            <Select.Option key={index} value={item.key}>
                                {item.title}
                            </Select.Option>
                        ))}
                    </Select>
                </Space>
            ),
        },
    ];

    return (
        <>
            <div className="container mx-auto p-6">
                <Select
                    className="mb-2 min-w-52"
                    value={selectStatusMap}
                    onChange={(value) => {
                        setSelectStatusMap(value);
                        fetchListOrder(currentPage, pageSize, value);
                    }}
                >
                    {ORDERSTATUSARRAY.map((item, index) => (
                        <Select.Option key={index} value={item.key}>
                            <Space>
                                <BiFilterAlt /> {item.title}
                            </Space>
                        </Select.Option>
                    ))}
                </Select>
                <Table
                    columns={columns}
                    dataSource={staffOrders?.List}
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
                onCancel={() => setIsFeedback(false)}
            >
                <FeedbackCForm
                    handleClose={() => setIsFeedback(false)}
                    onSave={onSave}
                />
            </Modal>
        </>
    );
};

export default ManagerOrder;
