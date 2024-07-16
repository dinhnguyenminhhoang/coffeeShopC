import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import DrinksSizeForm from "../../Components/FormManager/DrinksSizeForm";

const mockDrinksSizes = [
    {
        id: 1,
        name: "Small Coffee",
        size: "Small",
        price: 2.5,
    },
    {
        id: 2,
        name: "Medium Coffee",
        size: "Medium",
        price: 3.0,
    },
    {
        id: 3,
        name: "Large Coffee",
        size: "Large",
        price: 3.5,
    },
    {
        id: 4,
        name: "Small Latte",
        size: "Small",
        price: 3.0,
    },
    {
        id: 5,
        name: "Medium Latte",
        size: "Medium",
        price: 3.5,
    },
    {
        id: 6,
        name: "Large Latte",
        size: "Large",
        price: 4.0,
    },
];
const DrinksSizePage = () => {
    const [drinksSizes, setDrinksSizes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDrinksSize, setEditingDrinksSize] = useState(null);

    useEffect(() => {
        fetchDrinksSizes();
    }, []);

    const fetchDrinksSizes = async () => {
        const response = await axios.get("/api/drinks-sizes");
        if (response.data.id) {
            setDrinksSizes(response.data);
        } else setDrinksSizes(mockDrinksSizes);
    };

    const handleAdd = () => {
        setEditingDrinksSize(null);
        setIsModalVisible(true);
    };

    const handleEdit = (drinksSize) => {
        setEditingDrinksSize(drinksSize);
        setIsModalVisible(true);
    };

    const handleDelete = async (drinksSizeId) => {
        await axios.delete(`/api/drinks-sizes/${drinksSizeId}`);
        fetchDrinksSizes();
    };

    const handleSave = async (values) => {
        if (editingDrinksSize) {
            await axios.put(
                `/api/drinks-sizes/${editingDrinksSize.id}`,
                values
            );
        } else {
            await axios.post("/api/drinks-sizes", values);
        }
        fetchDrinksSizes();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Size", dataIndex: "size", key: "size" },
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
                Add Drinks Size
            </Button>
            <Table columns={columns} dataSource={drinksSizes} rowKey="id" />
            <Modal
                title={
                    editingDrinksSize ? "Edit Drinks Size" : "Add Drinks Size"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <DrinksSizeForm
                    initialValues={editingDrinksSize}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default DrinksSizePage;
