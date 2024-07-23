import React, { useEffect, useState } from "react";
import { Form, Input, Button, InputNumber, Select } from "antd";
import { getAllIngredients } from "../../service/Ingredients";

const RecipeDetailForm = ({ initialValues, onSave, onCancel, isVisible }) => {
    const [form] = Form.useForm();
    const handleFinish = (values) => {
        onSave({ ...values, Id: initialValues });
    };
    const [ingredients, setIngredients] = useState([]);
    useEffect(() => {
        form.resetFields();
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
    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
                name="Intructon"
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
            <Form.List name="RecipeDetails">
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
                                    fieldKey={[field.fieldKey, "IngredientId"]}
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
                                        {ingredients.map((ingredient) => (
                                            <Option
                                                key={ingredient.Id}
                                                value={ingredient.Id}
                                            >
                                                {ingredient.Name}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    {...field}
                                    name={[field.name, "Amount"]}
                                    fieldKey={[field.fieldKey, "Amount"]}
                                    label="Amount"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input the amount!",
                                        },
                                    ]}
                                    style={{ flex: 1, marginRight: "8px" }}
                                >
                                    <InputNumber />
                                </Form.Item>
                                <div>
                                    <h1 className="mb-2 ml-2">Xóa trường</h1>
                                    <Button
                                        type="dashed"
                                        onClick={() => remove(field.name)}
                                        style={{ marginBottom: "24px" }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block>
                                Add Recipe Detail
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

export default RecipeDetailForm;
