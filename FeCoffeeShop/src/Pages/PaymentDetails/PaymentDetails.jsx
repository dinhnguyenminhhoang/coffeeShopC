import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import axios from "axios";
import PaymentDetailForm from "../../Components/FormManager/PaymentDetailForm";

const PaymentDetailsPage = () => {
    const [paymentDetails, setPaymentDetails] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingPaymentDetail, setEditingPaymentDetail] = useState(null);

    useEffect(() => {
        fetchPaymentDetails();
    }, []);

    const fetchPaymentDetails = async () => {
        const response = await axios.get("/api/payment-details");
        setPaymentDetails(response.data);
    };

    const handleAdd = () => {
        setEditingPaymentDetail(null);
        setIsModalVisible(true);
    };

    const handleEdit = (paymentDetail) => {
        setEditingPaymentDetail(paymentDetail);
        setIsModalVisible(true);
    };

    const handleDelete = async (paymentDetailId) => {
        await axios.delete(`/api/payment-details/${paymentDetailId}`);
        fetchPaymentDetails();
    };

    const handleSave = async (values) => {
        if (editingPaymentDetail) {
            await axios.put(
                `/api/payment-details/${editingPaymentDetail.id}`,
                values
            );
        } else {
            await axios.post("/api/payment-details", values);
        }
        fetchPaymentDetails();
        setIsModalVisible(false);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Order ID", dataIndex: "orderId", key: "orderId" },
        { title: "Amount", dataIndex: "amount", key: "amount" },
        { title: "Payment Date", dataIndex: "paymentDate", key: "paymentDate" },
        {
            title: "Payment Method",
            dataIndex: "paymentMethod",
            key: "paymentMethod",
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
                Add Payment Detail
            </Button>
            <Table columns={columns} dataSource={paymentDetails} rowKey="id" />
            <Modal
                title={
                    editingPaymentDetail
                        ? "Edit Payment Detail"
                        : "Add Payment Detail"
                }
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <PaymentDetailForm
                    initialValues={editingPaymentDetail}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default PaymentDetailsPage;
