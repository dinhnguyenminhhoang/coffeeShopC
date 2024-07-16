import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import ServiceRatingForm from "../../Components/FormManager/ServiceRatingForm";

const ServiceRatingsPage = () => {
    const [serviceRatings, setServiceRatings] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingServiceRating, setEditingServiceRating] = useState(null);

    useEffect(() => {
        fetchServiceRatings();
    }, []);

    const fetchServiceRatings = async () => {
        const response = await axios.get("/api/service-ratings");
        setServiceRatings(response.data);
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
