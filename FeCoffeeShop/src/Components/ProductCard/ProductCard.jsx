import { HeartOutlined } from "@ant-design/icons";
import { Button, Card, Space, Rate } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
    const navigator = useNavigate();
    return (
        <Card
            onClick={() => navigator(`/product/${product.Id}`)}
            hoverable
            cover={
                <div className="relative w-full h-80">
                    {loading ? (
                        <div className="absolute inset-0 flex justify-center items-center text-red-500">
                            <HeartOutlined style={{ fontSize: "48px" }} spin />
                        </div>
                    ) : null}
                    <img
                        alt={product.Name}
                        src={product.Image}
                        className={`w-full h-80 object-cover ${
                            loading ? "opacity-50" : ""
                        }`}
                    />
                </div>
            }
            className="rounded-lg overflow-hidden shadow-lg"
        >
            <div className="flex flex-col gap-1">
                <Space align="center">
                    <span className="text-[16px]">{product.Name}</span>
                    <Rate
                        disabled
                        value={product.AverageRating || 5}
                        className="text-sm"
                    />
                </Space>
                <span className="text-slate-500 text-xs">
                    {product.Description}
                </span>
            </div>
            <Button
                type="primary"
                className="mt-4 w-full bg-red-500 hover:bg-red-600"
            >
                Đặt ngay
            </Button>
        </Card>
    );
};

export default ProductCard;
