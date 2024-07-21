import { Button, Form, Input, InputNumber, message } from "antd";
import React, { useEffect, useState } from "react";
import UploadImage from "../UploadImage/UploadImage";
import { getDrinkById } from "@/service/drinks";

const DrinkForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");

    const handleFinish = (values) => {
        const finalValues = { ...values, Image: imageUrl };
        onSave(finalValues);
    };

    useEffect(() => {
        if (initialValues) {
            getDrinkById({ drinkId: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    form.setFieldsValue(data?.ResultData);
                    setImageUrl(data?.ResultData?.Image || "");
                });
        }
    }, [initialValues]);

    const handleUploadSuccess = (url) => {
        setImageUrl(url);
        message.success("Image uploaded successfully!");
    };

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="Name"
                label="Name"
                rules={[
                    {
                        required: true,
                        message: "Please input the drink name!",
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
                        message: "Please input the drink description!",
                    },
                ]}
            >
                <Input.TextArea />
            </Form.Item>
            <UploadImage
                onUploadSuccess={handleUploadSuccess}
                className={"w-max mb-2"}
            />
            <Form.List name="DrinksSizes">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map((field, index) => (
                            <div
                                key={index}
                                style={{
                                    display: "flex",
                                    alignItems: "baseline",
                                }}
                            >
                                <Form.Item
                                    {...field}
                                    name={[field.name, "Size"]}
                                    fieldKey={[field.fieldKey, "Size"]}
                                    label="Size"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the size!",
                                        },
                                    ]}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "Ratio"]}
                                    fieldKey={[field.fieldKey, "Ratio"]}
                                    label="Ratio"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the ratio!",
                                        },
                                    ]}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "Price"]}
                                    fieldKey={[field.fieldKey, "Price"]}
                                    label="Price"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the price!",
                                        },
                                    ]}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    <Input type="number" />
                                </Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => remove(field.name)}
                                    style={{ marginBottom: "24px" }}
                                >
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                Add Drink Size
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>
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

export default DrinkForm;
