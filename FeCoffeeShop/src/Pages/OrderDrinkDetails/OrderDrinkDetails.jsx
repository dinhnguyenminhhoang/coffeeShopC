import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import OrderDrinkDetailForm from "../../Components/FormManager/OrderDrinkDetailForm";
const mockOrderDrinkDetails = [
    {
        id: 1,
        orderId: 101,
        drinkId: 1,
        quantity: 2,
    },
    {
        id: 2,
        orderId: 102,
        drinkId: 2,
        quantity: 1,
    },
    {
        id: 3,
        orderId: 103,
        drinkId: 3,
        quantity: 3,
    },
    {
        id: 4,
        orderId: 104,
        drinkId: 1,
        quantity: 4,
    },
    {
        id: 5,
        orderId: 105,
        drinkId: 2,
        quantity: 2,
    },
];
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
        if (response.data.id) {
            setOrderDrinkDetails(response.data);
        } else setOrderDrinkDetails(mockOrderDrinkDetails);
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
