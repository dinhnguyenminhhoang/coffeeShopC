import useNotification from "@/hooks/NotiHook";
import { Button, Modal, Popconfirm, Space, Table, Tooltip } from "antd";
import React, { useEffect, useState } from "react";

import CategoryForm from "../../../Components/FormManager/CategoryForm";
import { feedBackForRatng, getListRatting } from "../../../service/rating";
import FeedbackCForm from "../../../Components/FormManager/FeedbackCForm";
import { BiEdit } from "react-icons/bi";
import { IoCreate } from "react-icons/io5";
import FeedbackRatingForm from "../../../Components/FormManager/FeedbackRatingForm";

const ManagerRating = () => {
    const [RatingData, setRatingData] = useState([]);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [editingRating, setEditingrating] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchRatings(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchRatings = async (pageIndex, pageSize) => {
        const response = await getListRatting({
            PageIndex: pageIndex,
            PageSize: pageSize,
        });

        if (response.data.Success) {
            setRatingData(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleEdit = (RatingData) => {
        setEditingrating(RatingData);
        setIsFeedbackVisible(true);
    };

    const handleDelete = async (CategoryId) => {
        try {
            const response = await deleteCategory({ CategoryId: CategoryId });
            if (response.data?.Success) {
                fetchRatings(currentPage, pageSize);
                openNotification({
                    type: "success",
                    description: "delete rating successfully",
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
            const res = await feedBackForRatng({
                Id: editingRating?.Id,
                Feedback: values,
            });
            if (res.data.Success) {
                openNotification({
                    type: "success",
                    description: "Feedback successfully saved",
                });
            }
        } catch (error) {
            openNotification({
                type: "error",
                message: "Thông báo",
                error: error,
            });
        }
        fetchRatings(currentPage, pageSize);
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        { title: "Rating", dataIndex: "Rating", key: "Rating" },
        { title: "Content", dataIndex: "Content", key: "Content" },
        {
            title: "Customer",
            dataIndex: ["Customer", "FullName"],
            key: "FullName",
        },
        {
            title: "CreatedAt",
            dataIndex: "CreatedAt",
            key: "CreatedAt",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "HasFeedback",
            dataIndex: "HasFeedback",
            key: "HasFeedback",
            render: (text) => (text ? "Đã trả lời" : "Chưa trả lời"),
        },

        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    {record?.HasFeedback ? (
                        <Tooltip title="Edit feedback">
                            <Button
                                icon={<BiEdit />}
                                onClick={() => handleEdit(record)}
                                className="border-yellow-400 text-yellow-400"
                            >
                                Feedback
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Create feedback">
                            <Button
                                icon={<IoCreate />}
                                onClick={() => handleEdit(record)}
                                className="border-green-400 text-green-400"
                            >
                                Feedback
                            </Button>
                        </Tooltip>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-6">
            <Table
                columns={columns}
                dataSource={RatingData?.List}
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
                title="Feedback"
                visible={isFeedbackVisible}
                footer={null}
                onCancel={() => setIsFeedbackVisible(false)}
            >
                <FeedbackRatingForm
                    handleClose={() => setIsFeedbackVisible(false)}
                    onSave={handleSave}
                    id={editingRating?.HasFeedback ? editingRating.Id : null}
                    isVisible={isFeedbackVisible}
                />
            </Modal>
        </div>
    );
};

export default ManagerRating;
