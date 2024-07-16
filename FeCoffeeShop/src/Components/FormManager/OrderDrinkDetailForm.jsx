import React from "react";
import { Form, Input, Button } from "antd";

const OrderDrinkDetailForm = ({ initialValues, onSave, onCancel }) => {
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
                name="orderId"
                label="Order ID"
                rules={[
                    { required: true, message: "Please input the order ID!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="drinkId"
                label="Drink ID"
                rules={[
                    { required: true, message: "Please input the drink ID!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="quantity"
                label="Quantity"
                rules={[
                    { required: true, message: "Please input the quantity!" },
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

export default OrderDrinkDetailForm;
