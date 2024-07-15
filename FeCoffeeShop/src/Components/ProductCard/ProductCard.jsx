import React from "react";
import { Button, Card } from "antd";

const { Meta } = Card;

const ProductCard = ({ product }) => (
    <Card
        hoverable
        cover={
            <img
                alt={product.name}
                src={product.img}
                className="w-full h-80 object-cover"
            />
        }
        className="rounded-lg overflow-hidden shadow-lg"
    >
        <Meta title={product.name} description={product.price} />
        <Button
            type="primary"
            className="mt-4 w-full bg-red-500 hover:bg-red-600"
        >
            Đặt ngay
        </Button>
    </Card>
);

export default ProductCard;
