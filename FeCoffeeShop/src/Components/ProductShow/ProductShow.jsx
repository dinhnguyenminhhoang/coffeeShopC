import { getDrink } from "@/service/drinks";
import { Col, Pagination, Row, Spin } from "antd";
import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import SpinerCpn from "../Spiner/SpinerCpn";

const ProductShow = () => {
    const [drinkData, setDrinkData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const pageSize = 8;

    const fetchDrinkData = async (pageIndex) => {
        setLoading(true);
        const response = await getDrink({
            listParam: { PageIndex: pageIndex, PageSize: pageSize },
        });
        if (response.data?.Success) {
            setDrinkData(response.data?.ResultData.List); // Assuming this is the format from your data
            setTotalCount(response.data?.ResultData.Paging.TotalCount);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchDrinkData(currentPage);
    }, [currentPage]);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <>
            <span id="ProductShow"></span>
            <div className="py-14 mb-10 bg-gray-100">
                <div className="container mx-auto">
                    <div className="text-center mb-10" data-aos="fade-up">
                        <h1 className="text-4xl font-bold text-gray-800">
                            Đặt món ngay
                        </h1>
                    </div>
                    {drinkData?.length ? (
                        <>
                            <Row
                                gutter={[16, 16]}
                                data-aos="zoom-in"
                                className="px-20"
                            >
                                {drinkData?.map((product) => (
                                    <Col
                                        key={product.Id}
                                        xs={24}
                                        sm={12}
                                        md={8}
                                        lg={6}
                                    >
                                        <ProductCard
                                            product={product}
                                            loading={loading}
                                        />
                                    </Col>
                                ))}
                            </Row>
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={totalCount}
                                onChange={onPageChange}
                                showSizeChanger={false} // Optionally hide size changer
                                className="mt-8 flex justify-center"
                            />
                        </>
                    ) : (
                        <SpinerCpn />
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductShow;
