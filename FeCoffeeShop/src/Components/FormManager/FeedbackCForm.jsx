import { Button, Form, Input } from "antd";
import useNotification from "../../hooks/NotiHook";
import { SiSublimetext } from "react-icons/si";

const FeedbackCForm = ({ handleClose, onSave }) => {
    const [form] = Form.useForm();
    const openNotification = useNotification();

    const handleSubmit = (values) => {
        onSave(values?.feedback);
        openNotification({
            type: "success",
            message: "Thông Báo",
            description: "feedback của bạn đã được gửi",
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
                name="feedback"
                rules={[{ required: true, message: "Vui lòng nhập feedback" }]}
            >
                <Input
                    rows={4}
                    placeholder="Nhập feedback của bạn"
                    className="border-slate-500 text-black placeholder:text-slate-900"
                />
            </Form.Item>
            <Button icon={<SiSublimetext />} type="primary" htmlType="submit">
                Gửi feedback
            </Button>
        </Form>
    );
};
export default FeedbackCForm;
