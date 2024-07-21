import useNotification from "@/hooks/NotiHook";
import { Button, Modal, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BrachesFrom from "../../../Components/FormManager/BrachesFrom";
import {
    createCustomers,
    deleteCustomers,
    getAllCustomers,
    updateCustomers,
} from "../../../service/Customer";
import CustomerForm from "../../../Components/FormManager/CustomerForm";

const AdminCustomers = () => {
    const [customersData, setCustmerData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchCustomers(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchCustomers = async (pageIndex, pageSize) => {
        const response = await getAllCustomers({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
        });

        if (response.data.Success) {
            setCustmerData(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleAdd = () => {
        setEditingCustomer(null);
        setIsModalVisible(true);
    };

    const handleEdit = (customersData) => {
        setEditingCustomer(customersData);
        setIsModalVisible(true);
    };

    const handleDelete = async (customerId) => {
        try {
            const response = await deleteCustomers({
                customerId: customerId,
            });
            if (response.data?.Success) {
                fetchCustomers(currentPage, pageSize);
                openNotification({
                    type: "success",
                    description: "delete customersData successfully",
                });
            }
        } catch (error) {
            openNotification({
                type: "error",
                message: "Thông báo",
                error: error,
            });
        }
    };

    const handleSave = async (values) => {
        try {
            if (editingCustomer) {
                const res = await updateCustomers({
                    formData: { ...values, Id: editingCustomer.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Edit  customersData successfully",
                    });
                }
            } else {
                const res = await createCustomers({ formData: values });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create customersData successfully",
                    });
                }
            }
        } catch (error) {
            openNotification({
                type: "error",
                message: "Thông báo",
                error: error,
            });
        }
        fetchCustomers(currentPage, pageSize);
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        { title: "AccountId", dataIndex: "AccountId", key: "AccountId" },
        { title: "FullName", dataIndex: "FullName", key: "FullName" },
        { title: "Phone", dataIndex: "Phone", key: "Phone" },
        { title: "Address", dataIndex: "Address", key: "Address" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title={`Confirm delete customers ${record.FullName}?`}
                        onConfirm={() => handleDelete(record.Id)}
                        onCancel={() => {}}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <Button type="primary" onClick={handleAdd} className="mb-4">
                Add Customer
            </Button>
            <Table
                columns={columns}
                dataSource={customersData?.List}
                rowKey="Id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalCount,
                    showSizeChanger: true,
                }}
                onChange={handleTableChange}
            />
            <Modal
                title={editingCustomer ? "Edit Customer" : "Add Customer"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <CustomerForm
                    initialValues={
                        editingCustomer?.Id ? editingCustomer.Id : null
                    }
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default AdminCustomers;
