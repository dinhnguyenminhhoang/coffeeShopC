import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Typography, Divider } from "antd";
import { MailOutlined } from "@ant-design/icons";
import BtnLoading from "@/Components/Btn/BtnLoading/BtnLoading";
import useNotification from "@/hooks/NotiHook";
import { forgotPassword } from "../../../service/Customer";
const { Title, Text } = Typography;

const ForgotPassword = () => {
    const navigator = useNavigate();
    const openNotification = useNotification();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await forgotPassword({ Email: values.Email });
            if (response.data?.Success) {
                openNotification({
                    type: "success",
                    message: "Thông báo",
                    description: "Vui lòng kiểm tra email",
                });
                navigator("/login");
            } else {
                openNotification({
                    type: "error",
                    message: "Thông báo",
                    description: "Yêu cầu đặt lại mật khẩu thất bại",
                });
            }
        } catch (error) {
            openNotification({
                type: "error",
                message: "Thông báo",
                error: error,
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        openNotification({
            type: "info",
            message: "Thông báo",
            description: "Vui lòng nhập đầy đủ thông tin",
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Title level={2} className="text-center text-blue-500 pb-6">
                    Quên Mật Khẩu
                </Title>
                <Form
                    name="forgot_password"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        name="Email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập địa chỉ email của bạn!",
                            },
                            {
                                type: "email",
                                message: "Vui lòng nhập địa chỉ email hợp lệ!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="mr-1" />}
                            className="py-2"
                            placeholder="Địa chỉ email"
                        />
                    </Form.Item>
                    <Form.Item>
                        <BtnLoading
                            loading={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 py-5 mt-4"
                            htmlType="submit"
                        >
                            Gửi Yêu Cầu
                        </BtnLoading>
                    </Form.Item>
                </Form>
                <Divider>Hoặc</Divider>
                <Text className="text-center block">
                    Đã nhớ mật khẩu?{" "}
                    <span
                        onClick={() => navigator("/login")}
                        className="text-blue-500 cursor-pointer underline"
                    >
                        Đăng nhập ngay
                    </span>
                </Text>
            </div>
        </div>
    );
};

export default ForgotPassword;
