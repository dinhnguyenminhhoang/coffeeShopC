import { Button, Table } from "antd";
import React, { useEffect, useState } from "react";
import { LuLocate } from "react-icons/lu";
import useNotification from "../../hooks/NotiHook";
import { getAllBranches } from "../../service/branchs";
import { useNavigate } from "react-router-dom";

const Branches = () => {
    const [branchesData, setBranchesData] = useState([]);
    const openNotification = useNotification();
    const navigate = useNavigate();
    useEffect(() => {
        getAllBranches({ listParam: { PageIndex: 1, PageSize: 1000 } })
            .then((response) => response.data)
            .then((data) => {
                if (data?.Success) {
                    const branches = data?.ResultData?.List;
                    setBranchesData(branches);
                }
            });
    }, []);

    const handleSelectBranch = (branch) => {
        localStorage.setItem("branch", JSON.stringify(branch));
        openNotification({
            type: "info",
            message: "Thông báo",
            description: "Cảm ơn đã chọn chi nhánh",
        });
        window.location.reload();
        navigate(-1);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "Name",
            key: "name",
        },
        {
            title: "Address",
            dataIndex: "Address",
            key: "address",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <Button
                    onClick={() => handleSelectBranch(record)}
                    icon={<LuLocate />}
                >
                    Select
                </Button>
            ),
        },
    ];

    return (
        <div className="py-14 mb-10 container max-w-[1200px]">
            <div className="container mx-auto text-center">
                Danh Sách Các Chuỗi Cữa Hàng Hiện Có
                <Table
                    dataSource={branchesData}
                    columns={columns}
                    rowKey="Id"
                    pagination={false}
                />
            </div>
        </div>
    );
};

export default Branches;
