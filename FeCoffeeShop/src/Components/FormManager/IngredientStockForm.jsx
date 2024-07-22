import { Button, DatePicker, Form, Input } from "antd";
import React, { useEffect } from "react";

const IngredientStockForm = ({ id, isVisible, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        onSave({
            ...values,
            ReceivedAt: values.ReceivedAt.format(),
            ExpiredAt: values.ExpiredAt.format(),
        });
    };

    useEffect(() => {
        form.resetFields();
    }, [id, isVisible]);
    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                initialValue={id}
                name="IngredientId"
                label="Ingredient ID"
                rules={[
                    {
                        required: true,
                        message: "Please input the ingredient ID!",
                    },
                ]}
            >
                <Input value={id} defaultValue={id} disabled />
            </Form.Item>
            <Form.Item
                name="Amount"
                label="Amount"
                rules={[
                    { required: true, message: "Please input the amount!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Cost"
                label="Cost"
                rules={[{ required: true, message: "Please input the cost!" }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="ReceivedAt"
                label="Received At"
                rules={[
                    {
                        required: true,
                        message: "Please input the received date!",
                    },
                ]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item
                name="ExpiredAt"
                label="Expired At"
                rules={[
                    {
                        required: true,
                        message: "Please input the expiry date!",
                    },
                ]}
            >
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
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

export default IngredientStockForm;
