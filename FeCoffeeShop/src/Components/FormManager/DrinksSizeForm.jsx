import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";

const DrinksSizeForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(values);
    };

    useEffect(() => {
        if (initialValues) {
            form.setFieldsValue(initialValues);
        } else form.resetFields();
    }, [initialValues]);
    return (
        <>
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item
                    name="Size"
                    label="Size"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Size!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="Ratio"
                    label="Ratio"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Ratio!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>{" "}
                <Form.Item
                    name="Price"
                    label="Price"
                    rules={[
                        {
                            required: true,
                            message: "Please input the Price!",
                        },
                    ]}
                >
                    <Input type="number" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                    <Button onClick={onCancel} style={{ marginLeft: "8px" }}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};

export default DrinksSizeForm;
