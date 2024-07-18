import React from "react";
import { Button, Card, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import noImg from "../../assets/website/noimg.jpg";
import { isValidImageUrl } from "../../utils/resuableFuc";
import { HeartOutlined } from "@ant-design/icons";
const { Meta } = Card;

const ProductCard = ({ product, loading }) => {
    const navigator = useNavigate();
    return (
        <Card
            onClick={() => navigator(`/product/${product.id}`)}
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
                        src={
                            isValidImageUrl(product.Image)
                                ? product.Image
                                : noImg
                        }
                        className={`w-full h-80 object-cover ${
                            loading ? "opacity-50" : ""
                        }`}
                    />
                </div>
            }
            className="rounded-lg overflow-hidden shadow-lg"
        >
            <Meta title={product.Name} description={product.Description} />
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
