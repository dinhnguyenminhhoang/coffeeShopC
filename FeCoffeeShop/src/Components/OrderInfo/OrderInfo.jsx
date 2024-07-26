import { Card, Descriptions, Table } from "antd";
import React from "react";

const OrderInfo = ({ order, type }) => {
    const columns = [
        {
            title: "ID",
            dataIndex: "Id",
            key: "Id",
        },
        {
            title: "Số Lượng",
            dataIndex: "Quantity",
            key: "Quantity",
        },
        {
            title: "Giá",
            dataIndex: "Price",
            key: "Price",
            render: (text) => (
                <span>
                    {text.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            ),
        },
        {
            title: "Tên nước",
            dataIndex: ["Drink", "Name"],
            key: "DrinkName",
        },
        {
            title: "Kích cở",
            dataIndex: ["Drink", "Size"],
            key: "DrinkSize",
        },
        {
            title: "Drink Price",
            dataIndex: ["Drink", "Price"],
            key: "DrinkPrice",
            render: (text) => (
                <span>
                    {text.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                    })}
                </span>
            ),
        },
    ];
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Card title="Order Detail" className="mb-6 text-2xl font-medium">
                <Descriptions bordered>
                    {type === "staff" ? (
                        <>
                            <Descriptions.Item label="Customer ID">
                                #{order?.Customer?.Id}
                            </Descriptions.Item>{" "}
                            <Descriptions.Item label="Tên Khách hàng">
                                {order?.Customer?.FullName}
                            </Descriptions.Item>
                        </>
                    ) : null}
                    <Descriptions.Item label="Mã đơn">
                        #{order?.Id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ giao hàng">
                        {order?.ShippingAddress}
                    </Descriptions.Item>
                    <Descriptions.Item label="Loại đơn">
                        {order?.Type}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {order?.Status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú của khách">
                        {order?.CustomerNote || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú của nhân viên">
                        {order?.StaffNote || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Is Paid">
                        {order?.IsPaid ? "Yes" : "No"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {new Date(order.OrderdAt).toLocaleString("vi-VN")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Tổng tiền">
                        {order?.TotalPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú hủy đơn(nếu có)">
                        {order?.CanceledNote || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ghi chú đơn thất bại(nếu có)">
                        {order?.FailedComment || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Chi nhánh">
                        {order?.Branch?.Name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ chi nhánh">
                        {order?.Branch?.Address}
                    </Descriptions.Item>
                </Descriptions>
            </Card>
            <Card title="Order Details">
                <Table
                    dataSource={order?.OrderDetails}
                    columns={columns}
                    rowKey="Id"
                    pagination={false}
                />
            </Card>
        </div>
    );
};

export default OrderInfo;
