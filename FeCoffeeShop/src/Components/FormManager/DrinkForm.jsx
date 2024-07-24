import React, { useEffect, useState } from "react";
import { Form, Input, Button, Tabs, InputNumber, message, Select } from "antd";
import UploadImage from "../UploadImage/UploadImage";
import { getDrinkById } from "@/service/drinks"; // Adjust the import path as needed
import { getAllIngredients } from "../../service/Ingredients";

const { TabPane } = Tabs;
const { Option } = Select;

const DrinkForm = ({ initialValues, onSave, onCancel, isVisible }) => {
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [ingredients, setIngredients] = useState([]);

    const handleFinish = (values) => {
        const finalValues = {
            ...values,
            Image: imageUrl,
        };
        onSave(finalValues);
    };

    useEffect(() => {
        form.resetFields();
        if (initialValues) {
            getDrinkById({ drinkId: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    form.setFieldsValue(data?.ResultData);
                    setImageUrl(data?.ResultData?.Image || "");
                });
        }
        fetchIngredients();
    }, [initialValues, isVisible]);

    const fetchIngredients = async () => {
        const response = await getAllIngredients({
            listParam: { PageIndex: 1, PageSize: 10000 },
        });

        if (response.data.Success) {
            setIngredients(response.data.ResultData.List);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };

    const handleUploadSuccess = (url) => {
        setImageUrl(url);
        message.success("Image uploaded successfully!");
    };

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Drink Details" key="1">
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
                    <Form.List name="DrinkSizes">
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
                                                    message:
                                                        "Please input the size!",
                                                },
                                            ]}
                                            style={{
                                                flex: 1,
                                                marginRight: "8px",
                                            }}
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
                                                    message:
                                                        "Please input the ratio!",
                                                },
                                            ]}
                                            style={{
                                                flex: 1,
                                                marginRight: "8px",
                                            }}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, "Price"]}
                                            fieldKey={[field.fieldKey, "Price"]}
                                            label="Price"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input the price!",
                                                },
                                            ]}
                                            style={{
                                                flex: 1,
                                                marginRight: "8px",
                                            }}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <div>
                                            <h1 className="mb-2 ml-2">
                                                Xóa trường
                                            </h1>
                                            <Button
                                                type="dashed"
                                                onClick={() =>
                                                    remove(field.name)
                                                }
                                                style={{ marginBottom: "24px" }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        Add Drink Size
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </TabPane>
                <TabPane tab="Recipe" key="2">
                    <Form.Item
                        name={["Recipe", "Intructon"]}
                        label="Intructon"
                        rules={[
                            {
                                required: true,
                                message: "Please input the instruction!",
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.List name={["Recipe", "RecipeDetails"]}>
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
                                            name={[field.name, "IngredientId"]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "IngredientId",
                                            ]}
                                            label="Ingredient"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please select the ingredient!",
                                                },
                                            ]}
                                            style={{
                                                flex: 1,
                                                marginRight: "8px",
                                            }}
                                        >
                                            <Select placeholder="Select an ingredient">
                                                {ingredients.map(
                                                    (ingredient) => (
                                                        <Option
                                                            key={ingredient.Id}
                                                            value={
                                                                ingredient.Id
                                                            }
                                                        >
                                                            {ingredient.Name}
                                                        </Option>
                                                    )
                                                )}
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, "Amount"]}
                                            fieldKey={[
                                                field.fieldKey,
                                                "Amount",
                                            ]}
                                            label="Amount"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        "Please input the amount!",
                                                },
                                            ]}
                                            style={{
                                                flex: 1,
                                                marginRight: "8px",
                                            }}
                                        >
                                            <InputNumber />
                                        </Form.Item>
                                        <div>
                                            <h1 className="mb-2 ml-2">
                                                Xóa trường
                                            </h1>
                                            <Button
                                                type="dashed"
                                                onClick={() =>
                                                    remove(field.name)
                                                }
                                                style={{ marginBottom: "24px" }}
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        block
                                    >
                                        Add Recipe Detail
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </TabPane>
            </Tabs>
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
