import useNotification from "@/hooks/NotiHook";
import { Button, Flex, Image, Modal, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { BsBack } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import DrinkForm from "@//Components/FormManager/DrinkForm";
import { deleteBranches } from "@//service/branchs";
import {
    createDrink,
    createDrinkSize,
    DeleteDrinkSize,
    getDrink,
    getDrinkById,
    updateDrink,
    updateDrinkSize,
} from "@//service/drinks";
import { formatVND } from "@//utils/resuableFuc";
import DrinksSizeForm from "@//Components/FormManager/DrinksSizeForm";
import RecipeDetailForm from "../../../Components/FormManager/RecipeDetailForm";
import { updateDrinkRecipe } from "../../../service/drinks";
import { TbReceiptEuro } from "react-icons/tb";

const DrinkManager = () => {
    const [drinksData, setDrinksData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalSizeVisible, setIsModalSizeVisible] = useState(false);
    const [isModalSizeVisibleRecipe, setIsModalVisibleRecipe] = useState(false);
    const [editingDrink, setEditingDrink] = useState(null);
    const [editingDrinkSize, setEditingDrinkSize] = useState(null);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const [detailSize, setDetailSize] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchDrinks(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchDrinks = async (pageIndex, pageSize) => {
        const response = await getDrink({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
        });

        if (response.data.Success) {
            setDrinksData(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleAdd = () => {
        setEditingDrink(null);
        setIsModalVisible(true);
    };
    const handleAddSize = () => {
        setEditingDrinkSize(null);
        setIsModalSizeVisible(true);
    };

    const handleEdit = (drinksData) => {
        setEditingDrink(drinksData);
        setIsModalVisible(true);
    };
    const handleEditRecipe = (recipe) => {
        setEditingRecipe(recipe);
        setIsModalVisibleRecipe(true);
    };
    const handleEditSize = (drinksSize) => {
        setEditingDrinkSize(drinksSize);
        setIsModalSizeVisible(true);
    };
    const handleDelete = async (branchesid) => {
        // try {
        //     const response = await deleteBranches({ branchesid: branchesid });
        //     if (response.data?.Success) {
        //         fetchDrinks(currentPage, pageSize);
        //         openNotification({
        //             type: "success",
        //             description: "delete drinksData successfully",
        //         });
        //     }
        // } catch (error) {
        //     openNotification({
        //         type: "error",
        //         message: "Thông báo",
        //         error: error,
        //     });
        // }
    };
    const handleDeleteSzie = async (drinkSizeId) => {
        try {
            const response = await DeleteDrinkSize({
                drinkSizeId: drinkSizeId,
            });
            if (response.data?.Success) {
                const response = await getDrinkById({ drinkId: detailSize.Id });
                if (response.data.Success) {
                    setDetailSize(response.data?.ResultData);
                }
                openNotification({
                    type: "success",
                    description: "delete drinks size successfully",
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
            if (editingDrink) {
                const res = await updateDrink({
                    formData: { ...values, Id: editingDrink.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Edit drinks successfully",
                    });
                }
            } else {
                const res = await createDrink({ formData: values });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create drinks successfully",
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
        fetchDrinks(currentPage, pageSize);
        setIsModalVisible(false);
    };
    const handleSaveSize = async (values) => {
        try {
            if (editingDrinkSize) {
                const res = await updateDrinkSize({
                    formData: { ...values, Id: editingDrinkSize.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Edit drinks successfully",
                    });
                }
            } else {
                const res = await createDrinkSize({
                    formData: { ...values, DrinkId: detailSize.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create drinks size successfully",
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
        const response = await getDrinkById({ drinkId: detailSize.Id });
        if (response.data.Success) {
            setDetailSize(response.data?.ResultData);
        }
        setIsModalSizeVisible(false);
    };
    const handleSaveReceipe = async (values) => {
        try {
            if (editingRecipe) {
                const res = await updateDrinkRecipe({
                    formData: values,
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Edit drinks recipe successfully",
                    });
                    const response = await getDrinkById({
                        drinkId: detailSize.Id,
                    });
                    if (response.data.Success) {
                        setDetailSize(response.data?.ResultData);
                    }
                }
            }
        } catch (error) {
            openNotification({
                type: "error",
                message: "Thông báo",
                error: error,
            });
        }
        fetchDrinks(currentPage, pageSize);
        setIsModalVisibleRecipe(false);
    };
    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };
    const handleDetail = async (data) => {
        try {
            const response = await getDrinkById({ drinkId: data.Id });
            if (response.data.Success) {
                openNotification({
                    type: "info",
                    message: "Thông báo",
                    description: "Bạn vừa chuyển sang xem size của nước",
                });
                setDetailSize(response.data?.ResultData);
            }
        } catch (error) {
            openNotification({
                type: "info",
                message: "Thông báo",
                error: error,
            });
        }
    };
    const handlebackAllDrinks = () => {
        setDetailSize(null);
        openNotification({
            type: "info",
            message: "Thông báo",
            description: "Bạn đã trở về trang quản lí nước",
        });
    };
    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        {
            title: "Image",
            dataIndex: "Image",
            key: "Image",
            render: (text) => (
                <Image src={text} className="object-contain" width={100} />
            ),
        },
        { title: "Name", dataIndex: "Name", key: "Name" },

        { title: "Description", dataIndex: "Description", key: "Description" },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleDetail(record)}>
                        Detail Size
                    </Button>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>

                    <Popconfirm
                        title={`Confirm delete drinksData ${record.Name}?`}
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

    const columnsSize = [
        {
            title: "Drinks Sizes",
            key: "DrinksSizes",
            render: (record) => (
                <Table
                    columns={[
                        { title: "Size", dataIndex: "Size", key: "Size" },
                        { title: "Ratio", dataIndex: "Ratio", key: "Ratio" },
                        {
                            title: "Price",
                            dataIndex: "Price",
                            key: "Price",
                            render: (text) => <span>{formatVND(text)}</span>,
                        },
                        {
                            title: "Actions",
                            key: "actions",
                            render: (text, record) => (
                                <Space>
                                    <Button
                                        onClick={() => handleEditSize(record)}
                                        icon={<BiEdit />}
                                    >
                                        Edit
                                    </Button>

                                    <Popconfirm
                                        title={`Confirm delete drinksData ${record.Name}?`}
                                        onConfirm={() =>
                                            handleDeleteSzie(record.Id)
                                        }
                                        onCancel={() => {}}
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <Button danger icon={<MdDelete />}>
                                            Delete
                                        </Button>
                                    </Popconfirm>
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={record.DrinksSizes}
                    pagination={false}
                />
            ),
        },
        {
            title: "Recipe",
            key: "Recipe",
            render: (record) => (
                <>
                    <Space>
                        <p>{record.Recipe?.Intructon}</p>
                        <Button
                            onClick={() => handleEditRecipe(record?.Recipe)}
                            icon={<BiEdit />}
                        >
                            update
                        </Button>
                    </Space>
                    <Table
                        columns={[
                            {
                                title: "Ingredient ID",
                                dataIndex: "IngredientId",
                                key: "IngredientId",
                            },
                            {
                                title: "Amount",
                                dataIndex: "Amount",
                                render: (text) => (
                                    <span>{formatVND(text)}</span>
                                ),
                                key: "Amount",
                            },
                        ]}
                        dataSource={record.Recipe?.RecipeDetails}
                        pagination={false}
                    />
                </>
            ),
        },
    ];
    return (
        <div className="container mx-auto p-6">
            {detailSize ? (
                <>
                    <Flex gap={6}>
                        <Button
                            type="primary"
                            onClick={handleAddSize}
                            className="mb-4"
                        >
                            Add Drink Size
                        </Button>
                        <Button onClick={handlebackAllDrinks} icon={<BsBack />}>
                            Back to all drinks
                        </Button>
                    </Flex>
                    <Table
                        columns={columnsSize}
                        dataSource={[detailSize]}
                        rowKey="Id"
                    />
                    <Modal
                        title={
                            editingDrinkSize
                                ? "Edit Drink Size"
                                : "Add Drink Size"
                        }
                        visible={isModalSizeVisible}
                        footer={null}
                        onCancel={() => setIsModalSizeVisible(false)}
                    >
                        <DrinksSizeForm
                            initialValues={
                                editingDrinkSize ? editingDrinkSize : null
                            }
                            onSave={handleSaveSize}
                            onCancel={() => setIsModalSizeVisible(false)}
                        />
                    </Modal>
                </>
            ) : (
                <>
                    <Button type="primary" onClick={handleAdd} className="mb-4">
                        Add DrinK
                    </Button>
                    <Table
                        columns={columns}
                        dataSource={drinksData?.List}
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
                        title={editingDrink ? "Edit Drink" : "Add Drink"}
                        visible={isModalVisible}
                        footer={null}
                        onCancel={() => setIsModalVisible(false)}
                    >
                        <DrinkForm
                            initialValues={
                                editingDrink?.Id ? editingDrink.Id : null
                            }
                            onSave={handleSave}
                            onCancel={() => setIsModalVisible(false)}
                        />
                    </Modal>
                </>
            )}
            <Modal
                title={editingRecipe ? "Edit Recipe" : "Add Recipe"}
                visible={isModalSizeVisibleRecipe}
                footer={null}
                onCancel={() => setIsModalVisibleRecipe(false)}
            >
                <RecipeDetailForm
                    initialValues={editingRecipe ? editingRecipe : null}
                    onSave={handleSaveReceipe}
                    visible={isModalSizeVisibleRecipe}
                    onCancel={() => setIsModalVisibleRecipe(false)}
                />
            </Modal>
        </div>
    );
};

export default DrinkManager;
