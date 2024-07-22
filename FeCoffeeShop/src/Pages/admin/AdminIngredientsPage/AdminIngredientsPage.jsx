import IngredientForm from "@/Components/FormManager/IngredientForm";
import useNotification from "@/hooks/NotiHook";
import {
    createIngredient,
    getAllIngredients,
    updateIngredient,
} from "@/service/Ingredients";
import { Button, Flex, Modal, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BiAddToQueue, BiEdit } from "react-icons/bi";
import IngredientStockForm from "../../../Components/FormManager/IngredientStockForm";
import {
    createIngredientStock,
    deleteIngredientById,
} from "../../../service/Ingredients";

const AdminIngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisibleStock, setIsModalVisibleStock] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchIngredients(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchIngredients = async (pageIndex, pageSize) => {
        const response = await getAllIngredients({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
        });

        if (response.data.Success) {
            setIngredients(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleAdd = () => {
        setEditingIngredient(null);
        setIsModalVisible(true);
    };

    const handleEdit = (ingredient, type) => {
        setEditingIngredient(ingredient);
        if (type === "stock") {
            setIsModalVisibleStock(true);
        } else {
            setIsModalVisible(true);
        }
    };
    const handleDelete = async (ingredientId) => {
        try {
            const response = await deleteIngredientById({
                id: ingredientId,
            });
            if (response.data?.Success) {
                fetchIngredients(currentPage, pageSize);
                openNotification({
                    type: "success",
                    description: "Delete ingredient successfully",
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
            if (editingIngredient) {
                const res = await updateIngredient({
                    formData: { ...values, Id: editingIngredient.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Update ingredient successfully",
                    });
                }
            } else {
                const res = await createIngredient({
                    formData: values,
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create ingredient successfully",
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
        fetchIngredients(currentPage, pageSize);
        setIsModalVisible(false);
    };
    const handleSaveStock = async (values) => {
        try {
            const res = await createIngredientStock({
                formData: values,
            });
            if (res.data.Success) {
                openNotification({
                    type: "success",
                    description: "Create ingredient stock successfully",
                });
            }
        } catch (error) {
            openNotification({
                type: "error",
                message: "Thông báo",
                error: error,
            });
        }
        fetchIngredients(currentPage, pageSize);
        setIsModalVisibleStock(false);
    };
    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        { title: "Name", dataIndex: "Name", key: "name" },
        { title: "Description", dataIndex: "Description", key: "Description" },
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
                    </Button>{" "}
                    <Button
                        onClick={() => handleEdit(record, "stock")}
                        icon={<BiAddToQueue />}
                    >
                        Add Stock
                    </Button>
                    <Popconfirm
                        title={`Confirm delete ingredient ${record.Name}?`}
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
            <Flex gap={6} align="center">
                <Button type="primary" onClick={handleAdd} className="mb-4">
                    Add Ingredient
                </Button>{" "}
            </Flex>
            <Table
                columns={columns}
                dataSource={ingredients?.List}
                rowKey="id"
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: totalCount,
                    showSizeChanger: true,
                }}
                onChange={handleTableChange}
            />
            <Modal
                title={editingIngredient ? "Edit Ingredient" : "Add Ingredient"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <IngredientForm
                    initialValues={editingIngredient?.Id}
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                    isVisible={isModalVisible}
                />
            </Modal>
            <Modal
                title={"Add Ingredient Stock"}
                visible={isModalVisibleStock}
                footer={null}
                onCancel={() => setIsModalVisibleStock(false)}
            >
                <IngredientStockForm
                    onSave={handleSaveStock}
                    onCancel={() => setIsModalVisibleStock(false)}
                    isVisible={isModalVisibleStock}
                    id={editingIngredient?.Id}
                />
            </Modal>
        </div>
    );
};

export default AdminIngredientsPage;
