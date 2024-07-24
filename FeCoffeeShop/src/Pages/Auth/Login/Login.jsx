import BtnLoading from "@/Components/Btn/BtnLoading/BtnLoading";
import useNotification from "@/hooks/NotiHook";
import { customerLogin } from "@/service/auth";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Divider, Form, Input, Typography } from "antd";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { StaffLogin } from "@//service/auth";
const { Title, Text } = Typography;

const Login = () => {
    const navigator = useNavigate();
    const openNotification = useNotification();
    const [loading, setLoading] = useState(false);
    const param = useResolvedPath();
    const onFinish = async (values) => {
        setLoading(true);
        try {
            let response;
            if (param.pathname.startsWith("/admin")) {
                response = await StaffLogin({ formData: values });
            } else {
                response = await customerLogin({ formData: values });
            }
            if (response.data?.Success) {
                openNotification({
                    type: "success",
                    message: "Thông báo",
                    description: "Đăng nhập thành công",
                });
                Cookies.set(
                    "AccessToken",
                    response.data.ResultData.AccessToken
                );
                if (param.pathname.startsWith("/admin")) {
                    navigator("/manager-drinks");
                } else navigator("/");
            } else {
                openNotification({
                    type: "error",
                    message: "Thông báo",
                    description: "Đăng nhập thất bại",
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
                    Đăng Nhập
                </Title>
                <Form
                    name="login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        name="Username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên đăng nhập của bạn!",
                            },
                            {
                                min: 3,
                                message: "Tên đăng nhập phải dài hơn 3 ký tự!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="mr-1" />}
                            className="py-2"
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>
                    <Form.Item
                        name="Password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu của bạn!",
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
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>
                    <Form.Item>
                        <BtnLoading
                            loading={loading}
                            className="w-full bg-blue-500 hover:bg-blue-600 py-5 mt-4"
                            htmlType="submit"
                        >
                            Đăng nhập
                        </BtnLoading>
                    </Form.Item>
                </Form>
                <Divider>Hoặc</Divider>
                <Text className="text-center block">
                    Chưa có tài khoản?{" "}
                    <span
                        onClick={() => navigator("/register")}
                        className="text-blue-500 cursor-pointer underline"
                    >
                        Đăng ký ngay
                    </span>
                    <span
                        onClick={() => navigator("/register")}
                        className="cursor-pointer ml-1 text-xs"
                    >
                        Hoặc
                    </span>
                    <span
                        onClick={() => navigator("/forgot-password")}
                        className="text-blue-500 cursor-pointer ml-1 underline"
                    >
                        quên mật khẩu
                    </span>
                </Text>
            </div>
        </div>
    );
};

export default Login;
