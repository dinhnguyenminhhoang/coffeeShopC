import { AiOutlineTags } from "react-icons/ai";
import {
    BsBoxSeamFill,
    BsCart4,
    BsFillPostageHeartFill,
    BsPersonWorkspace,
} from "react-icons/bs";
import { GiMoneyStack, GiProfit } from "react-icons/gi";
import {
    HiMiniUserGroup,
    HiOutlineArrowDownRight,
    HiOutlineArrowUpRight,
} from "react-icons/hi2";
import { MdOutlineCategory, MdOutlineLocalShipping } from "react-icons/md";

import { useEffect, useState } from "react";
import { getSummaryParameters } from "../../../service/Summary";
import OverviewChart from "./Components/OverviewChart";
import { getAllBranches } from "../../../service/branchs";
const thisWeekColor = [
    {
        bg: "#0d9488",
        Icon: <GiMoneyStack />,
    },
    {
        bg: "#fb923c",
        Icon: <GiProfit />,
    },
    {
        bg: "#3b82f6",
        Icon: <BsCart4 />,
    },
    {
        bg: "#0891b2",
        Icon: <HiMiniUserGroup />,
    },
];

const totalColor = [
    {
        Icon: <HiMiniUserGroup />,
        bg: "#f97316",
    },
    {
        Icon: <BsPersonWorkspace />,
        bg: "#3b82f6",
    },
    {
        Icon: <BsCart4 />,
        bg: "#14b8a6",
    },
    {
        Icon: <BsBoxSeamFill />,
        bg: "#10b981",
    },
    {
        Icon: <MdOutlineLocalShipping />,
        bg: "#3258d3",
    },
    {
        Icon: <AiOutlineTags />,
        bg: "#ff6767",
    },
    {
        Icon: <MdOutlineCategory />,
        bg: "#10b981",
    },
    {
        Icon: <BsFillPostageHeartFill />,
        bg: "#f9c200",
    },
];
const Dashboard = () => {
    const [parametersData, setParametersData] = useState();
    const [branchesData, setBranchesData] = useState();
    useEffect(() => {
        getSummaryParameters()
            .then((res) => res.data)
            .then((data) => {
                if (data.Success) {
                    setParametersData(data?.ResultData);
                }
            });
        getAllBranches({ listParam: { PageIndex: 1, PageSize: 1000 } })
            .then((res) => res.data)
            .then((data) => {
                if (data.Success) {
                    setBranchesData(data?.ResultData?.List);
                }
            });
    }, []);
    return (
        <div className="h-full w-full flex flex-col gap-3 p-4 text-gray-600 font-bold text-lg">
            <div className="flex flex-col gap-6">
                <h1>Dashboard Overview</h1>

                <div className="grid gap-2 mb-8 xl:grid-cols-4 md:grid-cols-2">
                    {parametersData?.ThisWeek?.map((OverviewItem, index) => (
                        <div
                            key={index}
                            className="min-w-0 rounded-lg overflow-hidden bg-gray-800 flex justify-center h-full"
                        >
                            <div
                                className="border justify-between border-gray-800 w-full px-3 py-6 rounded-lg  text-emerald-100 bg-teal-600"
                                style={{
                                    backgroundColor: thisWeekColor[index].bg,
                                }}
                            >
                                <div className="flex gap-2 justify-between xl:mb-0 mb-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="text-center inline-block text-5xl text-emerald-100 bg-teal-600"
                                            style={{
                                                backgroundColor:
                                                    thisWeekColor[index].bg,
                                            }}
                                        >
                                            {thisWeekColor[index].Icon}
                                        </div>
                                        <div>
                                            <p className="mb-3 text-base font-medium  uppercase text-gray-100">
                                                {OverviewItem.Title}
                                            </p>
                                            <p className="text-2xl font-bold leading-none text-gray-50">
                                                {OverviewItem.Value}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <div className="flex gap-1 items-center">
                                            {OverviewItem?.GrowthPercent &&
                                            OverviewItem.GrowthPercent >= 0 ? (
                                                <div>
                                                    <HiOutlineArrowUpRight />
                                                </div>
                                            ) : (
                                                <div>
                                                    <HiOutlineArrowDownRight />
                                                </div>
                                            )}
                                            <span>
                                                {OverviewItem.GrowthPercent}%
                                            </span>
                                        </div>
                                        <span className="text-xs font-normal">
                                            Since last week
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {parametersData?.Total?.map((total, index) => (
                        <div
                            key={index}
                            className="min-w-0 rounded-lg overflow-hidden bg-slate-500 flex h-full"
                        >
                            <div className="p-4 flex items-center border border-slate-500 w-full rounded-lg">
                                <div
                                    className="flex items-center justify-center p-3 rounded-full h-12 w-12 text-center mr-4 text-lg text-white  bg-orange-500"
                                    style={{
                                        backgroundColor: totalColor[index].bg,
                                    }}
                                >
                                    {totalColor[index].Icon}
                                </div>
                                <div>
                                    <h6 className="text-sm mb-1 font-medium text-white">
                                        <span>{total.Label}</span>
                                    </h6>
                                    <p className="text-2xl font-bold leading-none text-white">
                                        {total.Value}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <OverviewChart branchesData={branchesData} />
                </div>
                {/* 

                <div className="grid grid-cols-2 gap-4">
                    <div className="lg:col-span-1 md:col-span-2">
                        <BestSellingProducts />
                    </div>
                    <div className="lg:col-span-1 md:col-span-2">
                        <TopSellingEmployees />
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-4">
                    <div className="lg:col-span-2 md:col-span-6">
                        <CatalogSellingPercent />
                    </div>
                    <div className="lg:col-span-4 md:col-span-6">
                        <RecentOrders />
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Dashboard;
