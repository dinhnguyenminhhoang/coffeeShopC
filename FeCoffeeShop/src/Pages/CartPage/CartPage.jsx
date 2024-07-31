import { SearchOutlined } from "@ant-design/icons";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
    Button,
    Image,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Space,
    Table,
} from "antd";
import React, { useEffect, useState } from "react";
import { FcFeedback } from "react-icons/fc";
import { MdDiscount } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutForm from "../../Components/FormManager/CheckoutForm";
import CustomerOrderAddressForm from "../../Components/FormManager/CustomerOrderAddressForm";
import NoteForm from "../../Components/FormManager/NoteForm";
import CustomerInfoModal from "../../Components/Modal/CustomerInfoForm";
import useNotification from "../../hooks/NotiHook";
import { CustomerCreateOrder } from "../../service/CustomerOrder";
import { paymentsTripe } from "../../service/payment";
import { staffCreateOrder } from "../../service/staffOrder";
import { getListVouchers, getVouchersDetaiil } from "../../service/voucher";
import { formatVND, stripeKey } from "../../utils/resuableFuc";
import { RiCustomerService2Fill } from "react-icons/ri";

const stripePromise = loadStripe(stripeKey);

const CartPage = () => {
    const { role } = useParams();
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isFeedbackModalVisible, setIsNoteModalVisible] = useState(false);
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false);
    const [isUserModalVisible, setIsUserModalVisible] = useState(false);
    const [userOrderInfo, setUserOrderInfo] = useState("");
    const [customerNote, setCustomerNote] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");
    const [voucherCode, setVoucherCode] = useState("");
    const [applyVoucherCode, setApplyVoucherCode] = useState();
    const [cartInfo, setCartInfo] = useState([]);
    const [branchInfo, setBranchInfo] = useState();
    const openNotification = useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        const cartLocal = localStorage.getItem("cartInfo");
        const barnchLocal = localStorage.getItem("branch");
        if (cartLocal) {
            setCartInfo(JSON.parse(cartLocal));
        }
        if (barnchLocal) setBranchInfo(JSON.parse(barnchLocal));
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
                            Size: {record?.DrinkSize?.Size}
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: "Đơn giá",
            dataIndex: "DrinkSize",
            key: "Price",
            render: (DrinkSize) => <span>{formatVND(DrinkSize?.Price)}</span>,
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
                                item?.DrinkSize?.Size ===
                                    record?.DrinkSize?.Size
                            ) {
                                item.quantity = value;
                                item.total = item.DrinkSize.Price * value;
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
            render: (text, record) => {
                if (
                    voucherCode &&
                    applyVoucherCode?.Remain > 0 &&
                    applyVoucherCode?.DrinksApply?.length
                ) {
                    const check = applyVoucherCode?.DrinksApply?.filter(
                        (voucherCode) => voucherCode.Id === record.Id
                    );
                    if (check.length) {
                        return (
                            <Space>
                                <span className="line-through">
                                    {formatVND(text)}
                                </span>
                                <span className="text-red-500 font-bold">
                                    {formatVND(
                                        text -
                                            text *
                                                (applyVoucherCode?.Discount /
                                                    100)
                                    )}
                                </span>
                            </Space>
                        );
                    } else return <span>{formatVND(text)}</span>;
                }
                return <span>{formatVND(text)}</span>;
            },
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
                                item.Id !== record.Id ||
                                item.DrinkSize.Id !== record.DrinkSize.Id
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
    const totalAmount = cartInfo?.reduce((sum, item) => {
        if (!applyVoucherCode && !voucherCode) {
            return sum + item.total;
        } else {
            const check = applyVoucherCode?.DrinksApply?.filter(
                (voucherCode) => voucherCode.Id === item.Id
            );
            if (check?.length) {
                return (
                    sum +
                    item.total -
                    (item.total * applyVoucherCode.Discount) / 100
                );
            }
            return sum + item.total;
        }
    }, 0);

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

    const showModalCustomer = async () => {
        if (role === "staff") {
            if (!userOrderInfo.Id) {
                openNotification({
                    type: "info",
                    message: "Thông báo",
                    description: `Vui lòng nhập thông tin khách hàng`,
                });
                setIsUserModalVisible(true);
                return;
            }
        }
    };
    const showModal = async (type) => {
        if (!branchInfo?.Id) {
            openNotification({
                type: "info",
                message: "Thông báo",
                description: `Vui lòng chọn cửa hàng`,
            });
            navigate("/branches");
            return;
        }
        if (type === "online") {
            setIsModalVisible(true);
        } else if (type === "cashier" && role === "staff") {
            await fetchCreateOrder("cashier");
        }
    };
    const handleClose = async ({ isSuccess }) => {
        setIsModalVisible(false);
        if (isSuccess) {
            await fetchCreateOrder();
        }
    };
    const fetchCreateOrder = async (type = "online") => {
        const OrderDetails = cartInfo?.map((drink) => ({
            DrinkId: drink.Id,
            DrinkSizeId: drink.DrinkSize.Id,
            Quantity: drink.quantity,
            Price: drink.total,
        }));
        const formData = {
            BranchId: branchInfo.Id,
            ShippingAddress: customerAddress,
            VoucherCode:
                applyVoucherCode?.DrinksApply && applyVoucherCode?.Id
                    ? voucherCode
                    : undefined,
            PaymentMethod:
                type === "online"
                    ? "PAY_CCARD"
                    : type === "cashier"
                    ? "PAY_CASH"
                    : null,
            CustomerNote: customerNote ? customerNote : "",
            OrderDetails: OrderDetails,
        };
        let response;
        if (role === "staff") {
            response = await staffCreateOrder({
                formData: {
                    ...formData,
                    CustomerId: userOrderInfo ? userOrderInfo?.Id : undefined,
                    StaffNote: `Đây là đơn hàng của khách ${userOrderInfo?.Email}`,
                },
            });
        } else {
            response = await CustomerCreateOrder({ formData: formData });
        }
        if (response.data.Success) {
            openNotification({
                type: "success",
                message: "Thanh toán",
                description: `Vui lòng kiểm tra đơn hàng của bạn - mã đơn ${response.data?.ResultData}`,
            });
            localStorage.removeItem("cartInfo");
            if (role === "staff") {
                navigate("/manager-orders");
            } else navigate("/orders");
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
    const handleCheckingVoucher = async () => {
        const res = await getListVouchers({
            PageIndex: 1,
            PageSize: 1,
            Code: voucherCode,
        });
        if (res.data?.Success && res.data?.ResultData?.List?.length) {
            const resDetail = await getVouchersDetaiil({
                Vouchersid: res.data?.ResultData?.List[0]?.Id,
            });
            if (resDetail.data?.Success && resDetail.data?.ResultData) {
                setApplyVoucherCode(resDetail.data?.ResultData);
            }
        }
    };
    return (
        <Elements stripe={stripePromise}>
            <div className="container max-w-[1200px] mx-auto p-4 my-8">
                <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
                <div className="flex items-center mb-4">
                    <div className="flex items-center justify-between flex-1 gap-2">
                        <Space className="flex-1">
                            <Input
                                value={voucherCode}
                                onChange={(e) => {
                                    setVoucherCode(e.target.value);
                                }}
                                placeholder="Nhập mã giảm giá"
                                prefix={<SearchOutlined />}
                                className="w-full py-2 flex-1"
                            />
                            <Button
                                className="h-10"
                                type="dashed"
                                onClick={handleCheckingVoucher}
                                icon={<MdDiscount />}
                            >
                                Xác nhận
                            </Button>{" "}
                        </Space>
                        <Button
                            className="h-10"
                            type="primary"
                            onClick={showNoteModal}
                            icon={<FcFeedback />}
                        >
                            Gửi ghi chú
                        </Button>{" "}
                        {role === "staff" ? (
                            <Button
                                className="h-10"
                                type="primary"
                                onClick={() => showModalCustomer()}
                                icon={<RiCustomerService2Fill />}
                            >
                                Thêm thông tin khách hàng
                            </Button>
                        ) : (
                            <Button
                                className="h-10"
                                type="primary"
                                onClick={showAddressModal}
                                icon={<FcFeedback />}
                            >
                                Thay đổi địa chỉ giao hàng
                            </Button>
                        )}
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
                            {role === "staff" ? null : (
                                <span className="text-secondary">
                                    Địa chỉ giao hàng : {customerAddress}
                                </span>
                            )}
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
                    {role === "staff" ? (
                        <Space>
                            <Button
                                type="primary"
                                className="bg-black text-white py-4 disabled:bg-slate-400"
                                onClick={() => showModal("cashier")}
                                disabled={!cartInfo.length}
                            >
                                Thanh toán tại quầy
                            </Button>
                        </Space>
                    ) : (
                        <Button
                            type="primary"
                            className="bg-black text-white py-4 disabled:bg-slate-400"
                            onClick={() => showModal("online")}
                            disabled={
                                !customerAddress.length || !cartInfo.length
                            }
                        >
                            Thanh toán online
                        </Button>
                    )}
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
                {isUserModalVisible ? (
                    <CustomerInfoModal
                        customerData={userOrderInfo}
                        isModalVisible={isUserModalVisible}
                        setCustomerData={setUserOrderInfo}
                        setIsModalVisible={setIsUserModalVisible}
                    />
                ) : null}
            </div>
        </Elements>
    );
};

export default CartPage;
