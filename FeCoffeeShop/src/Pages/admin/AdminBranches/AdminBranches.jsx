import useNotification from "@/hooks/NotiHook";
import { Button, Modal, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BrachesFrom from "../../../Components/FormManager/BrachesFrom";
import {
    createBranches,
    deleteBranches,
    getAllBranches,
    updateBranches,
} from "../../../service/branchs";

const AdminBranches = () => {
    const [branch, setBranch] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingBranch, setEditingBranch] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchBranches(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchBranches = async (pageIndex, pageSize) => {
        const response = await getAllBranches({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
        });

        if (response.data.Success) {
            setBranch(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleAdd = () => {
        setEditingBranch(null);
        setIsModalVisible(true);
    };

    const handleEdit = (branch) => {
        setEditingBranch(branch);
        setIsModalVisible(true);
    };

    const handleDelete = async (branchesid) => {
        try {
            const response = await deleteBranches({ branchesid: branchesid });
            if (response.data?.Success) {
                fetchBranches(currentPage, pageSize);
                openNotification({
                    type: "success",
                    description: "delete branch successfully",
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
            if (editingBranch) {
                const res = await updateBranches({
                    formData: { ...values, Id: editingBranch.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Edit  branch successfully",
                    });
                }
            } else {
                const res = await createBranches({ formData: values });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create branch successfully",
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
        fetchBranches(currentPage, pageSize);
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        { title: "Name", dataIndex: "Name", key: "Name" },
        { title: "Address", dataIndex: "Address", key: "Address" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title={`Confirm delete branch ${record.Name}?`}
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
                Add Branch
            </Button>
            <Table
                columns={columns}
                dataSource={branch?.List}
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
                title={editingBranch ? "Edit Staff" : "Add Staff"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <BrachesFrom
                    initialValues={editingBranch?.Id ? editingBranch.Id : null}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default AdminBranches;
