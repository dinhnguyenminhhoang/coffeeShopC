import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Space, Popconfirm, Image } from "antd";
import axios from "axios";
import StaffForm from "@/Components/FormManager/StaffForm";
import { getAllStaff } from "@/service/staff";
import useNotification from "@/hooks/NotiHook";
import { formatVND } from "@/utils/resuableFuc";
import {
    createStaff,
    deleteStaff,
    updateStaff,
    updateStaffAccount,
} from "@//service/staff";
import { BiEdit } from "react-icons/bi";

const StaffPage = () => {
    const [staff, setStaff] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingStaff, setEditingStaff] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchStaff(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchStaff = async (pageIndex, pageSize) => {
        const response = await getAllStaff({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
        });

        if (response.data.Success) {
            setStaff(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
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
        try {
            const response = await deleteStaff({ staffId: staffId });
            if (response.data?.Success) {
                fetchStaff(currentPage, pageSize);
                openNotification({
                    type: "success",
                    description: "delete staff successfully",
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
            if (editingStaff) {
                let res;
                if (values?.Password) {
                    res = await updateStaffAccount({
                        formData: {
                            ...values,
                            StaffId: editingStaff.Id,
                            IsActivated: true,
                        },
                    });
                } else {
                    res = await updateStaff({
                        formData: { ...values, Position: "POS_STAFF" },
                    });
                }
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create staff successfully",
                    });
                }
            } else {
                const res = await createStaff({
                    formData: { ...values, Position: "POS_STAFF" },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create staff successfully",
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
        fetchStaff(currentPage, pageSize);
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        {
            title: "Avatar",
            dataIndex: "Avatar",
            key: "Avatar",
            render: (text) => <Image src={text} width={50} height={50} />,
        },
        { title: "FullName", dataIndex: "FullName", key: "FullName" },
        {
            title: "Email",
            dataIndex: "Email",
            key: "Email",
        },
        { title: "Phone", dataIndex: "Phone", key: "Phone" },
        {
            title: "STATUS",
            dataIndex: "IsActivated",
            key: "IsActivated",
            render: (text) => (
                <span
                    className="text-xl font-bold"
                    style={{ color: text ? "green" : "red" }}
                >
                    {text ? "ON" : "OFF"}
                </span>
            ),
        },
        { title: "Address", dataIndex: "Address", key: "Address" },
        { title: "Position", dataIndex: "Position", key: "Position" },
        {
            title: "Salary",
            dataIndex: "Salary",
            key: "Salary",
            render: (text) => <span>{formatVND(text)}</span>,
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button
                        onClick={() => handleEdit(record)}
                        icon={<BiEdit />}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title={`Confirm delete staff ${record.Email}?`}
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
                Add Staff
            </Button>
            <Table
                columns={columns}
                dataSource={staff?.List}
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
                title={editingStaff ? "Edit Staff" : "Add Staff"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <StaffForm
                    initialValues={editingStaff?.Id ? editingStaff.Id : null}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default StaffPage;
