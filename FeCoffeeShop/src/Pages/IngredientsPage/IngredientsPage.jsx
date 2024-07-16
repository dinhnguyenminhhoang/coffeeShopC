import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import IngredientForm from "../components/Ingredients/IngredientForm";

const IngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState(null);

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        const response = await axios.get("/api/ingredients");
        setIngredients(response.data);
    };

    const handleAdd = () => {
        setEditingIngredient(null);
        setIsModalVisible(true);
    };

    const handleEdit = (ingredient) => {
        setEditingIngredient(ingredient);
        setIsModalVisible(true);
    };

    const handleDelete = async (ingredientId) => {
        await axios.delete(`/api/ingredients/${ingredientId}`);
        fetchIngredients();
    };

    const handleSave = async (values) => {
        if (editingIngredient) {
            await axios.put(`/api/ingredients/${editingIngredient.id}`, values);
        } else {
            await axios.post("/api/ingredients", values);
        }
        fetchIngredients();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Type", dataIndex: "type", key: "type" },
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
                Add Ingredient
            </Button>
            <Table columns={columns} dataSource={ingredients} rowKey="id" />
            <Modal
                title={editingIngredient ? "Edit Ingredient" : "Add Ingredient"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <IngredientForm
                    initialValues={editingIngredient}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default IngredientsPage;
