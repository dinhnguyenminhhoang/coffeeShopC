import Spiner from "@/Components/Spiner/Spiner";
import { getDrink, getDrinkById } from "@/service/drinks";
import { formatVND } from "@/utils/resuableFuc";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Radio, Row, Tag, Rate, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../hooks/NotiHook";

const { TextArea } = Input;

const DetailProduct = () => {
    const [data, setData] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [DrinkCateData, setDrinkCateData] = useState();
    const [cartInfo, setCartInfo] = useState([]);
    const openNotification = useNotification();
    const navigate = useNavigate();
    const param = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDrinkById({ drinkId: param.id });
            if (response?.data?.Success) {
                setData(response.data?.ResultData);
                if (response.data?.ResultData?.DrinksSizes.length > 0) {
                    setSelectedSize(response.data?.ResultData?.DrinksSizes[0]);
                }
            }
        };
        const fetchDataCate = async () => {
            const response = await getDrink({
                listParam: {
                    PageIndex: 1,
                    PageSize: 6,
                    CategoryId: data?.Category?.Id,
                },
            });
            if (response?.data?.Success) {
                setDrinkCateData(response.data?.ResultData?.List);
            }
        };
        fetchData();
        fetchDataCate();
    }, [param]);

    useEffect(() => {
        const dataLocal = localStorage.getItem("cartInfo");
        if (dataLocal) {
            setCartInfo(JSON.parse(dataLocal));
        }
    }, []);

    useEffect(() => {
        if (cartInfo.length) {
            localStorage.setItem("cartInfo", JSON.stringify(cartInfo));
        }
    }, [cartInfo]);

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const handleAddToCard = () => {
        const newData = {
            ...data,
            DinkSize: { ...selectedSize },
            quantity: 1,
            total: selectedSize?.Price,
        };
        if (cartInfo.length) {
            const checkData = cartInfo.find(
                (card) =>
                    card?.Id === newData?.Id &&
                    card?.DinkSize?.Id === newData?.DinkSize?.Id
            );
            if (checkData) {
                openNotification({
                    type: "info",
                    message: "Thông báo",
                    description: "Sản phẩm đã trong giỏ hàng",
                });
            } else {
                setCartInfo([...cartInfo, newData]);
                openNotification({
                    type: "success",
                    message: "Thông báo",
                    description: "Đã thêm sản phẩm vào giỏ hàng",
                });
            }
        } else {
            setCartInfo([newData]);
            openNotification({
                type: "success",
                message: "Thông báo",
                description: "Đã thêm sản phẩm vào giỏ hàng",
            });
        }
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
                                {formatVND(selectedSize?.Price)}{" "}
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
                                                value={size}
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
                                      <Col
                                          onClick={() => {
                                              setData();
                                              navigate(`/product/${item.Id}`);
                                          }}
                                          key={index}
                                          xs={12}
                                          sm={8}
                                          lg={4}
                                          className="hover:pt-1 hover:transition-all duration-300 cursor-pointer"
                                      >
                                          <div className="text-start">
                                              <img
                                                  src={item?.Image}
                                                  alt={item?.name}
                                                  className="w-full hover:rounded-md hover:transition-all duration-300 mb-2 h-[240px] border shadow-md"
                                              />
                                              <Space>
                                                  <p>{item?.Name}</p>
                                                  <Rate
                                                      disabled
                                                      value={
                                                          item?.AverageRating ||
                                                          5
                                                      }
                                                      className="text-sm"
                                                  />
                                              </Space>
                                              <p className="text-red-500">
                                                  {formatVND(item?.MinPrice)}
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
