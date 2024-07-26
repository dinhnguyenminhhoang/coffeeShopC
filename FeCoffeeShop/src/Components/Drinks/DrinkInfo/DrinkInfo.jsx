import { Button, Col, Radio, Row, Tag } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { formatVND } from "../../../utils/resuableFuc";
const DrinkInfo = ({
    data,
    handleAddToCard,
    handleSizeChange,
    selectedSize,
}) => {
    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
                <div className="relative">
                    <img
                        src={data.Image}
                        alt="Product"
                        className="w-full max-h-[600px] rounded-md"
                    />
                    <Tag className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1">
                        BEST SELLER
                    </Tag>
                </div>
            </Col>
            <Col xs={24} md={12}>
                <h1 className="text-2xl font-bold mb-2">{data.Name}</h1>
                <p className="text-xl text-red-500 mb-4">
                    {formatVND(selectedSize?.Price)}
                </p>
                <div className="mb-4">
                    <span className="block mb-2">Chọn size (bắt buộc):</span>
                    {data?.DrinksSizes.length ? (
                        <Radio.Group
                            value={selectedSize}
                            onChange={handleSizeChange}
                            className="mb-4"
                        >
                            {data.DrinksSizes.map((size) => (
                                <Radio.Button value={size} key={size.Id}>
                                    {`${size.Size} - ${formatVND(size.Price)}`}
                                </Radio.Button>
                            ))}
                        </Radio.Group>
                    ) : null}
                </div>
                <Button
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    size="large"
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={handleAddToCard}
                >
                    Thêm vào giỏ hàng
                </Button>
            </Col>
        </Row>
    );
};

export default DrinkInfo;
