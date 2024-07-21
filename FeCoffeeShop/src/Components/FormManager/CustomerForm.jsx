import { Button, Form, Input, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { getCustomersDetaiil } from "@/service/Customer";
import { CgPassword } from "react-icons/cg";
import { PiPasswordFill } from "react-icons/pi";
import { MdChangeCircle, MdChangeHistory } from "react-icons/md";

const { TabPane } = Tabs;

const CustomerForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const [changePassword, setChangePassword] = useState(false);
    const handleFinish = (values) => {
        form.resetFields();
        onSave({
            ...values,
            Account: {
                Username: values.Username,
                Password: values.Password,
            },
        });
    };
    useEffect(() => {
        if (initialValues) {
            getCustomersDetaiil({ customerId: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    if (data.Success) {
                        !changePassword
                            ? form.setFieldsValue({
                                  ...data.ResultData,
                              })
                            : form.setFieldsValue({
                                  ...data.ResultData?.Account,
                              });
                    }
                });
        } else {
            changePassword ? setChangePassword(false) : null;
        }
    }, [initialValues, changePassword]);

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Tabs defaultActiveKey="1">
                {!changePassword ? (
                    <TabPane tab="Personal Information" key="1">
                        <Form.Item
                            name="FullName"
                            label="Full Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the Full Name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Phone"
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the Phone!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Address"
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the Address!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                    </TabPane>
                ) : null}

                {initialValues && !changePassword ? null : (
                    <TabPane tab="Account Information" key="2">
                        <Form.Item
                            name="Username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the Username!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the Password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </TabPane>
                )}
            </Tabs>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button
                    onClick={() => {
                        onCancel();
                        form.resetFields();
                    }}
                    danger
                    style={{ marginLeft: "8px" }}
                >
                    Cancel
                </Button>
                {initialValues ? (
                    !changePassword ? (
                        <Button
                            type="primary"
                            style={{ marginLeft: "8px" }}
                            icon={<PiPasswordFill />}
                            onClick={() => setChangePassword(true)}
                        >
                            Password
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            style={{ marginLeft: "8px" }}
                            icon={<MdChangeCircle />}
                            onClick={() => setChangePassword(false)}
                        >
                            Info
                        </Button>
                    )
                ) : null}
            </Form.Item>
        </Form>
    );
};

export default CustomerForm;
