import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import OrderDetailForm from "@/Components/FormManager/OrderDetailForm";
const mockOrderDetails = [
    {
        id: 1,
        orderId: 101,
        product: "Product A",
        quantity: 2,
        price: 50.0,
    },
    {
        id: 2,
        orderId: 102,
        product: "Product B",
        quantity: 1,
        price: 100.0,
    },
    {
        id: 3,
        orderId: 103,
        product: "Product C",
        quantity: 3,
        price: 30.0,
    },
    {
        id: 4,
        orderId: 104,
        product: "Product D",
        quantity: 4,
        price: 25.0,
    },
    {
        id: 5,
        orderId: 105,
        product: "Product E",
        quantity: 5,
        price: 20.0,
    },
];
const OrderDetailsPage = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrderDetail, setEditingOrderDetail] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
        const response = await axios.get("/api/orderdetails");
        if (response.data.id) {
            setOrderDetails(response.data);
        } else setOrderDetails(mockOrderDetails);
    };

    const handleAdd = () => {
        setEditingOrderDetail(null);
        setIsModalVisible(true);
    };

    const handleEdit = (orderDetail) => {
        setEditingOrderDetail(orderDetail);
        setIsModalVisible(true);
    };

    const handleDelete = async (orderDetailId) => {
        await axios.delete(`/api/orderdetails/${orderDetailId}`);
        fetchOrderDetails();
    };

    const handleSave = async (values) => {
        if (editingOrderDetail) {
            await axios.put(
                `/api/orderdetails/${editingOrderDetail.id}`,
                values
            );
        } else {
            await axios.post("/api/orderdetails", values);
        }
        fetchOrderDetails();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "orderId", key: "orderId" },
        { title: "Product", dataIndex: "product", key: "product" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
        { title: "Price", dataIndex: "price", key: "price" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <Button type="primary" onClick={handleAdd} className="mb-4">
                Add Order Detail
            </Button>
            <Table columns={columns} dataSource={orderDetails} rowKey="id" />
            <Modal
                title={
                    editingOrderDetail
                        ? "Edit Order Detail"
                        : "Add Order Detail"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <OrderDetailForm
                    initialValues={editingOrderDetail}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default OrderDetailsPage;
