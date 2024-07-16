import React from "react";
import { Form, Input, Button } from "antd";

const StaffForm = ({ initialValues, onSave, onCancel }) => {
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
                name="name"
                label="Name"
                rules={[
                    { required: true, message: "Please input the staff name!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="address"
                label="Address"
                rules={[
                    {
                        required: true,
                        message: "Please input the staff address!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="phone"
                label="Phone"
                rules={[
                    {
                        required: true,
                        message: "Please input the staff phone!",
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

export default StaffForm;
