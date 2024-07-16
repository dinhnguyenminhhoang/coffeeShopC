import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import VoucherForm from "../components/Vouchers/VoucherForm";

const VouchersPage = () => {
    const [vouchers, setVouchers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingVoucher, setEditingVoucher] = useState(null);

    useEffect(() => {
        fetchVouchers();
    }, []);

    const fetchVouchers = async () => {
        const response = await axios.get("/api/vouchers");
        setVouchers(response.data);
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
