import { UserOutlined } from "@ant-design/icons";
import {
    Avatar,
    Button,
    Card,
    Col,
    Dropdown,
    Flex,
    Form,
    Input,
    Menu,
    Modal,
    Row,
    Typography,
} from "antd";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { BiLock } from "react-icons/bi";
import { BsBack, BsThreeDotsVertical } from "react-icons/bs";
import { RiInformationLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import useNotification from "../../../hooks/NotiHook";
import {
    customerChangePassword,
    customerUpdateInfo,
    getCustomerProfile,
} from "../../../service/profile";
const { Title } = Typography;

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isShowModalChangePassword, setIsShowModalChangePassword] =
        useState(false);
    const [isShowModalEditInfo, setIsShowModalEditInfo] = useState(false);
    const openNotification = useNotification();
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();
    const navigator = useNavigate();
    useEffect(() => {
        fetchUserInfo();
    }, []);
    useEffect(() => {
        if (isShowModalEditInfo) editForm.setFieldsValue({ ...userInfo });
    }, [isShowModalEditInfo]);
    const fetchUserInfo = async () => {
        try {
            const response = await getCustomerProfile();
            if (response.data?.Success) {
                setUserInfo(response.data?.ResultData);
            }
        } catch (error) {
            openNotification({
                type: "error",
                description: "Thông báo",
                message: error?.response?.data?.Message,
            });
        }
    };

    const handleChangePassword = async () => {
        form.validateFields()
            .then((values) => {
                customerChangePassword({ formData: values }).then(
                    (response) => {
                        if (response.data?.Success) {
                            openNotification({
                                type: "success",
                                description: "Thay đổi mật khẩu thành công",
                                message: `Mật khẩu mới của bạn là ${values.NewPassword}`,
                            });
                            Cookies.remove("AccessToken");
                            localStorage.clear();
                            navigator("/login");
                        } else {
                            openNotification({
                                type: "error",
                                description: "Thông báo",
                                message:
                                    response?.data?.response?.data?.Message,
                            });
                        }
                    }
                );
            })
            .catch((info) => {
                openNotification({
                    type: "error",
                    description: "Thông báo",
                    message: info?.response?.data?.Message,
                });
            })
            .finally(() => {
                setIsShowModalChangePassword(false);
            });
    };
    const handleEditInfo = async () => {
        editForm
            .validateFields()
            .then((values) => {
                customerUpdateInfo({ formData: values }).then((response) => {
                    if (response.data?.Success) {
                        openNotification({
                            type: "success",
                            description: "Cập nhật thông tin thành công",
                            message: `Thông tin đã được cập nhật`,
                        });
                        fetchUserInfo();
                    } else {
                        openNotification({
                            type: "error",
                            description: "Thông báo",
                            message: response?.data?.response?.data?.Message,
                        });
                    }
                });
                setIsShowModalEditInfo(false);
            })
            .catch((info) => {
                openNotification({
                    type: "error",
                    description: "Thông báo",
                    message: info?.response?.data?.Message,
                });
            });
    };

    const menu = (
        <Menu>
            <Menu.Item
                key="1"
                icon={<BiLock />}
                onClick={() => setIsShowModalChangePassword(true)}
            >
                Đổi mật khẩu
            </Menu.Item>
            <Menu.Item
                key="2"
                icon={<RiInformationLine />}
                onClick={() => {
                    setIsShowModalEditInfo(true);
                }}
            >
                Đổi thông tin
            </Menu.Item>
        </Menu>
    );
    return userInfo ? (
        <div className="flex items-center flex-col p-10 bg-gray-100 min-h-screen">
            <Card className="w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-6 relative">
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button
                        icon={<BsThreeDotsVertical />}
                        className="absolute top-4 right-4"
                    />
                </Dropdown>
                <Button
                    icon={<BsBack />}
                    className="absolute top-4 left-4"
                    onClick={() => navigator(-1)}
                >
                    Trở lại
                </Button>
                <Flex className="flex-col" align="center" justify="center">
                    <Col span={8} className="text-center">
                        <Avatar
                            size={100}
                            icon={<UserOutlined />}
                            className="mb-4"
                        />
                        <Title level={4} className="mb-0">
                            {userInfo?.FullName}
                        </Title>
                        <p className="text-gray-500">{userInfo.email}</p>
                    </Col>
                    <Flex>
                        <div>
                            <Row gutter={[16, 16]}>
                                <Col span={12}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">
                                            ID
                                        </label>
                                        <div className="border p-2 rounded bg-gray-100">
                                            {userInfo?.Id}
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">
                                            Phone
                                        </label>
                                        <div className="border p-2 rounded bg-gray-100">
                                            {userInfo?.Phone}
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">
                                            Email
                                        </label>
                                        <div className="border p-2 rounded bg-gray-100">
                                            {userInfo?.Email}
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">
                                            Address
                                        </label>
                                        <div className="border p-2 rounded bg-gray-100">
                                            {userInfo.Address}
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">
                                            Username
                                        </label>
                                        <div className="border p-2 rounded bg-gray-100">
                                            {userInfo?.Account?.Username}
                                        </div>
                                    </div>
                                </Col>
                                <Col span={12}>
                                    <div className="mb-2">
                                        <label className="block text-gray-700">
                                            Trạng thái
                                        </label>
                                        <div className="border p-2 rounded bg-gray-100">
                                            {userInfo?.Account?.IsActivated
                                                ? "Hoạt động"
                                                : "Không hoạt động"}
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Flex>
                </Flex>
            </Card>
            <Modal
                title="Đổi mật khẩu"
                visible={isShowModalChangePassword}
                onOk={handleChangePassword}
                onCancel={() => setIsShowModalChangePassword(false)}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="OldPassword"
                        label="Mật khẩu cũ"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu cũ",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="NewPassword"
                        label="Mật khẩu mới"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập mật khẩu mới",
                            },
                            {
                                min: 6,
                                message: "Mật khẩu phải có ít nhất 6 ký tự",
                            },
                            {
                                pattern: /^(?=.*[A-Z])(?=.*[!@#$&*])/,
                                message:
                                    "Mật khẩu phải có ít nhất 1 chữ hoa và 1 ký tự đặc biệt",
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Đổi thông tin"
                visible={isShowModalEditInfo}
                onOk={handleEditInfo}
                onCancel={() => setIsShowModalEditInfo(false)}
            >
                <Form form={editForm} layout="vertical">
                    <Form.Item
                        name="FullName"
                        label="Họ tên"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập họ tên",
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
                                message: "Vui lòng nhập email",
                                type: "email",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Phone"
                        label="Số điện thoại"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập số điện thoại",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="Address"
                        label="Địa chỉ"
                        rules={[
                            {
                                required: true,
                                message: "Vui lòng nhập địa chỉ",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    ) : null;
};

export default Profile;
