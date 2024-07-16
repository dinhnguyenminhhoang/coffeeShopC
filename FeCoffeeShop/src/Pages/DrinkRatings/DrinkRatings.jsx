import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import DrinkRatingForm from "../../Components/FormManager/DrinkRatingForm";

const DrinkRatingsPage = () => {
    const [drinkRatings, setDrinkRatings] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDrinkRating, setEditingDrinkRating] = useState(null);

    useEffect(() => {
        fetchDrinkRatings();
    }, []);

    const fetchDrinkRatings = async () => {
        const response = await axios.get("/api/drink-ratings");
        setDrinkRatings(response.data);
    };

    const handleAdd = () => {
        setEditingDrinkRating(null);
        setIsModalVisible(true);
    };

    const handleEdit = (drinkRating) => {
        setEditingDrinkRating(drinkRating);
        setIsModalVisible(true);
    };

    const handleDelete = async (drinkRatingId) => {
        await axios.delete(`/api/drink-ratings/${drinkRatingId}`);
        fetchDrinkRatings();
    };

    const handleSave = async (values) => {
        if (editingDrinkRating) {
            await axios.put(
                `/api/drink-ratings/${editingDrinkRating.id}`,
                values
            );
        } else {
            await axios.post("/api/drink-ratings", values);
        }
        fetchDrinkRatings();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Drink ID", dataIndex: "drinkId", key: "drinkId" },
        { title: "Rating", dataIndex: "rating", key: "rating" },
        { title: "Comment", dataIndex: "comment", key: "comment" },
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
                Add Drink Rating
            </Button>
            <Table columns={columns} dataSource={drinkRatings} rowKey="id" />
            <Modal
                title={
                    editingDrinkRating
                        ? "Edit Drink Rating"
                        : "Add Drink Rating"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <DrinkRatingForm
                    initialValues={editingDrinkRating}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default DrinkRatingsPage;
