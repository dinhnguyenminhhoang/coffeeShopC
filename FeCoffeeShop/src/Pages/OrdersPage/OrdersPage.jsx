import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import OrderForm from "../../Components/FormManager/OrderForm";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const response = await axios.get("/api/orders");
        setOrders(response.data);
    };

    const handleAdd = () => {
        setEditingOrder(null);
        setIsModalVisible(true);
    };

    const handleEdit = (order) => {
        setEditingOrder(order);
        setIsModalVisible(true);
    };

    const handleDelete = async (orderId) => {
        await axios.delete(`/api/orders/${orderId}`);
        fetchOrders();
    };

    const handleSave = async (values) => {
        if (editingOrder) {
            await axios.put(`/api/orders/${editingOrder.id}`, values);
        } else {
            await axios.post("/api/orders", values);
        }
        fetchOrders();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Order Date", dataIndex: "orderDate", key: "orderDate" },
        { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
        { title: "Staff ID", dataIndex: "staffId", key: "staffId" },
        { title: "Status", dataIndex: "status", key: "status" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Button danger onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <Button type="primary" onClick={handleAdd} className="mb-4">
                Add Order
            </Button>
            <Table columns={columns} dataSource={orders} rowKey="id" />
            <Modal
                title={editingOrder ? "Edit Order" : "Add Order"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <OrderForm
                    initialValues={editingOrder}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default OrdersPage;
