import { getDrink, getDrinkById } from "@/service/drinks";
import { formatVND } from "@/utils/resuableFuc";
import {
    Button,
    Col,
    Radio,
    Row,
    Tag,
    Rate,
    Input,
    Space,
    Avatar,
    List,
    Pagination,
} from "antd";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useNotification from "../../hooks/NotiHook";
import { getListRatingDrink } from "../../service/rating";
import Spiner from "../../Components/Spiner/Spiner";
import SpinerCpn from "../../Components/Spiner/SpinerCpn";
const DrinkInfo = lazy(() => import("@/Components/Drinks/DrinkInfo/DrinkInfo"));
const CategoriesDrink = lazy(() =>
    import("@/Components/Drinks/CategoriesDrink/CategoriesDrink")
);
const { TextArea } = Input;

const DetailDrink = () => {
    const [data, setData] = useState();
    const [selectedSize, setSelectedSize] = useState();
    const [DrinkCateData, setDrinkCateData] = useState([]);
    const [dataRating, setDataRating] = useState([]);
    const [cartInfo, setCartInfo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 4;
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
        fetchData();
    }, [param]);

    useEffect(() => {
        const fetchDataCate = async () => {
            if (data?.Category?.Id) {
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
            }
        };
        fetchDataCate();
    }, [data]);

    useEffect(() => {
        const fetchDataRating = async () => {
            const response = await getListRatingDrink({
                listParam: {
                    PageIndex: currentPage,
                    PageSize: pageSize,
                },
                drinkId: param.id,
            });
            if (response?.data?.Success) {
                setDataRating(response.data?.ResultData?.List);
                setTotalCount(response.data?.ResultData?.Paging?.TotalCount);
            }
        };
        fetchDataRating();
    }, [param, currentPage]);

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
            DrinkSize: { ...selectedSize },
            quantity: 1,
            total: selectedSize?.Price,
        };
        const checkData = cartInfo.find(
            (card) =>
                card?.Id === newData?.Id &&
                card?.DrinkSize?.Id === newData?.DrinkSize?.Id
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
    };

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            {data ? (
                <div className="container max-w-[1200px] mx-auto p-4">
                    <Suspense fallback={<Spiner />}>
                        <DrinkInfo
                            data={data}
                            handleAddToCard={handleAddToCard}
                            handleSizeChange={handleSizeChange}
                            selectedSize={selectedSize}
                        />
                    </Suspense>
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">
                            Mô tả sản phẩm
                        </h2>
                        <p className="mb-8">{data.Description}</p>
                        <h2 className="text-xl font-bold mb-4">
                            Sản phẩm liên quan
                        </h2>
                        {DrinkCateData?.length ? (
                            <Suspense fallback={<SpinerCpn />}>
                                <CategoriesDrink
                                    DrinkCateData={DrinkCateData}
                                    setData={setData}
                                />
                            </Suspense>
                        ) : (
                            <SpinerCpn />
                        )}
                    </div>
                    <div className="mt-8">
                        <h2 className="text-xl font-bold mb-4">
                            Đánh giá sản phẩm
                        </h2>
                        {dataRating ? (
                            dataRating?.length ? (
                                <>
                                    <List
                                        itemLayout="horizontal"
                                        dataSource={dataRating}
                                        renderItem={(rating) => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    avatar={
                                                        <Avatar>
                                                            {rating?.Customer?.FullName.charAt(
                                                                0
                                                            )}
                                                        </Avatar>
                                                    }
                                                    title={
                                                        <Space>
                                                            <span>
                                                                {
                                                                    rating
                                                                        ?.Customer
                                                                        .FullName
                                                                }
                                                            </span>
                                                            <Rate
                                                                disabled
                                                                value={
                                                                    rating?.Rating
                                                                }
                                                            />
                                                        </Space>
                                                    }
                                                    description={
                                                        <p>{rating?.Content}</p>
                                                    }
                                                />
                                            </List.Item>
                                        )}
                                    />
                                    <Pagination
                                        current={currentPage}
                                        pageSize={pageSize}
                                        total={totalCount}
                                        onChange={onPageChange}
                                        showSizeChanger={false}
                                        className="mt-8 flex justify-center"
                                    />
                                </>
                            ) : (
                                <p>Chưa có đánh giá nào.</p>
                            )
                        ) : (
                            <SpinerCpn />
                        )}
                    </div>
                </div>
            ) : (
                <Spiner />
            )}
        </>
    );
};

export default DetailDrink;
