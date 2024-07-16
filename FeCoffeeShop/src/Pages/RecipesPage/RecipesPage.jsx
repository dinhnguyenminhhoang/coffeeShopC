import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import RecipeForm from "../components/Recipes/RecipeForm";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecipe, setEditingRecipe] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        const response = await axios.get("/api/recipes");
        setRecipes(response.data);
    };

    const handleAdd = () => {
        setEditingRecipe(null);
        setIsModalVisible(true);
    };

    const handleEdit = (recipe) => {
        setEditingRecipe(recipe);
        setIsModalVisible(true);
    };

    const handleDelete = async (recipeId) => {
        await axios.delete(`/api/recipes/${recipeId}`);
        fetchRecipes();
    };

    const handleSave = async (values) => {
        if (editingRecipe) {
            await axios.put(`/api/recipes/${editingRecipe.id}`, values);
        } else {
            await axios.post("/api/recipes", values);
        }
        fetchRecipes();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Description", dataIndex: "description", key: "description" },
        {
            title: "Creation Date",
            dataIndex: "creationDate",
            key: "creationDate",
        },
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
                Add Recipe
            </Button>
            <Table columns={columns} dataSource={recipes} rowKey="id" />
            <Modal
                title={editingRecipe ? "Edit Recipe" : "Add Recipe"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <RecipeForm
                    initialValues={editingRecipe}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default RecipesPage;
