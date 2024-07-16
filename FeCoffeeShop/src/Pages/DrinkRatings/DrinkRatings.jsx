import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import DrinkRatingForm from "../../Components/FormManager/DrinkRatingForm";
const mockDrinkRatings = [
    {
        id: 1,
        drinkId: 101,
        rating: 4.5,
        comment: "Great taste!",
        creationDate: "2024-07-01",
    },
    {
        id: 2,
        drinkId: 102,
        rating: 3.0,
        comment: "Average drink.",
        creationDate: "2024-07-02",
    },
    {
        id: 3,
        drinkId: 103,
        rating: 5.0,
        comment: "Excellent!",
        creationDate: "2024-07-03",
    },
    {
        id: 4,
        drinkId: 104,
        rating: 2.5,
        comment: "Not my favorite.",
        creationDate: "2024-07-04",
    },
    {
        id: 5,
        drinkId: 105,
        rating: 4.0,
        comment: "Pretty good.",
        creationDate: "2024-07-05",
    },
];
const DrinkRatingsPage = () => {
    const [drinkRatings, setDrinkRatings] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDrinkRating, setEditingDrinkRating] = useState(null);

    useEffect(() => {
        fetchDrinkRatings();
    }, []);

    const fetchDrinkRatings = async () => {
        const response = await axios.get("/api/drink-ratings");
        if (response.data.id) {
            setDrinkRatings(response.data);
        } else setDrinkRatings(mockDrinkRatings);
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
