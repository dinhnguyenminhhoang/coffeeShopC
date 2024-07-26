import { Card, Descriptions, Table } from "antd";
import React from "react";

const OrderInfo = ({ order }) => {
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
            <Card title="Order Detail" className="mb-6">
                <Descriptions bordered>
                    <Descriptions.Item label="Order ID">
                        {order?.Id}
                    </Descriptions.Item>
                    <Descriptions.Item label="Shipping Address">
                        {order?.ShippingAddress}
                    </Descriptions.Item>
                    <Descriptions.Item label="Order Type">
                        {order?.Type}
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                        {order?.Status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Customer Note">
                        {order?.CustomerNote || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Staff Note">
                        {order?.StaffNote || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Is Paid">
                        {order?.IsPaid ? "Yes" : "No"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Order Date">
                        {new Date(order.OrderdAt).toLocaleString("vi-VN")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Price">
                        {order?.TotalPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label="Canceled Note">
                        {order?.CanceledNote || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Failed Comment">
                        {order?.FailedComment || "N/A"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Branch Name">
                        {order?.Branch?.Name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Branch Address">
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
