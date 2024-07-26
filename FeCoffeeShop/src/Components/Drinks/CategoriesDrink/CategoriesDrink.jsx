import { Col, Rate, Row, Space } from "antd";
import React from "react";
import { formatVND } from "../../../utils/resuableFuc";
import { useNavigate } from "react-router-dom";

const CategoriesDrink = ({ DrinkCateData, setData }) => {
    const navigate = useNavigate();
    return (
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
                                      value={item?.AverageRating || 5}
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
    );
};

export default CategoriesDrink;
