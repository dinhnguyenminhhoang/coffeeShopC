import React from "react";
import { Form, Input, Button, DatePicker } from "antd";

const OrderForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(values);
    };

    return (
        <Form
            form={form}
            initialValues={initialValues}
            onFinish={handleFinish}
            layout="vertical"
        >
            <Form.Item
                name="date"
                label="Date"
                rules={[
                    { required: true, message: "Please input the order date!" },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                name="total"
                label="Total"
                rules={[
                    {
                        required: true,
                        message: "Please input the order total!",
                    },
                ]}
            >
                <Input />
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
    );
};

export default OrderForm;
