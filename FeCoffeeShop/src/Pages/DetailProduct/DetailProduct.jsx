import React from "react";
import { Button, Select, Radio, Tag, Row, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Option } = Select;

const HomePage = () => {
    return (
        <div className="container max-w-[1200px] mx-auto p-4">
            <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                    <div className="relative">
                        <img
                            src="https://i.pinimg.com/564x/43/60/51/436051daa1380ba78a6eb41f8b45ac9b.jpg"
                            alt="Product"
                            className="w-full max-h-[600px] rounded-md"
                        />
                        <Tag className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1">
                            BEST SELLER
                        </Tag>
                    </div>
                </Col>
                <Col xs={24} md={12}>
                    <h1 className="text-2xl font-bold mb-2">Cà Phê Sữa Đá</h1>
                    <p className="text-xl text-red-500 mb-4">29.000 đ</p>
                    <div className="mb-4">
                        <span className="block mb-2">
                            Chọn size (bắt buộc):
                        </span>
                        <Radio.Group defaultValue="Nhỏ" className="mb-4">
                            <Radio.Button value="Nhỏ">Nhỏ + 0 đ</Radio.Button>
                            <Radio.Button value="Vừa">
                                Vừa + 10.000 đ
                            </Radio.Button>
                            <Radio.Button value="Lớn">
                                Lớn + 16.000 đ
                            </Radio.Button>
                        </Radio.Group>
                    </div>
                    <div className="mb-4">
                        <span className="block mb-2">Topping:</span>
                        <Select
                            mode="multiple"
                            style={{ width: "100%" }}
                            placeholder="Chọn topping"
                        >
                            <Option value="Trân châu trắng">
                                Trân châu trắng + 10.000 đ
                            </Option>
                            <Option value="Sốt Caramel">
                                Sốt Caramel + 10.000 đ
                            </Option>
                            <Option value="Shot Espresso">
                                Shot Espresso + 10.000 đ
                            </Option>
                        </Select>
                    </div>
                    <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        size="large"
                        className="w-full bg-orange-500 hover:bg-orange-600"
                    >
                        Đặt giao tận nơi
                    </Button>
                </Col>
            </Row>
            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Mô tả sản phẩm</h2>
                <p className="mb-8">
                    Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết
                    hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị
                    ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.
                </p>
                <h2 className="text-xl font-bold mb-4">Sản phẩm liên quan</h2>
                <Row gutter={[16, 16]}>
                    {[
                        { name: "CloudFee Hạnh Nhân Nướng", price: "49.000 đ" },
                        { name: "Cold Brew Sữa Tươi", price: "49.000 đ" },
                        { name: "Espresso Đá", price: "49.000 đ" },
                        { name: "Cà Phê Đen Đá", price: "29.000 đ" },
                        { name: "Bạc Sỉu", price: "29.000 đ" },
                        { name: "Cà Phê Sữa Nóng", price: "39.000 đ" },
                    ].map((item, index) => (
                        <Col key={index} xs={12} sm={8} lg={4}>
                            <div className="text-center">
                                <img
                                    src={`https://i.pinimg.com/564x/43/60/51/436051daa1380ba78a6eb41f8b45ac9b.jpg`}
                                    alt={item.name}
                                    className="w-full rounded-md mb-2"
                                />
                                <p>{item.name}</p>
                                <p className="text-red-500">{item.price}</p>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default HomePage;
