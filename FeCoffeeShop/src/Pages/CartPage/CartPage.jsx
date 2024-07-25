import React, { useEffect, useState } from "react";
import { Button, Input, InputNumber, Table, message, Modal, Image } from "antd";
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
    const [cartInfo, setCartInfo] = useState([]);
    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "Image",
            key: "Image",
            render: (text, record) => (
                <div className="flex items-center">
                    <Image
                        src={record.Image}
                        alt={record.Nsame}
                        width={64}
                        height={64}
                        className="w-16 h-16 mr-2 rounded-md"
                    />
                    <div className="flex flex-col gap-2 ml-2">
                        <span>{record.Name}</span>
                        <span className="max-w-28">{record.Description}</span>
                    </div>
                </div>
            ),
        },
        {
            title: "Đơn giá",
            dataIndex: "DrinksSizes Price",
            key: "DrinksSizes",
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
    useEffect(() => {
        const cartLocal = localStorage.getItem("cartInfo");
        if (cartLocal) {
            setCartInfo(JSON.parse(cartLocal));
        }
    }, [localStorage]);
    // const totalAmount = data.reduce((sum, item) => sum + item.total, 0);
    console.log(cartInfo);
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
                <Table
                    columns={columns}
                    dataSource={cartInfo}
                    pagination={false}
                />
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
                        // totalAmount={totalAmount}
                        handleClose={handleClose}
                        handlePayment={handlePayment}
                    />
                </Modal>
            </div>
        </Elements>
    );
};

export default CartPage;
