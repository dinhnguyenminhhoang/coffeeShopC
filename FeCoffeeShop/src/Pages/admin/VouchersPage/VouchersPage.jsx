import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space } from "antd";
import axios from "axios";
import VoucherForm from "@/Components/FormManager/VoucherForm";
const mockVouchers = [
    {
        id: 1,
        name: "Summer Sale Voucher",
        description: "Get 20% off on all summer products.",
    },
    {
        id: 2,
        name: "Holiday Special Voucher",
        description: "Enjoy a discount of $50 on holiday bookings.",
    },
    {
        id: 3,
        name: "Birthday Gift Voucher",
        description: "Receive a free gift on your birthday.",
    },
    {
        id: 4,
        name: "New User Welcome Voucher",
        description: "New users get a $10 discount on their first purchase.",
    },
];
const VouchersPage = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingVoucher, setEditingVoucher] = useState(null);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        const response = await axios.get("/api/vouchers");
        if (response.data.id) {
            setVouchers(response.data);
        } else setVouchers(mockVouchers);
    };

    const handleAdd = () => {
        setEditingVoucher(null);
        setIsModalVisible(true);
    };

    const handleEdit = (voucher) => {
        setEditingVoucher(voucher);
        setIsModalVisible(true);
    };

    const handleDelete = async (voucherId) => {
        await axios.delete(`/api/vouchers/${voucherId}`);
        fetchVouchers();
    };

    const handleSave = async (values) => {
        if (editingVoucher) {
            await axios.put(`/api/vouchers/${editingVoucher.id}`, values);
        } else {
            await axios.post("/api/vouchers", values);
        }
        fetchVouchers();
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
                Add Voucher
            </Button>
            <Table columns={columns} dataSource={vouchers} rowKey="id" />
            <Modal
                title={editingVoucher ? "Edit Voucher" : "Add Voucher"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <VoucherForm
                    initialValues={editingVoucher}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default VouchersPage;
