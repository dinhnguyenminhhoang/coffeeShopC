import useNotification from "@/hooks/NotiHook";
import { Button, Modal, Popconfirm, Space, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BrachesFrom from "@/Components/FormManager/BrachesFrom";
import {
    createCategory,
    deleteCategory,
    getAllCategories,
    updateCategory,
} from "../../../service/category";
import CategoryForm from "../../../Components/FormManager/CategoryForm";

const ManagerCategories = () => {
    const [categoryData, setCategoryData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchCategores(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchCategores = async (pageIndex, pageSize) => {
        const response = await getAllCategories({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
        });

        if (response.data.Success) {
            setCategoryData(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleAdd = () => {
        setEditingCategory(null);
        setIsModalVisible(true);
    };

    const handleEdit = (categoryData) => {
        setEditingCategory(categoryData);
        setIsModalVisible(true);
    };

    const handleDelete = async (CategoryId) => {
        try {
            const response = await deleteCategory({ CategoryId: CategoryId });
            if (response.data?.Success) {
                fetchCategores(currentPage, pageSize);
                openNotification({
                    type: "success",
                    description: "delete category successfully",
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
            if (editingCategory) {
                const res = await updateCategory({
                    formData: { ...values, Id: editingCategory.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Edit  category successfully",
                    });
                }
            } else {
                const res = await createCategory({ formData: values });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create categorysuccessfully",
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
        fetchCategores(currentPage, pageSize);
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        { title: "Name", dataIndex: "Name", key: "Name" },
        { title: "Description", dataIndex: "Description", key: "Description" },
        { title: "Amount Drink", dataIndex: "AmountDrink", key: "AmountDrink" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title={`Confirm delete categoryData ${record.Name}?`}
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
                Add Category
            </Button>
            <Table
                columns={columns}
                dataSource={categoryData?.List}
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
                title={editingCategory ? "Edit Category" : "Add Category"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <CategoryForm
                    initialValues={
                        editingCategory?.Id ? editingCategory.Id : null
                    }
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                    isModalVisible={isModalVisible}
                />
            </Modal>
        </div>
    );
};

export default ManagerCategories;
