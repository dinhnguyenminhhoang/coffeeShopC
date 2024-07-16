import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import DrinksSizeForm from "../../Components/FormManager/DrinksSizeForm";

const DrinksSizePage = () => {
    const [drinksSizes, setDrinksSizes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDrinksSize, setEditingDrinksSize] = useState(null);

    useEffect(() => {
        fetchDrinksSizes();
    }, []);

    const fetchDrinksSizes = async () => {
        const response = await axios.get("/api/drinks-sizes");
        setDrinksSizes(response.data);
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
