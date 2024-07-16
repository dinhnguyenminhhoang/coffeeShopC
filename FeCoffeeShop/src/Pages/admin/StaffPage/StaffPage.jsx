import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import StaffForm from "@/Components/FormManager/StaffForm";
const mockStaff = [
    {
        id: 1,
        name: "John Doe",
        address: "123 Main St, City",
        phone: "123-456-7890",
    },
    {
        id: 2,
        name: "Jane Smith",
        address: "456 Elm St, Town",
        phone: "987-654-3210",
    },
    {
        id: 3,
        name: "Michael Johnson",
        address: "789 Oak St, Village",
        phone: "456-789-0123",
    },
    {
        id: 4,
        name: "Emily Davis",
        address: "321 Pine St, Countryside",
        phone: "654-321-0987",
    },
];
const StaffPage = () => {
    const [staff, setStaff] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);

    useEffect(() => {
        fetchStaff();
    }, []);

    const fetchStaff = async () => {
        const response = await axios.get("/api/staff");

        if (response.data.id) {
            setStaff(response.data);
        } else setStaff(mockStaff);
    };

    const handleAdd = () => {
        setEditingStaff(null);
        setIsModalVisible(true);
    };

    const handleEdit = (staff) => {
        setEditingStaff(staff);
        setIsModalVisible(true);
    };

    const handleDelete = async (staffId) => {
        await axios.delete(`/api/staff/${staffId}`);
        fetchStaff();
    };

    const handleSave = async (values) => {
        if (editingStaff) {
            await axios.put(`/api/staff/${editingStaff.id}`, values);
        } else {
            await axios.post("/api/staff", values);
        }
        fetchStaff();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Address", dataIndex: "address", key: "address" },
        { title: "Phone", dataIndex: "phone", key: "phone" },
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
                Add Staff
            </Button>
            <Table columns={columns} dataSource={staff} rowKey="id" />
            <Modal
                title={editingStaff ? "Edit Staff" : "Add Staff"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <StaffForm
                    initialValues={editingStaff}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default StaffPage;
