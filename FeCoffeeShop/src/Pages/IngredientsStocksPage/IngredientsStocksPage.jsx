import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import IngredientStockForm from "../../Components/FormManager/IngredientStockForm";

const IngredientsStocksPage = () => {
    const [ingredientsStocks, setIngredientsStocks] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIngredientStock, setEditingIngredientStock] = useState(null);

    useEffect(() => {
        fetchIngredientsStocks();
    }, []);

    const fetchIngredientsStocks = async () => {
        const response = await axios.get("/api/ingredients-stocks");
        setIngredientsStocks(response.data);
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
