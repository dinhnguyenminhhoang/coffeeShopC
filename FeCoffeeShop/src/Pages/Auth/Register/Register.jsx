import React from "react";
import { Form, Input, Button, Typography, Divider } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Register = () => {
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
                <Title level={2} className="text-center text-green-500 pb-4">
                    Đăng Ký
                </Title>
                <Form
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập tên đăng nhập của bạn!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="mr-2" />}
                            className="py-2"
                            placeholder="Tên đăng nhập"
                        />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập email của bạn!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="mr-2" />}
                            className="py-2"
                            placeholder="Email"
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
                            prefix={<LockOutlined className="mr-2" />}
                            className="py-2"
                            placeholder="Mật khẩu"
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={["password"]}
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
                                        getFieldValue("password") === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error(
                                            "Hai mật khẩu không trùng khớp!"
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
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="w-full py-5"
                        >
                            Đăng Ký
                        </Button>
                    </Form.Item>
                </Form>
                <Divider>Hoặc</Divider>
                <Text className="text-center block">
                    Đã có tài khoản?{" "}
                    <span
                        onClick={() => navigator("/login")}
                        className="text-blue-500 cursor-pointer"
                    >
                        Đăng nhập
                    </span>
                </Text>
            </div>
        </div>
    );
};

export default Register;
