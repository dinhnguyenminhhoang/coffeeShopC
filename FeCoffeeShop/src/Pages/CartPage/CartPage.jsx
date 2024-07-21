import React, { useState } from "react";
import { Button, Input, InputNumber, Table, message, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { loadStripe } from "@stripe/stripe-js";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import { formatVND, stripeKey } from "../../utils/resuableFuc";
import useNotification from "../../hooks/NotiHook";
import { paymentsTripe } from "../../service/payment";

const stripePromise = loadStripe(stripeKey);

const CheckoutForm = ({ totalAmount, handleClose, handlePayment }) => {
    const stripe = useStripe();
    const elements = useElements();
    const openNotification = useNotification();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await handlePayment(
            stripe,
            cardElement,
            totalAmount
        );
        console.log(paymentIntent);
        if (error) {
            openNotification({
                type: "error",
                message: "Thông Báo",
                description: error?.message,
            });
            message.error(error.message);
        } else {
            openNotification({
                type: "success",
                message: "Thông Báo",
                description: "Thanh toán thành công",
            });
            handleClose();
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="min-w-80 min-h-60 flex flex-col gap-8 justify-center"
        >
            <CardElement className="p-6 border border-slate-300 rounded-md text-black" />
            <Button type="primary" htmlType="submit" disabled={!stripe}>
                Xác nhận thanh toán
            </Button>
        </form>
    );
};

const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
            render: (text) => <span>{formatVND(text)}</span>,
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
            render: (text) => <span>{formatVND(text)}</span>,
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
            price: 55000,
            quantity: 1,
            total: 55000,
            priceId: "1",
        },
        {
            key: "2",
            image: "https://i.pinimg.com/564x/ea/6b/5c/ea6b5ca45e90494e8fbd8c4388025846.jpg",
            name: "Dâu Phô Mai Tươi",
            price: 55000,
            quantity: 2,
            total: 110000,
            priceId: "2",
        },
    ];

    const totalAmount = data.reduce((sum, item) => sum + item.total, 0);

    const handlePayment = async (stripe, cardElement, amount) => {
        const response = await paymentsTripe({
            formData: {
                Amount: amount,
                Currency: "VND",
            },
        });

        const { error, paymentIntent } = await stripe.confirmCardPayment(
            response.data.ResultData,
            {
                payment_method: {
                    card: cardElement,
                },
            }
        );

        return { error, paymentIntent };
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    return (
        <Elements stripe={stripePromise}>
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
                    <Button
                        type="primary"
                        className="bg-black text-white py-4"
                        onClick={showModal}
                        loading={loading}
                    >
                        Thanh toán
                    </Button>
                </div>
                <Modal
                    title="Thanh toán"
                    visible={isModalVisible}
                    footer={null}
                    onCancel={handleClose}
                >
                    <CheckoutForm
                        totalAmount={totalAmount}
                        handleClose={handleClose}
                        handlePayment={handlePayment}
                    />
                </Modal>
            </div>
        </Elements>
    );
};

export default CartPage;
