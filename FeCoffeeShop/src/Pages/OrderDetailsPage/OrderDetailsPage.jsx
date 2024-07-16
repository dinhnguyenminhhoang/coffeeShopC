import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";

const OrderDetailsPage = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrderDetail, setEditingOrderDetail] = useState(null);

    useEffect(() => {
        fetchOrderDetails();
    }, []);

    const fetchOrderDetails = async () => {
        const response = await axios.get("/api/orderdetails");
        setOrderDetails(response.data);
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
