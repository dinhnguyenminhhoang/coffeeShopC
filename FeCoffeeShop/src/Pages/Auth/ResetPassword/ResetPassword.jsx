import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Typography, Divider } from "antd";
import { LockOutlined } from "@ant-design/icons";
import BtnLoading from "@/Components/Btn/BtnLoading/BtnLoading";
import useNotification from "@/hooks/NotiHook";
import { resetPassword } from "../../../service/Customer";
const { Title, Text } = Typography;

const ResetPassword = () => {
    const navigator = useNavigate();
    const openNotification = useNotification();
    const [loading, setLoading] = useState(false);
    const { slug } = useParams();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await resetPassword({
                Password: values.Password,
                slug: slug,
            });
            if (response.data?.Success) {
                openNotification({
                    type: "success",
                    message: "Thông báo",
                    description: "Đặt lại mật khẩu thành công",
                });
                navigator("/login");
            } else {
                openNotification({
                    type: "error",
                    message: "Thông báo",
                    description: "Đặt lại mật khẩu thất bại",
                });
            }
        } catch (error) {
            console.log(error);
            openNotification({
                type: "error",
                message: "Thông báo",
                description:
                    error?.response?.data?.Message ||
                    "Có lỗi xảy ra. Vui lòng thử lại sau.",
            });
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        openNotification({
            type: "error",
            message: "Thông báo",
            error: errorInfo,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-600">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <Title level={2} className="text-center text-blue-500 pb-6">
                    Đặt Lại Mật Khẩu
                </Title>
                <Form
                    name="reset_password"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        name="Password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới của bạn!",
                            },
                            {
                                pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message:
                                    "Mật khẩu phải bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt.",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="mr-2" />}
                            className="py-2"
                            placeholder="Mật khẩu mới"
                        />
                    </Form.Item>
                    <Form.Item
                        name="cfPassword"
                        dependencies={["Password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng xác nhận mật khẩu của bạn!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (
                                        !value ||
                                        getFieldValue("Password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Mật khẩu xác nhận không khớp!"
                                        )
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="mr-2" />}
                            className="py-2"
                            placeholder="Xác nhận mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <BtnLoading
                            loading={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 py-5 mt-4"
                            htmlType="submit"
                        >
                            Đặt lại mật khẩu
                        </BtnLoading>
                    </Form.Item>
                </Form>
                <Divider>Hoặc</Divider>
                <Text className="text-center block">
                    Nhớ mật khẩu?{" "}
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

export default ResetPassword;
