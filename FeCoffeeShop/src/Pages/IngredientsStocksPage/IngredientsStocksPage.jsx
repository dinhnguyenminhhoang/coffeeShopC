import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import IngredientStockForm from "../../Components/FormManager/IngredientStockForm";
const mockIngredientsStocks = [
    {
        id: 1,
        ingredientId: "I001",
        quantity: 100,
        expiryDate: "2024-12-31",
    },
    {
        id: 2,
        ingredientId: "I002",
        quantity: 50,
        expiryDate: "2024-08-15",
    },
    {
        id: 3,
        ingredientId: "I003",
        quantity: 200,
        expiryDate: "2025-02-28",
    },
    {
        id: 4,
        ingredientId: "I004",
        quantity: 75,
        expiryDate: "2024-09-30",
    },
];
const IngredientsStocksPage = () => {
    const [ingredientsStocks, setIngredientsStocks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIngredientStock, setEditingIngredientStock] = useState(null);

    useEffect(() => {
        fetchIngredientsStocks();
    }, []);

    const fetchIngredientsStocks = async () => {
        const response = await axios.get("/api/ingredients-stocks");
        if (response.data.id) {
            setIngredientsStocks(response.data);
        } else setIngredientsStocks(mockIngredientsStocks);
    };

    const handleAdd = () => {
        setEditingIngredientStock(null);
        setIsModalVisible(true);
    };

    const handleEdit = (ingredientStock) => {
        setEditingIngredientStock(ingredientStock);
        setIsModalVisible(true);
    };

    const handleDelete = async (ingredientStockId) => {
        await axios.delete(`/api/ingredients-stocks/${ingredientStockId}`);
        fetchIngredientsStocks();
    };

    const handleSave = async (values) => {
        if (editingIngredientStock) {
            await axios.put(
                `/api/ingredients-stocks/${editingIngredientStock.id}`,
                values
            );
        } else {
            await axios.post("/api/ingredients-stocks", values);
        }
        fetchIngredientsStocks();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        {
            title: "Ingredient ID",
            dataIndex: "ingredientId",
            key: "ingredientId",
        },
        { title: "Quantity", dataIndex: "quantity", key: "quantity" },
        { title: "Expiry Date", dataIndex: "expiryDate", key: "expiryDate" },
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
                Add Ingredient Stock
            </Button>
            <Table
                columns={columns}
                dataSource={ingredientsStocks}
                rowKey="id"
            />
            <Modal
                title={
                    editingIngredientStock
                        ? "Edit Ingredient Stock"
                        : "Add Ingredient Stock"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <IngredientStockForm
                    initialValues={editingIngredientStock}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default IngredientsStocksPage;
