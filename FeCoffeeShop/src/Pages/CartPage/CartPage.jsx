import React from "react";
import { Button, Input, InputNumber, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const CartPage = () => {
    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "product",
            key: "product",
            render: (text, record) => (
                <div className="flex items-center">
                    <img
                        src={record.image}
                        alt={record.name}
                        className="w-16 h-16 mr-2 rounded-md"
                    />
                    <span>{record.name}</span>
                </div>
            ),
        },
        {
            title: "Đơn giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            render: (text, record) => (
                <InputNumber
                    type="number"
                    min={1}
                    defaultValue={record.quantity}
                    className="w-16 text-center"
                />
            ),
        },
        {
            title: "Số tiền",
            dataIndex: "total",
            key: "total",
        },
        {
            title: "Thao tác",
            dataIndex: "action",
            key: "action",
            render: () => <Button danger>Xóa</Button>,
        },
    ];

    const data = [
        {
            key: "1",
            image: "https://i.pinimg.com/564x/ea/6b/5c/ea6b5ca45e90494e8fbd8c4388025846.jpg",
            name: "Dâu Phô Mai Tươi",
            price: "55.000 đ",
            quantity: 1,
            total: "55.000 đ",
        },
        {
            key: "2",
            image: "https://i.pinimg.com/564x/ea/6b/5c/ea6b5ca45e90494e8fbd8c4388025846.jpg",
            name: "Dâu Phô Mai Tươi",
            price: "55.000 đ",
            quantity: 2,
            total: "110.000 đ",
        },
    ];

    return (
        <div className="container max-w-[1200px] mx-auto p-4 my-8">
            <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
            <div className="flex items-center mb-4">
                <Input
                    placeholder="Tìm kiếm sản phẩm"
                    prefix={<SearchOutlined />}
                    className="mr-2 w-full py-2"
                />
            </div>
            <Table columns={columns} dataSource={data} pagination={false} />
            <div className="flex justify-between items-center mt-8">
                <span className="text-xl">
                    Tổng thanh toán (2 Sản phẩm):{" "}
                    <span className="text-red-500">165.000 đ</span>
                </span>
                <Button type="primary" className="bg-black text-white py-4">
                    Thanh toán
                </Button>
            </div>
        </div>
    );
};

export default CartPage;
