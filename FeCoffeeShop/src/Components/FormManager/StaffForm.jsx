import React, { useEffect, useState } from "react";
import {
    Form,
    Input,
    Button,
    DatePicker,
    InputNumber,
    Tabs,
    Select,
    message,
    Flex,
} from "antd";
import { getAllBranches } from "@/service/branchs";
import moment from "moment";
import { getStaffDetaiil } from "@/service/staff";
import UploadImage from "../UploadImage/UploadImage";
import { PiPasswordFill } from "react-icons/pi";
import { MdChangeCircle } from "react-icons/md";

const { TabPane } = Tabs;

const StaffForm = ({ initialValues, onSave, onCancel }) => {
    const [form] = Form.useForm();
    const [branchData, setAllbranches] = useState([]);
    const [dataUpdate, setDataUpdate] = useState();
    const [avatarUrl, setAvatarUrl] = useState("");
    const [changePassword, setChangePassword] = useState(false);

    const handleFinish = (values) => {
        form.resetFields();
        changePassword ? setChangePassword(false) : null;
        if (dataUpdate) {
            onSave({
                ...values,
                Birthday: values.Birthday
                    ? values.Birthday.format("YYYY-MM-DD")
                    : null,
                Avatar: avatarUrl,
                Id: dataUpdate.Id,
            });
        } else {
            onSave({
                ...values,
                Birthday: values.Birthday
                    ? values.Birthday.format("YYYY-MM-DD")
                    : null,
                Avatar: avatarUrl,
                Account: {
                    Username: values.Username,
                    Password: values.Password,
                },
            });
        }
    };

    useEffect(() => {
        changePassword ? setChangePassword(false) : null;
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
                        setAvatarUrl(data.ResultData.Avatar || "");
                        form.setFieldsValue({
                            ...data.ResultData,
                            Birthday: data.ResultData.Birthday
                                ? moment(data.ResultData.Birthday)
                                : null,
                            Username: data.ResultData.Account?.Username,
                            Password: data.ResultData.Account?.Password,
                        });
                    }
                });
        } else {
            form.resetFields();
            setDataUpdate(null);
            changePassword ? setChangePassword(false) : null;
        }
    }, [initialValues, changePassword]);

    const handleUploadSuccess = (url) => {
        setAvatarUrl(url);
        message.success("Image uploaded successfully!");
    };

    return (
        <Form form={form} onFinish={handleFinish} layout="vertical">
            <Tabs defaultActiveKey="1">
                {!changePassword ? (
                    <>
                        <TabPane tab="Personal Information" key="1">
                            <Form.Item
                                name="FullName"
                                label="Full Name"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the staff full name!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Flex justify="space-between" gap={8}>
                                <Form.Item
                                    name="Birthday"
                                    label="Birthday"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input the staff birthday!",
                                        },
                                    ]}
                                    className="flex-1"
                                >
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        className="w-full"
                                    />
                                </Form.Item>
                                <div>
                                    <h1 className="ml-2 mb-2">Avatar</h1>
                                    <UploadImage
                                        onUploadSuccess={handleUploadSuccess}
                                        className={"w-max mb-2"}
                                    />
                                </div>
                            </Flex>
                            <Form.Item
                                name="Address"
                                label="Address"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input the staff address!",
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
                                        message:
                                            "Please input the staff phone!",
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
                                        message:
                                            "Please input the staff email!",
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
                                        message:
                                            "Please input the staff salary!",
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
                                        message:
                                            "Please input the staff branch ID!",
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
                            {!dataUpdate ? (
                                <>
                                    <Form.Item
                                        name="Username"
                                        label="Username"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input the account username!",
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        name="Password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input the account password!",
                                            },
                                        ]}
                                    >
                                        <Input.Password />
                                    </Form.Item>
                                </>
                            ) : null}
                        </TabPane>
                    </>
                ) : (
                    <TabPane tab="Job Details" key="3">
                        <Form.Item
                            name="Username"
                            label="Username"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input the account username!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="Password"
                            label="Password"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Please input the account password!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </TabPane>
                )}
            </Tabs>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save
                </Button>
                <Button
                    danger
                    onClick={() => {
                        onCancel();
                        changePassword ? setChangePassword(false) : null;
                        form.resetFields();
                    }}
                    style={{ marginLeft: "8px" }}
                >
                    Cancel
                </Button>
                {initialValues ? (
                    !changePassword ? (
                        <Button
                            type="primary"
                            style={{ marginLeft: "8px" }}
                            icon={<PiPasswordFill />}
                            onClick={() => setChangePassword(true)}
                        >
                            Password
                        </Button>
                    ) : (
                        <Button
                            type="primary"
                            style={{ marginLeft: "8px" }}
                            icon={<MdChangeCircle />}
                            onClick={() => setChangePassword(false)}
                        >
                            Info
                        </Button>
                    )
                ) : null}
            </Form.Item>
        </Form>
    );
};

export default StaffForm;
