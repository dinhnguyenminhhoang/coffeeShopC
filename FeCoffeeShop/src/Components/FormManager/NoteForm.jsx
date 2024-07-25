import { Button, Form, Input } from "antd";
import useNotification from "../../hooks/NotiHook";
import { SiSublimetext } from "react-icons/si";

const NoteForm = ({ handleClose, setCustomerNote }) => {
    const [form] = Form.useForm();
    const openNotification = useNotification();

    const handleSubmit = (values) => {
        setCustomerNote(values?.feedback);
        openNotification({
            type: "success",
            message: "Thông Báo",
            description: "ghi chú của bạn đã được gửi",
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
                rules={[{ required: true, message: "Vui lòng nhập ghi chú" }]}
            >
                <Input
                    rows={4}
                    placeholder="Nhập ghi chú của bạn"
                    className="border-slate-500 text-black placeholder:text-slate-900"
                />
            </Form.Item>
            <Button icon={<SiSublimetext />} type="primary" htmlType="submit">
                Gửi ghi chú
            </Button>
        </Form>
    );
};
export default NoteForm;
