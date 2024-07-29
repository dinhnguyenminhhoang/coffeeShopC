import BrachesFrom from "@/Components/FormManager/BrachesFrom";
import useNotification from "@/hooks/NotiHook";
import {
    createBranches,
    deleteBranches,
    getAllBranches,
    updateBranches,
} from "@/service/branchs";
import { Button, Modal, Popconfirm, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import {
    createVouchers,
    deleteVouchers,
    getListVouchers,
    updateVouchers,
} from "../../../service/voucher";
import VoucherForm from "../../../Components/FormManager/VoucherForm";

const AdminVouchers = () => {
    const [voucherData, setVoucherData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingVoucher, setEditingVoucher] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalCount, setTotalCount] = useState(0);
    const openNotification = useNotification();

    useEffect(() => {
        fetchVouchers(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchVouchers = async (pageIndex, pageSize) => {
        const response = await getListVouchers({
            PageIndex: pageIndex,
            PageSize: pageSize,
        });

        if (response.data.Success) {
            setVoucherData(response.data.ResultData);
            setTotalCount(response.data.ResultData.Paging.TotalCount);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleAdd = () => {
        setEditingVoucher(null);
        setIsModalVisible(true);
    };

    const handleEdit = (voucherData) => {
        setEditingVoucher(voucherData);
        setIsModalVisible(true);
    };

    const handleDelete = async (Vouchersid) => {
        try {
            const response = await deleteVouchers({ Vouchersid: Vouchersid });
            if (response.data?.Success) {
                fetchVouchers(currentPage, pageSize);
                openNotification({
                    type: "success",
                    description: "delete voucher successfully",
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
            if (editingVoucher) {
                const res = await updateVouchers({
                    formData: { ...values, Id: editingVoucher.Id },
                });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Edit  voucher successfully",
                    });
                }
            } else {
                const res = await createVouchers({ formData: values });
                if (res.data.Success) {
                    openNotification({
                        type: "success",
                        description: "Create voucher successfully",
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
        fetchVouchers(currentPage, pageSize);
        setIsModalVisible(false);
    };

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const columns = [
        { title: "ID", dataIndex: "Id", key: "Id" },
        { title: "Code", dataIndex: "Code", key: "Code" },
        {
            title: "AmountDrinkApply",
            dataIndex: "AmountDrinkApply",
            key: "AmountDrinkApply",
        },
        {
            title: "Discount",
            dataIndex: "Discount",
            key: "Discount",
            render: (text) => <span>{text}%</span>,
        },
        {
            title: "Remain",
            dataIndex: "Remain",
            key: "Remain",
        },
        {
            title: "Amount",
            dataIndex: "Amount",
            key: "Amount",
        },
        {
            title: "Expired At",
            dataIndex: "ExpiredAt",
            key: "ExpiredAt",
            render: (text) => new Date(text).toLocaleString("vi-VN"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <Space>
                    <Button onClick={() => handleEdit(record)}>Edit</Button>
                    <Popconfirm
                        title={`Confirm delete voucherData ${record.Code}?`}
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
                Add Voucher
            </Button>
            <Table
                columns={columns}
                dataSource={voucherData?.List}
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
                title={editingVoucher ? "Edit Voucher" : "Add Voucher"}
                visible={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >
                <VoucherForm
                    initialValues={
                        editingVoucher?.Id ? editingVoucher.Id : null
                    }
                    onSave={handleSave}
                    onCancel={() => setIsModalVisible(false)}
                />
            </Modal>
        </div>
    );
};

export default AdminVouchers;
