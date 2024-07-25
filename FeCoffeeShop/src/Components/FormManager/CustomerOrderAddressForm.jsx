import { Button, Form, Input } from "antd";
import useNotification from "../../hooks/NotiHook";
import { SiSublimetext } from "react-icons/si";

const CustomerOrderAddressForm = ({ handleClose, setCustomerAddress }) => {
    const [form] = Form.useForm();
    const openNotification = useNotification();

    const handleSubmit = (values) => {
        setCustomerAddress(values?.address);
        openNotification({
            type: "success",
            message: "Thông Báo",
            description: "Địa chỉ của bạn đã được ghi nhận",
        });
        handleClose();
    };

    return (
        <Form
            form={form}
            onFinish={handleSubmit}
            className="min-w-80 flex flex-col justify-center gap-4"
        >
            <Form.Item
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
            >
                <Input
                    rows={4}
                    placeholder="Nhập ghi chú của bạn"
                    className="border-slate-500 text-black placeholder:text-slate-900"
                />
            </Form.Item>
            <Button icon={<SiSublimetext />} type="primary" htmlType="submit">
                Xác nhận địa chỉ
            </Button>
        </Form>
    );
};
export default CustomerOrderAddressForm;
