import React from "react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { formatNumberValue } from "../Common/Utils";

// Dữ liệu giả
const sampleData = [
    { at: "2024-01-01", profit: 1000, revenue: 1500, orders: 200 },
    { at: "2024-01-02", profit: 1200, revenue: 1700, orders: 220 },
    { at: "2024-01-03", profit: 800, revenue: 1300, orders: 180 },
    { at: "2024-01-04", profit: 1500, revenue: 2000, orders: 250 },
    { at: "2024-01-05", profit: 1700, revenue: 2200, orders: 270 },
];
[
    {
        At: "2024",
        Orders: 37,
        Revenue: 2400000,
        Profit: 2395660,
    },
];
const renderTooltipContent = (o) => {
    const { payload, label } = o;
    return (
        <div className="customized-tooltip-content bg-white p-2 rounded-md">
            <p className="total">{label}</p>
            <ul className="list">
                {payload?.map((entry, index) => (
                    <li
                        key={`item-${index}`}
                        style={{ color: entry.color }}
                        className="capitalize"
                    >
                        {`${entry.name}: ${entry.value}`}
                        {["revenue", "profit"].includes(
                            entry.name.toLowerCase()
                        ) && " VND"}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ComposedChartWith3Axis = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={500} className="text-sm">
            <ComposedChart
                data={data}
                margin={{
                    top: 10,
                    bottom: 0,
                    right: 10,
                    left: 10,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis
                    dataKey="At"
                    label={{
                        value: "TIME",
                        position: "insideBottomRight",
                        offset: 0,
                    }}
                    scale="auto"
                />
                <YAxis
                    tickFormatter={formatNumberValue}
                    label={{
                        value: "VND",
                        angle: -90,
                        position: "insideBottomLeft",
                    }}
                    orientation="left"
                />
                <YAxis
                    yAxisId="right"
                    orientation="right"
                    label={{
                        value: "ORDER",
                        angle: 90,
                        position: "insideBottomRight",
                    }}
                />
                <Tooltip content={renderTooltipContent} />
                <Legend
                    verticalAlign="top"
                    formatter={(value) => (
                        <span className="capitalize">{value}</span>
                    )}
                />
                <Area
                    dataKey="Profit"
                    type="monotone"
                    fill="#82ca9d"
                    stroke="#82ca9d"
                />
                <Bar dataKey="revenue" barSize={20} fill="#413ea0" />
                <Line
                    dataKey="Orders"
                    type="monotone"
                    stroke="#ff7300"
                    yAxisId="right"
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default ComposedChartWith3Axis;
