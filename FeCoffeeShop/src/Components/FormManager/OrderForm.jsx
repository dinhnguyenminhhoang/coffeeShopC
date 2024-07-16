import React from "react";
import { Form, Input, Button, DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;

const OrderForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();

    const handleFinish = (values) => {
        onSave({
            ...values,
            orderDate: values.orderDate.format("YYYY-MM-DD"),
        });
    };

    return (
        <Form
            form={form}
            initialValues={
                initialValues
                    ? {
                          ...initialValues,
                          orderDate: moment(initialValues.orderDate),
                      }
                    : {}
            }
            onFinish={handleFinish}
            layout="vertical"
        >
            <Form.Item
                name="orderDate"
                label="Order Date"
                rules={[
                    {
                        required: true,
                        message: "Please select the order date!",
                    },
                ]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                name="totalAmount"
                label="Total Amount"
                rules={[
                    {
                        required: true,
                        message: "Please input the total amount!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="staffId"
                label="Staff ID"
                rules={[
                    { required: true, message: "Please input the staff ID!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="status"
                label="Status"
                rules={[
                    { required: true, message: "Please select the status!" },
                ]}
            >
                <Select>
                    <Option value="Pending">Pending</Option>
                    <Option value="Completed">Completed</Option>
                    <Option value="Cancelled">Cancelled</Option>
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

export default OrderForm;
