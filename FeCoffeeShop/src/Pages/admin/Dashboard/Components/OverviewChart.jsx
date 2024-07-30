import React, { useEffect, useState } from "react";
import {
    getSummaryOrder,
    getSummaryOverView,
    getSummaryRevenueAndProfit,
} from "../../../../service/Summary";
import { handleFomatDate } from "../Common/Utils";
import ComposedChartWith3Axis from "../Graph/ComposedChartWith3Axis";
import DoubleBarChart from "../Graph/DoubleBarChart";
import StackedBarChart from "../Graph/StackedBarChart";
import DropDown from "./DropDown";
import DateRangeDropdown from "./DropDownDateRange";

const OverviewChart = ({ branchesData }) => {
    const options = ["Overview", "Orders", "Revenue & Profit"];
    const [chartRevenueAndProfitData, setChartRevenueAndProfitData] =
        useState();
    const [activeCatalog, setActiveCatalog] = useState(options[0]);
    const [formFaram, setFormFaram] = useState();
    const [data, setData] = useState([]);
    const [chartOrderData, setChartOrderData] = useState();
    const [overViewData, setOverViewData] = useState();
    const [revenueAndProfitData, setRevenueAndProfitData] = useState();

    useEffect(() => {
        if (overViewData) {
            setData(overViewData);
        }
    }, [overViewData]);

    useEffect(() => {
        if (activeCatalog === options[0]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                getSummaryOverView({
                    StartDate: formFaram.StartDate,
                    EndDate: formFaram.EndDate,
                })
                    .then((res) => res.data)
                    .then((data) => setOverViewData(data?.ResultData));
            } else
                getSummaryOverView({})
                    .then((res) => res.data)
                    .then((data) => setOverViewData(data?.ResultData));
        } else if (activeCatalog === options[1]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                getSummaryOrder({
                    StartDate: formFaram.StartDate,
                    EndDate: formFaram.EndDate,
                })
                    .then((res) => res.data)
                    .then((data) => setChartOrderData(data?.ResultData));
            } else
                getSummaryOrder({})
                    .then((res) => res.data)
                    .then((data) => setChartOrderData(data?.ResultData));
        } else if (activeCatalog === options[2]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                getSummaryRevenueAndProfit({
                    StartDate: formFaram.StartDate,
                    EndDate: formFaram.EndDate,
                    // BranchId: branchesData[0]?.Id,
                })
                    .then((res) => res.data)
                    .then((data) => setRevenueAndProfitData(data?.ResultData));
            } else
                getSummaryRevenueAndProfit({})
                    .then((res) => res.data)
                    .then((data) => setRevenueAndProfitData(data?.ResultData));
        }
    }, [activeCatalog, formFaram, branchesData]);
    const handleDropdownChange = (selectedOption) => {
        setActiveCatalog(selectedOption);
        switch (selectedOption) {
            case "Overview":
                if (overViewData) setData(overViewData);
                break;
            case "Orders":
                if (chartOrderData) setData(chartOrderData);
                break;
            case "Revenue & Profit":
                if (chartRevenueAndProfitData)
                    setData(chartRevenueAndProfitData);
                break;
        }
    };
    const handleDateRangeChange = (dateRange) => {
        const startDate = handleFomatDate(dateRange.startDate);
        const endDate = handleFomatDate(dateRange.endDate);
        setFormFaram({ StartDate: startDate, EndDate: endDate });

        switch (activeCatalog) {
            case "Overview":
                if (overViewData) setData(overViewData);
                break;
            case "Orders":
                if (chartOrderData) setData(chartOrderData);
                break;
            case "Revenue & Profit":
                if (revenueAndProfitData) setData(revenueAndProfitData);
                break;
        }
    };

    const renderChart = () => {
        switch (activeCatalog) {
            case "Overview":
                return <ComposedChartWith3Axis data={data} />;
            case "Orders":
                return <StackedBarChart data={data} />;
            case "Revenue & Profit":
                return <DoubleBarChart data={data} />;
        }
        return null;
    };
    console.log(activeCatalog, chartOrderData, data);
    return (
        <div className="rounded-md border-white border-2 p-3 bg-slate-600">
            <div className="mb-3 flex justify-between">
                <h1 className="text-lg font-bold text-gray-300">Charts</h1>
                <div className="flex gap-2">
                    <DropDown
                        options={options}
                        defaultOption={options[0]}
                        isDisplaySelect={true}
                        onChange={handleDropdownChange}
                    />
                    <DateRangeDropdown onChanged={handleDateRangeChange} />
                </div>
            </div>
            <div className="-mx-3 border-white border-b-2"></div>
            <div className="overflow-auto">{renderChart()}</div>
        </div>
    );
};

export default OverviewChart;
