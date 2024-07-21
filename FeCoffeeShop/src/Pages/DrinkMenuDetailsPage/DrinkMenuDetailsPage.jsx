import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import DrinkMenuDetailForm from "@/Components/FormManager/DrinkMenuDetailForm";
const mockDrinkMenuDetails = [
    {
        id: 1,
        drinkId: 101,
        menuId: 201,
    },
    {
        id: 2,
        drinkId: 102,
        menuId: 202,
    },
    {
        id: 3,
        drinkId: 103,
        menuId: 203,
    },
    {
        id: 4,
        drinkId: 104,
        menuId: 204,
    },
    {
        id: 5,
        drinkId: 105,
        menuId: 205,
    },
];
const DrinkMenuDetailsPage = () => {
    const [drinkMenuDetails, setDrinkMenuDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDrinkMenuDetail, setEditingDrinkMenuDetail] = useState(null);

    useEffect(() => {
        fetchDrinkMenuDetails();
    }, []);

    const fetchDrinkMenuDetails = async () => {
        const response = await axios.get("/api/drink-menu-details");
        if (response.data.id) {
            setDrinkMenuDetails(response.data);
        } else setDrinkMenuDetails(mockDrinkMenuDetails);
    };

    const handleAdd = () => {
        setEditingDrinkMenuDetail(null);
        setIsModalVisible(true);
    };

    const handleEdit = (drinkMenuDetail) => {
        setEditingDrinkMenuDetail(drinkMenuDetail);
        setIsModalVisible(true);
    };

    const handleDelete = async (drinkMenuDetailId) => {
        await axios.delete(`/api/drink-menu-details/${drinkMenuDetailId}`);
        fetchDrinkMenuDetails();
    };

    const handleSave = async (values) => {
        if (editingDrinkMenuDetail) {
            await axios.put(
                `/api/drink-menu-details/${editingDrinkMenuDetail.id}`,
                values
            );
        } else {
            await axios.post("/api/drink-menu-details", values);
        }
        fetchDrinkMenuDetails();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Drink ID", dataIndex: "drinkId", key: "drinkId" },
        { title: "Menu ID", dataIndex: "menuId", key: "menuId" },
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
                Add Drink Menu Detail
            </Button>
            <Table
                columns={columns}
                dataSource={drinkMenuDetails}
                rowKey="id"
            />
            <Modal
                title={
                    editingDrinkMenuDetail
                        ? "Edit Drink Menu Detail"
                        : "Add Drink Menu Detail"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <DrinkMenuDetailForm
                    initialValues={editingDrinkMenuDetail}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default DrinkMenuDetailsPage;
