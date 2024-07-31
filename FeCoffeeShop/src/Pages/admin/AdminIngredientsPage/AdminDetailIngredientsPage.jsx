import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredientById } from "../../../service/Ingredients";
import { Button, Card, Col, Row, Table } from "antd";
import { format } from "date-fns";
import { formatVND } from "../../../utils/resuableFuc";
import SpinerCpn from "../../../Components/Spiner/SpinerCpn";
import { BsArrowLeft } from "react-icons/bs";
const AdminDetailIngredientsPage = () => {
    const { id } = useParams();
    const [data, setData] = useState();
    const navogator = useNavigate();
    useEffect(() => {
        getIngredientById({ id: id })
            .then((res) => res.data)
            .then((data) => {
                if (data.Success) {
                    setData(data.ResultData);
                }
            });
    }, [id]);
    const columns = [
        {
            title: "Id",
            dataIndex: "Id",
            key: "Id",
        },
        {
            title: "Amount",
            dataIndex: "Amount",
            key: "Amount",
        },
        {
            title: "Remain",
            dataIndex: "Remain",
            key: "Remain",
        },
        {
            title: "Cost",
            dataIndex: "Cost",
            key: "Cost",
            render: (text) => <span>{formatVND(text)}</span>,
        },
        {
            title: "Received At",
            dataIndex: "ReceivedAt",
            key: "ReceivedAt",
            render: (text) => (
                <span>{format(new Date(text), "dd/MM/yyyy HH:mm:ss")}</span>
            ),
        },
        {
            title: "Expired At",
            dataIndex: "ExpiredAt",
            key: "ExpiredAt",
            render: (text) => (
                <span>{format(new Date(text), "dd/MM/yyyy")}</span>
            ),
        },
    ];
    return data ? (
        <div className="w-full mx-auto p-4 relative">
            <Button
                icon={<BsArrowLeft />}
                className="absolute top-10 left-6"
                onClick={() => navogator(-1)}
            >
                Trở về
            </Button>
            <div className="flex justify-center items-center gap-2 my-4 flex-col">
                <p className="font-bold text-xl">Tên: {data?.Name}</p>
                <p className="text-xs">Mô tả: {data?.Description}</p>
            </div>
            <div span={12}>
                <Table
                    dataSource={data?.IngredientStocks}
                    columns={columns}
                    pagination={false}
                    rowKey="Id"
                />
            </div>
        </div>
    ) : (
        <div className="flex justify-center items-center w-full h-screen">
            <SpinerCpn />
        </div>
    );
};

export default AdminDetailIngredientsPage;
