import React from "react";
import { Form, Input, Button } from "antd";

const RecipeDetailForm = ({ initialValues, onSave, onCancel }) => {
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
                name="recipeId"
                label="Recipe ID"
                rules={[
                    { required: true, message: "Please input the recipe ID!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="ingredientId"
                label="Ingredient ID"
                rules={[
                    {
                        required: true,
                        message: "Please input the ingredient ID!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="amount"
                label="Amount"
                rules={[
                    { required: true, message: "Please input the amount!" },
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

export default RecipeDetailForm;
