import React, { useEffect, useState } from "react";
import { Button, Select, Radio, Tag, Row, Col } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getDrinkById, getDrink } from "@/service/drinks";
import noImage from "@/assets/website/noimg.jpg";
import { formatVND, isValidImageUrl } from "@/utils/resuableFuc";
import Spiner from "@/Components/Spiner/Spiner";

const { Option } = Select;

const DetailProduct = () => {
    const [data, setData] = useState();
    const [selectedSize, setSelectedSize] = useState("");
    const [DrinkCateData, setDrinkCateData] = useState();
    const param = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDrinkById({ drinkId: param.id });
            if (response?.data?.Success) {
                setData(response.data?.ResultData);
                if (response.data?.ResultData?.DrinksSizes.length > 0) {
                    setSelectedSize(
                        response.data?.ResultData?.DrinksSizes[0].Price
                    );
                }
            }
        };
        const fetchDataCate = async () => {
            const response = await getDrink({
                listParam: { PageIndex: 1, PageSize: 6 },
            });
            if (response?.data?.Success) {
                setDrinkCateData(response.data?.ResultData?.List);
            }
        };
        fetchData();
        fetchDataCate();
    }, [param]);

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    return (
        <>
            {data ? (
                <div className="container max-w-[1200px] mx-auto p-4">
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
                            <h1 className="text-2xl font-bold mb-2">
                                {data.Name}
                            </h1>{" "}
                            <p className="text-xl text-red-500 mb-4">
                                {formatVND(selectedSize)}{" "}
                                {/* Display selected size price */}
                            </p>
                            <div className="mb-4">
                                <span className="block mb-2">
                                    Chọn size (bắt buộc):
                                </span>
                                {data?.DrinksSizes.length ? (
                                    <Radio.Group
                                        value={selectedSize}
                                        onChange={handleSizeChange}
                                        className="mb-4"
                                    >
                                        {data.DrinksSizes.map((size) => (
                                            <Radio.Button
                                                value={size.Price}
                                                key={size.Id}
                                            >
                                                {`${size.Size} - ${formatVND(
                                                    size.Price
                                                )}`}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                ) : null}
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
                        <h2 className="text-xl font-bold mb-4">
                            Mô tả sản phẩm
                        </h2>
                        <p className="mb-8">{data.Description}</p>
                        <h2 className="text-xl font-bold mb-4">
                            Sản phẩm liên quan
                        </h2>
                        <Row gutter={[16, 16]}>
                            {DrinkCateData?.length
                                ? DrinkCateData.map((item, index) => (
                                      <Col key={index} xs={12} sm={8} lg={4}>
                                          <div className="text-center">
                                              <img
                                                  src={item.Image}
                                                  alt={item.name}
                                                  className="w-full rounded-md mb-2 h-[240px] border shadow-md"
                                              />
                                              <p>{item.name}</p>
                                              <p className="text-red-500">
                                                  {item.Name}
                                              </p>
                                          </div>
                                      </Col>
                                  ))
                                : null}
                        </Row>
                    </div>
                </div>
            ) : (
                <Spiner />
            )}
        </>
    );
};

export default DetailProduct;
