import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { getIngredientById } from "../../service/Ingredients";

const IngredientForm = ({ initialValues, onSave, onCancel, isVisible }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(values);
    };

    useEffect(() => {
        if (initialValues && isVisible) {
            getIngredientById({ id: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    if (data.Success) {
                        form.setFieldsValue(data.ResultData);
                    }
                });
        } else {
            form.resetFields();
        }
    }, [initialValues, isVisible]);

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="Name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input the ingredient name!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Description"
                label="Description"
                rules={[
                    {
                        required: true,
                        message: "Please input the ingredient description!",
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

export default IngredientForm;
