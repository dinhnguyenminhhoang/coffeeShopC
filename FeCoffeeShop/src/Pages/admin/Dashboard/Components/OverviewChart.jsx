import {
    getChartOrder,
    getChartOverview,
    getChartRevenueAndProfit,
} from "@/app/action/adminAction/adminDashboard";
import React, { useEffect, useState } from "react";
import { handleFomatDate } from "../Common/Utils";
import ComposedChartWith3Axis from "../Graph/ComposedChartWith3Axis";
import DoubleBarChart from "../Graph/DoubleBarChart";
import StackedBarChart from "../Graph/StackedBarChart";
import DropDown from "./DropDown";
import DateRangeDropdown from "./DropDownDateRange";

const OverviewChart = () => {
    const [chartOverviewData, setChartOverviewData] = useState();
    const [chartRevenueAndProfitData, setChartRevenueAndProfitData] =
        useState();
    const [chartOrderData, setChartOrderData] = useState();
    const [activeCatalog, setActiveCatalog] = useState(options[0]);
    const options = ["Overview", "Orders", "Revenue & Profit"];
    const [formFaram, setFormFaram] = useState();
    const [data, setData] = useState([]);
    useEffect(() => {
        if (chartOverviewData?.success) {
            setData(chartOverviewData?.data);
        }
    }, [chartOverviewData]);
    useEffect(() => {
        if (activeCatalog === options[0]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                dispatch(
                    getChartOverview({
                        StartDate: formFaram.StartDate,
                        EndDate: formFaram.EndDate,
                    })
                );
            } else dispatch(getChartOverview({}));
        } else if (activeCatalog === options[1]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                dispatch(
                    getChartOrder({
                        StartDate: formFaram.StartDate,
                        EndDate: formFaram.EndDate,
                    })
                );
            } else dispatch(getChartOrder({}));
        } else if (activeCatalog === options[2]) {
            if (formFaram?.StartDate && formFaram.EndDate) {
                dispatch(
                    getChartRevenueAndProfit({
                        StartDate: formFaram.StartDate,
                        EndDate: formFaram.EndDate,
                    })
                );
            } else dispatch(getChartRevenueAndProfit({}));
        }
    }, [dispatch, activeCatalog, formFaram]);
    useEffect(() => {
        dispatch(getChartOverview({}));
        dispatch(getChartRevenueAndProfit({}));
        dispatch(getChartOrder({}));
    }, [dispatch]);
    const handleDropdownChange = (selectedOption) => {
        setActiveCatalog(selectedOption);

        switch (selectedOption) {
            case "Overview":
                if (chartOverviewData?.success)
                    setData(chartOverviewData?.data);
                break;
            case "Orders":
                if (chartOrderData?.success) setData(chartOrderData?.data);
                break;
            case "Revenue & Profit":
                if (chartRevenueAndProfitData?.success)
                    setData(chartRevenueAndProfitData?.data);
                break;
        }
    };
    const handleDateRangeChange = (dateRange) => {
        const startDate = handleFomatDate(dateRange.startDate);
        const endDate = handleFomatDate(dateRange.endDate);
        setFormFaram({ StartDate: startDate, EndDate: endDate });

        switch (activeCatalog) {
            case "Overview":
                if (chartOverviewData?.success)
                    setData(chartOverviewData?.data);
                break;
            case "Orders":
                if (chartOrderData?.success) setData(chartOrderData?.data);
                break;
            case "Revenue & Profit":
                if (chartRevenueAndProfitData?.success)
                    setData(chartRevenueAndProfitData?.data);
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
    return (
        <div className="rounded-md border-white border-2 p-3">
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
