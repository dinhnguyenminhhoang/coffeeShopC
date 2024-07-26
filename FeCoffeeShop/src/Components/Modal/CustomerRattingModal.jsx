import { Button, Modal, Rate, Space, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { CusotmerGetOrderDetail } from "../../service/CustomerOrder";
import useNotification from "@/hooks/NotiHook";

const CustomerRattingModal = ({ initalData, onClose, onSave, isVisible }) => {
    const [rating, setRating] = useState(5);
    const [review, setReview] = useState("");
    const [orderDetail, setOrderDetail] = useState();
    const [selectedDrinks, setSelectedDrinks] = useState([]);
    const openNotification = useNotification();

    useEffect(() => {
        setRating(5);
        setReview("");
        setOrderDetail();
        setSelectedDrinks();
        if (initalData) {
            fetchOrderDetail();
        }
    }, [initalData, isVisible]);

    const fetchOrderDetail = async () => {
        const response = await CusotmerGetOrderDetail({
            orderId: initalData.Id,
        });

        if (response.data.Success) {
            const orderDetails = response.data.ResultData.OrderDetails;
            const uniqueDrinks = orderDetails.filter(
                (drink, index, self) =>
                    index ===
                    self.findIndex((d) => d.Drink?.Id === drink?.Drink?.Id)
            );
            setOrderDetail({
                ...response.data.ResultData,
                OrderDetails: uniqueDrinks,
            });
            setSelectedDrinks(uniqueDrinks.map((drink) => drink?.Drink?.Id)); // chọn tất cả sản phẩm mặc định
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleRatingChange = (value) => {
        setRating(value);
    };

    const handleReviewChange = (e) => {
        setReview(e.target.value);
    };

    const handleDrinkSelection = (drinkId) => {
        setSelectedDrinks((prevSelectedDrinks) =>
            prevSelectedDrinks.includes(drinkId)
                ? prevSelectedDrinks.filter((id) => id !== drinkId)
                : [...prevSelectedDrinks, drinkId]
        );
    };

    const handleSubmit = () => {
        onSave(rating, review, selectedDrinks);
    };

    return (
        <Modal
            title="Đánh giá sản phẩm"
            visible={isVisible}
            footer={null}
            onCancel={onClose}
        >
            <div className="mt-8">
                <Space>
                    <h2 className="text-xl font-bold mb-4 mr-2">
                        Đánh giá sản phẩm
                    </h2>
                </Space>
                <Rate onChange={handleRatingChange} value={rating} />
                <div className="block mt-4">
                    <span className="block">Chọn sản phẩm đánh giá: </span>
                    <Space className="mt-2 flex flex-wrap">
                        {orderDetail?.OrderDetails?.map((drink) => (
                            <Checkbox
                                key={drink?.Drink?.Id}
                                checked={selectedDrinks.includes(
                                    drink?.Drink?.Id
                                )}
                                onChange={() =>
                                    handleDrinkSelection(drink?.Drink?.Id)
                                }
                            >
                                {`${drink?.Drink?.Name}`}
                            </Checkbox>
                        ))}
                    </Space>
                </div>
                <TextArea
                    rows={4}
                    value={review}
                    onChange={handleReviewChange}
                    placeholder="Viết đánh giá của bạn..."
                    className="mt-4 mb-4"
                />
                <Button
                    type="primary"
                    onClick={handleSubmit}
                    disabled={
                        !rating || !review || selectedDrinks?.length === 0
                    }
                >
                    Gửi đánh giá
                </Button>
            </div>
        </Modal>
    );
};

export default CustomerRattingModal;
