import React from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const PaymentDetailForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave({
            ...values,
            paymentDate: values.paymentDate.format("YYYY-MM-DD"),
        });
    };

    return (
        <Form
            form={form}
            initialValues={
                initialValues
                    ? {
                          ...initialValues,
                          paymentDate: moment(initialValues.paymentDate),
                      }
                    : {}
            }
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
                name="amount"
                label="Amount"
                rules={[
                    { required: true, message: "Please input the amount!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="paymentDate"
                label="Payment Date"
                rules={[
                    {
                        required: true,
                        message: "Please select the payment date!",
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[
                    {
                        required: true,
                        message: "Please select the payment method!",
                    },
                ]}
            >
                <Select>
                    <Option value="Cash">Cash</Option>
                    <Option value="Card">Card</Option>
                    <Option value="Online">Online</Option>
                </Select>
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

export default PaymentDetailForm;
