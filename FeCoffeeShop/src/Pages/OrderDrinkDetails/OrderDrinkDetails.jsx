import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import OrderDrinkDetailForm from "../../Components/FormManager/OrderDrinkDetailForm";

const OrderDrinkDetailsPage = () => {
    const [orderDrinkDetails, setOrderDrinkDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrderDrinkDetail, setEditingOrderDrinkDetail] =
        useState(null);

    useEffect(() => {
        fetchOrderDrinkDetails();
    }, []);

    const fetchOrderDrinkDetails = async () => {
        const response = await axios.get("/api/order-drink-details");
        setOrderDrinkDetails(response.data);
    };

    const handleAdd = () => {
        setEditingOrderDrinkDetail(null);
        setIsModalVisible(true);
    };

    const handleEdit = (orderDrinkDetail) => {
        setEditingOrderDrinkDetail(orderDrinkDetail);
        setIsModalVisible(true);
    };

    const handleDelete = async (orderDrinkDetailId) => {
        await axios.delete(`/api/order-drink-details/${orderDrinkDetailId}`);
        fetchOrderDrinkDetails();
    };

    const handleSave = async (values) => {
        if (editingOrderDrinkDetail) {
            await axios.put(
                `/api/order-drink-details/${editingOrderDrinkDetail.id}`,
                values
            );
        } else {
            await axios.post("/api/order-drink-details", values);
        }
        fetchOrderDrinkDetails();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "orderId", key: "orderId" },
        { title: "Drink ID", dataIndex: "drinkId", key: "drinkId" },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
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
                Add Order Drink Detail
            </Button>
            <Table
                columns={columns}
                dataSource={orderDrinkDetails}
                rowKey="id"
            />
            <Modal
                title={
                    editingOrderDrinkDetail
                        ? "Edit Order Drink Detail"
                        : "Add Order Drink Detail"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <OrderDrinkDetailForm
                    initialValues={editingOrderDrinkDetail}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default OrderDrinkDetailsPage;
