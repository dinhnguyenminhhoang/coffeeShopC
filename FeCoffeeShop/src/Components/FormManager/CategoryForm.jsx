import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { getCategoriesDetaiil } from "../../service/category";

const CategoryForm = ({ initialValues, onSave, onCancel, isModalVisible }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(values);
    };
    useEffect(() => {
        if (initialValues) {
            getCategoriesDetaiil({ CategoryId: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    if (data.Success) {
                        form.setFieldsValue(data.ResultData);
                    }
                });
        } else form.resetFields();
    }, [initialValues, isModalVisible]);

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="Name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input the category name!",
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
                        message: "Please input the category description!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item className="flex justify-end">
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button onClick={onCancel} className="ml-2">
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CategoryForm;
