import { PhoneOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import React from "react";
import { BiPhone, BiUser } from "react-icons/bi";
import { getAllCustomers } from "../../service/Customer";

const CustomerInfoModal = ({
    isModalVisible,
    setIsModalVisible,
    setCustomerData,
    customerData,
}) => {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSearch = () => {
        form.validateFields()
            .then(async (values) => {
                if (values.phone) {
                    await fetchCustomersbyPhone(values.phone);
                }
            })
            .catch((info) => {
                toast.error("Please enter a valid phone number");
            });
    };
    const fetchCustomersbyPhone = async (phone) => {
        const response = await getAllCustomers({
            listParam: {
                PageIndex: 1,
                PageSize: 1,
                CustomerPhone: phone,
            },
        });
        if (response.data.Success) {
            setCustomerData(response.data.ResultData?.List[0]);
        } else {
            openNotification({
                type: "error",
                description: "Error from server",
            });
        }
    };
    console.log(customerData);
    return (
        <div>
            <Modal
                title="CUSTOMER"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <div className="flex gap-6 justify-end mt-3">
                        <Button
                            key="cancel"
                            danger
                            type="default"
                            onClick={handleCancel}
                        >
                            OK
                        </Button>
                        <Button
                            key="search"
                            type="primary"
                            onClick={handleSearch}
                        >
                            SEARCH
                        </Button>
                    </div>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="phone"
                        label={
                            <span>
                                <PhoneOutlined /> PHONE:
                            </span>
                        }
                    >
                        <Input placeholder="Phone Number" type="number" />
                    </Form.Item>
                </Form>
                {customerData?.Id ? (
                    <div className="flex flex-col gap-4 pt-3 border-t border-gray-600">
                        <div className="flex justify-between items-center">
                            <div>
                                <BiUser className="text-black" />
                                Email : {customerData.Email}
                            </div>
                            <div>
                                <BiPhone className="text-black" /> Phone:{" "}
                                {customerData.Phone}
                            </div>
                            <div>Address :: {customerData.Address}</div>
                        </div>
                    </div>
                ) : null}
            </Modal>
        </div>
    );
};

export default CustomerInfoModal;
