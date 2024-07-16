import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import CategoryForm from "@/Components/FormManager/CategoryForm";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setIsModalVisible(true);
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setIsModalVisible(true);
    };

    const handleDelete = async (categoryId) => {
        await axios.delete(`/api/categories/${categoryId}`);
        fetchCategories();
    };

    const handleSave = async (values) => {
        if (editingCategory) {
            await axios.put(`/api/categories/${editingCategory.id}`, values);
        } else {
            await axios.post("/api/categories", values);
        }
        fetchCategories();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Description", dataIndex: "description", key: "description" },
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
                Add Category
            </Button>
            <Table columns={columns} dataSource={categories} rowKey="id" />
            <Modal
                title={editingCategory ? "Edit Category" : "Add Category"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <CategoryForm
                    initialValues={editingCategory}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default CategoriesPage;
