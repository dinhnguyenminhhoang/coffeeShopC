import { Button } from "antd";
import useNotification from "../../hooks/NotiHook";
import {
    Elements,
    CardElement,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
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
            handleClose({ isSuccess: true });
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
export default CheckoutForm;
