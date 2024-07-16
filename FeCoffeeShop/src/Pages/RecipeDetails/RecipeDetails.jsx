import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import RecipeDetailForm from "../../Components/FormManager/RecipeDetailForm";
const mockRecipeDetails = [
    {
        id: 1,
        recipeId: 101,
        ingredientId: 1001,
        amount: "200g",
    },
    {
        id: 2,
        recipeId: 102,
        ingredientId: 1002,
        amount: "150ml",
    },
    {
        id: 3,
        recipeId: 103,
        ingredientId: 1003,
        amount: "300g",
    },
];

const RecipeDetailsPage = () => {
    const [recipeDetails, setRecipeDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecipeDetail, setEditingRecipeDetail] = useState(null);

    useEffect(() => {
        fetchRecipeDetails();
    }, []);

    const fetchRecipeDetails = async () => {
        const response = await axios.get("/api/recipe-details");
        if (response.data.id) {
            setRecipeDetails(response.data);
        } else setRecipeDetails(mockRecipeDetails);
    };

    const handleAdd = () => {
        setEditingRecipeDetail(null);
        setIsModalVisible(true);
    };

    const handleEdit = (recipeDetail) => {
        setEditingRecipeDetail(recipeDetail);
        setIsModalVisible(true);
    };

    const handleDelete = async (recipeDetailId) => {
        await axios.delete(`/api/recipe-details/${recipeDetailId}`);
        fetchRecipeDetails();
    };

    const handleSave = async (values) => {
        if (editingRecipeDetail) {
            await axios.put(
                `/api/recipe-details/${editingRecipeDetail.id}`,
                values
            );
        } else {
            await axios.post("/api/recipe-details", values);
        }
        fetchRecipeDetails();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Recipe ID", dataIndex: "recipeId", key: "recipeId" },
        {
            title: "Ingredient ID",
            dataIndex: "ingredientId",
            key: "ingredientId",
        },
        { title: "Amount", dataIndex: "amount", key: "amount" },
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
                Add Recipe Detail
            </Button>
            <Table columns={columns} dataSource={recipeDetails} rowKey="id" />
            <Modal
                title={
                    editingRecipeDetail
                        ? "Edit Recipe Detail"
                        : "Add Recipe Detail"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <RecipeDetailForm
                    initialValues={editingRecipeDetail}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default RecipeDetailsPage;
