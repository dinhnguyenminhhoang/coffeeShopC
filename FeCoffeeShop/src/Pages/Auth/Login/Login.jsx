import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Login = () => {
    const navigator = useNavigate();
    const onFinish = (values) => {
        console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
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
                        className="pb-4"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email của bạn!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="mr-1" />}
                            placeholder="Email"
                            className="py-2"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu của bạn!",
                            },
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="mr-1" />}
                            placeholder="Mật khẩu"
                            className="py-2"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 py-5 mt-4"
                        >
                            Đăng Nhập
                        </Button>
                    </Form.Item>
                </Form>
                <Divider>Hoặc</Divider>
                <Text className="text-center block">
                    Chưa có tài khoản?{" "}
                    <span
                        onClick={() => navigator("/register")}
                        className="text-blue-500 cursor-pointer"
                    >
                        Đăng ký ngay
                    </span>
                </Text>
            </div>
        </div>
    );
};

export default Login;
