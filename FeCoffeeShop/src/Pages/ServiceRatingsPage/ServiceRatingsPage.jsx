import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import ServiceRatingForm from "../../Components/FormManager/ServiceRatingForm";
const mockServiceRatings = [
    {
        id: 1,
        staffId: "S001",
        rating: 4.5,
        comment: "Great service!",
        creationDate: "2024-07-16",
    },
    {
        id: 2,
        staffId: "S002",
        rating: 3.8,
        comment: "Could improve on communication.",
        creationDate: "2024-07-15",
    },
    {
        id: 3,
        staffId: "S003",
        rating: 5.0,
        comment: "Excellent experience!",
        creationDate: "2024-07-14",
    },
    {
        id: 4,
        staffId: "S004",
        rating: 4.2,
        comment: "Prompt and professional.",
        creationDate: "2024-07-13",
    },
    {
        id: 5,
        staffId: "S005",
        rating: 4.7,
        comment: "Very satisfied with the service.",
        creationDate: "2024-07-12",
    },
];
const ServiceRatingsPage = () => {
    const [serviceRatings, setServiceRatings] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingServiceRating, setEditingServiceRating] = useState(null);

    useEffect(() => {
        fetchServiceRatings();
    }, []);

    const fetchServiceRatings = async () => {
        const response = await axios.get("/api/service-ratings");
        if (response.data.id) {
            setServiceRatings(response.data);
        } else setServiceRatings(mockServiceRatings);
    };

    const handleAdd = () => {
        setEditingServiceRating(null);
        setIsModalVisible(true);
    };

    const handleEdit = (serviceRating) => {
        setEditingServiceRating(serviceRating);
        setIsModalVisible(true);
    };

    const handleDelete = async (serviceRatingId) => {
        await axios.delete(`/api/service-ratings/${serviceRatingId}`);
        fetchServiceRatings();
    };

    const handleSave = async (values) => {
        if (editingServiceRating) {
            await axios.put(
                `/api/service-ratings/${editingServiceRating.id}`,
                values
            );
        } else {
            await axios.post("/api/service-ratings", values);
        }
        fetchServiceRatings();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Staff ID", dataIndex: "staffId", key: "staffId" },
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
                Add Service Rating
            </Button>
            <Table columns={columns} dataSource={serviceRatings} rowKey="id" />
            <Modal
                title={
                    editingServiceRating
                        ? "Edit Service Rating"
                        : "Add Service Rating"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <ServiceRatingForm
                    initialValues={editingServiceRating}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default ServiceRatingsPage;
