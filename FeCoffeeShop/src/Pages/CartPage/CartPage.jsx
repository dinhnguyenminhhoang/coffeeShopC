import { SearchOutlined } from "@ant-design/icons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
    Button,
    Flex,
    Image,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { FcFeedback } from "react-icons/fc";
import useNotification from "../../hooks/NotiHook";
import { paymentsTripe } from "../../service/payment";
import { formatVND, stripeKey } from "../../utils/resuableFuc";
import CheckoutForm from "../../Components/FormManager/CheckoutForm";
import NoteForm from "../../Components/FormManager/NoteForm";
import { getCustomerProfile } from "../../service/profile";
import { data } from "autoprefixer";
import { CustomerCreateOrder } from "../../service/CustomerOrder";
import CustomerOrderAddressForm from "../../Components/FormManager/CustomerOrderAddressForm";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(stripeKey);

const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFeedbackModalVisible, setIsNoteModalVisible] = useState(false);
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
    const [customerNote, setCustomerNote] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [cartInfo, setCartInfo] = useState([]);
    const [branchInfo, setBranchInfo] = useState();
    const [userInfo, setUserInfo] = useState();
    const openNotification = useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        const cartLocal = localStorage.getItem("cartInfo");
        const barnchLocal = localStorage.getItem("branch");
        if (cartLocal) {
            setCartInfo(JSON.parse(cartLocal));
        }
        if (barnchLocal) setBranchInfo(JSON.parse(barnchLocal));
        getCustomerProfile()
            .then((response) => response.data)
            .then((data) => {
                if (data?.Success) {
                    setUserInfo(data?.ResultData);
                    setCustomerAddress(data?.ResultData?.Address);
                }
            });
    }, []);
    const columns = [
        {
            title: "Sản phẩm",
            dataIndex: "Image",
            key: "Image",
            render: (text, record) => (
                <div className="flex items-center">
                    <Image
                        src={record.Image}
                        alt={record.Name}
                        width={64}
                        height={64}
                        className="w-16 h-16 mr-2 rounded-md"
                    />
                    <div className="flex flex-col gap-2 ml-2 items-start">
                        <span>Tên: {record.Name}</span>
                        <span className="max-w-28">
                            Size: {record?.DinkSize?.Size}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: "Đơn giá",
            dataIndex: "DinkSize",
            key: "Price",
            render: (dinkSize) => <span>{formatVND(dinkSize.Price)}</span>,
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
                    onChange={(value) => {
                        const newData = cartInfo.map((item) => {
                            if (
                                item.Id === record.Id &&
                                item?.DinkSize?.Size === record?.DinkSize?.Size
                            ) {
                                item.quantity = value;
                                item.total = item.DinkSize.Price * value;
                            }
                            return item;
                        });
                        setCartInfo(newData);
                        localStorage.setItem(
                            "cartInfo",
                            JSON.stringify(newData)
                        );
                    }}
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
            render: (text, record) => (
                <Popconfirm
                    title="Xác nhận xóa"
                    content="Bạn có chắc chắn muốn xóa sản phẩm này?"
                    okText="Xóa"
                    cancelText="Hủy"
                    onConfirm={() => {
                        const newData = cartInfo.filter(
                            (item) =>
                                item.Id === record.Id &&
                                item?.DinkSize?.Size !== record?.DinkSize?.Size
                        );
                        setCartInfo(newData);
                        localStorage.setItem(
                            "cartInfo",
                            JSON.stringify(newData)
                        );
                    }}
                >
                    <Button danger>Xóa</Button>
                </Popconfirm>
            ),
        },
    ];

    const totalAmount = cartInfo.reduce((sum, item) => sum + item.total, 0);

    const handlePayment = async (stripe, cardElement) => {
        const response = await paymentsTripe({
            formData: {
                Amount: totalAmount,
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
        if (!branchInfo?.Id) {
            openNotification({
                type: "info",
                message: "Thông báo",
                description: `Vui lòng chọn cửa hàng`,
            });
            navigate("/branches");
        } else {
            setIsModalVisible(true);
        }
    };

    const handleClose = async ({ isSuccess }) => {
        setIsModalVisible(false);
        if (isSuccess) {
            const OrderDetails = cartInfo?.map((drink) => ({
                DrinkId: drink.Id,
                DrinkSizeId: drink.DinkSize.Id,
                Quantity: drink.quantity,
                Price: drink.total,
            }));
            const formData = {
                BranchId: branchInfo.Id,
                ShippingAddress: customerAddress,
                PaymentMethod: "PAY_CCARD",
                CustomerNote: customerNote,
                OrderDetails: OrderDetails,
            };
            const response = await CustomerCreateOrder({ formData: formData });
            if (response.data.Success) {
                openNotification({
                    type: "success",
                    message: "Thanh toán",
                    description: `Vui lòng kiểm tra đơn hàng của bạn - mã đơn ${response.data?.ResultData}`,
                });
            }
        }
    };

    const showNoteModal = () => {
        setIsNoteModalVisible(true);
    };

    const showAddressModal = () => {
        setIsAddressModalVisible(true);
    };
    const handleNoteClose = () => {
        setIsNoteModalVisible(false);
    };
    const handleAddressClose = () => {
        setIsAddressModalVisible(false);
    };
    return (
        <Elements stripe={stripePromise}>
            <div className="container max-w-[1200px] mx-auto p-4 my-8">
                <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
                <div className="flex items-center mb-4">
                    <div className="flex items-center justify-between flex-1 gap-2">
                        <Input
                            placeholder="Tìm kiếm sản phẩm"
                            prefix={<SearchOutlined />}
                            className="w-full py-2 flex-1"
                        />
                        <Button
                            className="h-10"
                            type="primary"
                            onClick={showNoteModal}
                            icon={<FcFeedback />}
                        >
                            Gửi ghi chú
                        </Button>{" "}
                        <Button
                            className="h-10"
                            type="primary"
                            onClick={showAddressModal}
                            icon={<FcFeedback />}
                        >
                            Thay đổi địa chỉ giao hàng
                        </Button>
                    </div>
                </div>
                <Table
                    columns={columns}
                    dataSource={cartInfo}
                    pagination={false}
                />
                <div className="flex justify-between items-center mt-8">
                    <div className="flex flex-col gap-2 items-start">
                        <div className="flex gap-2">
                            <span className="text-secondary">
                                Địa chỉ giao hàng : {customerAddress}
                            </span>
                            {customerNote ? (
                                <span className="text-secondary">
                                    - Ghi chú của bạn : {customerNote}
                                </span>
                            ) : null}
                        </div>
                        <span className="text-xl">
                            Tổng thanh toán ({cartInfo.length} Sản phẩm):{" "}
                            <span className="text-red-500">
                                {formatVND(totalAmount)}
                            </span>
                        </span>
                    </div>
                    <Button
                        type="primary"
                        className="bg-black text-white py-4"
                        onClick={showModal}
                        loading={loading}
                    >
                        Thanh toán online
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
                <Modal
                    title="ghi chú"
                    visible={isFeedbackModalVisible}
                    footer={null}
                    onCancel={handleNoteClose}
                >
                    <NoteForm
                        handleClose={handleNoteClose}
                        setCustomerNote={setCustomerNote}
                    />
                </Modal>
                <Modal
                    title="Địa chỉ"
                    visible={isAddressModalVisible}
                    footer={null}
                    onCancel={handleAddressClose}
                >
                    <CustomerOrderAddressForm
                        handleClose={handleAddressClose}
                        setCustomerAddress={setCustomerAddress}
                    />
                </Modal>
            </div>
        </Elements>
    );
};

export default CartPage;
