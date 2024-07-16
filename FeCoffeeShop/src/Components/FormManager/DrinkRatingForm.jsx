import React from "react";
import { Form, Input, Button } from "antd";

const DrinkRatingForm = ({ initialValues, onSave, onCancel }) => {
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
                name="drinkId"
                label="Drink ID"
                rules={[
                    { required: true, message: "Please input the drink ID!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="rating"
                label="Rating"
                rules={[
                    { required: true, message: "Please input the rating!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="comment" label="Comment">
                <Input />
            </Form.Item>
            <Form.Item
                name="creationDate"
                label="Creation Date"
                rules={[
                    {
                        required: true,
                        message: "Please input the creation date!",
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

export default DrinkRatingForm;
