import { Button, DatePicker, Form, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { getDrink } from "../../service/drinks"; // Adjust the import based on your service structure
import { getVouchersDetaiil } from "../../service/voucher";
import moment from "moment";

const { Option } = Select;

const VoucherForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const [drinks, setDrinks] = useState([]);

    const handleFinish = (values) => {
        onSave(values);
    };

    useEffect(() => {
        if (initialValues) {
            getVouchersDetaiil({ Vouchersid: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    if (data.Success) {
                        form.setFieldsValue({
                            ...data.ResultData,
                            ExpiredAt: data.ResultData.ExpiredAt
                                ? moment(data.ResultData.ExpiredAt)
                                : null,
                        });
                    }
                });
        }

        // Fetch the list of drinks
        getDrink({ listParam: { PageIndex: 1, PageSize: 1000 } })
            .then((response) => response.data)
            .then((data) => {
                if (data.Success) {
                    setDrinks(data?.ResultData?.List);
                }
            });
    }, [initialValues]);

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="Code"
                label="Code"
                rules={[
                    {
                        required: true,
                        message: "Please input the voucher code!",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="Discount"
                label="Discount"
                rules={[
                    {
                        required: true,
                        message: "Please input the discount!",
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                name="Amount"
                label="Amount"
                rules={[
                    {
                        required: true,
                        message: "Please input the amount!",
                    },
                ]}
            >
                <Input type="number" />
            </Form.Item>
            <Form.Item
                name="ListDrink"
                label="List of Drinks"
                rules={[
                    {
                        required: true,
                        message: "Please select at least one drink!",
                    },
                ]}
            >
                <Select mode="multiple" placeholder="Select drinks">
                    {drinks.map((drink) => (
                        <Option key={drink.Id} value={drink.Id}>
                            {drink.Name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                className="w-full"
                name="ExpiredAt"
                label="Expiry Date"
                rules={[
                    {
                        required: true,
                        message: "Please select the expiry date!",
                    },
                ]}
            >
                <DatePicker showTime />
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

export default VoucherForm;
