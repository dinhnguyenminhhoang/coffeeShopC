import { Col, Row } from "antd";
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
const ProductShowData = [
    {
        id: 1,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/ea/6b/5c/ea6b5ca45e90494e8fbd8c4388025846.jpg", // Đổi thành đường dẫn thực tế đến ảnh của bạn
    },
    {
        id: 2,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/ea/6b/5c/ea6b5ca45e90494e8fbd8c4388025846.jpg",
    },
    {
        id: 3,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/ea/6b/5c/ea6b5ca45e90494e8fbd8c4388025846.jpg",
    },
    {
        id: 4,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/43/60/51/436051daa1380ba78a6eb41f8b45ac9b.jpg",
    },
    {
        id: 5,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/43/60/51/436051daa1380ba78a6eb41f8b45ac9b.jpg",
    },
    {
        id: 6,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/43/60/51/436051daa1380ba78a6eb41f8b45ac9b.jpg",
    },
    {
        id: 7,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/81/56/4a/81564a6f4168c3afa525b9a1a3d3ab75.jpg",
    },
    {
        id: 8,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/81/56/4a/81564a6f4168c3afa525b9a1a3d3ab75.jpg",
    },
    {
        id: 9,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/81/56/4a/81564a6f4168c3afa525b9a1a3d3ab75.jpg",
    },
    {
        id: 10,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/81/56/4a/81564a6f4168c3afa525b9a1a3d3ab75.jpg",
    },
    {
        id: 11,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/8b/ae/3a/8bae3a7b6cff28998e9a860505204e3d.jpg",
    },
    {
        id: 12,
        name: "Dâu Phô Mai Tươi",
        price: "55.000 đ",
        img: "https://i.pinimg.com/564x/8b/ae/3a/8bae3a7b6cff28998e9a860505204e3d.jpg",
    },
];

const ProductShow = () => {
    return (
        <div className="py-14 mb-10 bg-gray-100">
            <div className="container mx-auto">
                <div className="text-center mb-10" data-aos="fade-up">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Đặt món ngay
                    </h1>
                </div>
                <Row gutter={[16, 16]} data-aos="zoom-in" className="px-20">
                    {ProductShowData.map((product) => (
                        <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                            <ProductCard product={product} />
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};

export default ProductShow;
