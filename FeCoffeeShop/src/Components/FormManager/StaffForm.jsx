import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    Tabs,
    Select,
} from "antd";
import { getAllBranches } from "../../service/branchs";
import moment from "moment";
import { getStaffDetaiil } from "../../service/staff";

const { TabPane } = Tabs;

const StaffForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const [branchData, setAllbranches] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const handleFinish = (values) => {
        onSave({
            ...values,
            Birthday: values.Birthday
                ? values.Birthday.format("YYYY-MM-DD")
                : null,
        });
    };
    useEffect(() => {
        getAllBranches({ listParam: { PageIndex: 1, PageSize: 100 } })
            .then((response) => response.data)
            .then((data) =>
                data.Success ? setAllbranches(data.ResultData?.List) : null
            );
    }, []);
    useEffect(() => {
        if (initialValues) {
            getStaffDetaiil({ staffid: initialValues })
                .then((response) => response.data)
                .then((data) => {
                    if (data.Success) {
                        setDataUpdate(data.ResultData);
                        form.setFieldsValue({
                            ...data.ResultData,
                            Birthday: data.ResultData.Birthday
                                ? moment(data.ResultData.Birthday)
                                : null,
                        });
                    }
                });
        }
    }, [initialValues]);
    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Personal Information" key="1">
                    <Form.Item
                        name="FullName"
                        label="Full Name"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff full name!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Birthday"
                        label="Birthday"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff birthday!",
                            },
                        ]}
                    >
                        <DatePicker format="YYYY-MM-DD" />
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
                    <Form.Item
                        name="Avatar"
                        label="Avatar"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff avatar URL!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="CCCD"
                        label="CCCD"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff CCCD!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </TabPane>

                <TabPane tab="Contact Information" key="2">
                    <Form.Item
                        name="Phone"
                        label="Phone"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff phone!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff email!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </TabPane>

                <TabPane tab="Job Details" key="3">
                    <Form.Item
                        name="Salary"
                        label="Salary"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff salary!",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="OnJobDays"
                        label="On Job Days"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff on job days!",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="AsetDays"
                        label="Aset Days"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff aset days!",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="Position"
                        label="Position"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff position!",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                        name="BranchId"
                        label="Branch ID"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff branch ID!",
                            },
                        ]}
                    >
                        <Select
                            options={branchData.map((branch) => ({
                                label: `${branch.Id} - ${branch.Name}`,
                                value: branch.Id,
                            }))}
                        />
                    </Form.Item>
                    <Form.Item
                        name="AccountId"
                        label="Account ID"
                        rules={[
                            {
                                required: true,
                                message: "Please input the staff account ID!",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>
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

export default StaffForm;
