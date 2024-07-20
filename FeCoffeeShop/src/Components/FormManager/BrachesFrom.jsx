import { Button, Form, Input } from "antd";
import React, { useEffect } from "react";
import { getBranchesDetaiil } from "../../service/branchs";

const BrachesFrom = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave(values);
    };

    useEffect(() => {
        if (initialValues) {
            getBranchesDetaiil({ branchesid: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    if (data.Success) {
                        form.setFieldsValue(data.ResultData);
                    }
                });
        }
    }, [initialValues]);

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="Name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input the staff name!",
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
                        message: "Please input the staff address!",
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

export default BrachesFrom;
