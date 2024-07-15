import React, { useState, useEffect } from "react";
import MapWithRouting from "@/Components/MapWithRouting/MapWithRouting";
import BranchTable from "@/Components/BranchTable/BranchTable";

const branches = [
    {
        id: 1,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 1, Đường A, Quận 1, Thành phố Hồ Chí Minh",
        position: [10.776889, 106.700981], // Tọa độ giả định
    },
    {
        id: 2,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 2, Đường B, Quận 1, Thành phố Hồ Chí Minh",
        position: [10.773265, 106.698055], // Tọa độ giả định
    },
    {
        id: 3,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 3, Đường C, Quận 3, Thành phố Hồ Chí Minh",
        position: [10.779785, 106.690367], // Tọa độ giả định
    },
    {
        id: 4,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 4, Đường D, Quận 5, Thành phố Hồ Chí Minh",
        position: [10.762622, 106.682507], // Tọa độ giả định
    },
    {
        id: 5,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 5, Đường E, Quận 10, Thành phố Hồ Chí Minh",
        position: [10.775657, 106.666116], // Tọa độ giả định
    },
    {
        id: 6,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 6, Đường F, Quận Tân Bình, Thành phố Hồ Chí Minh",
        position: [10.797565, 106.663194], // Tọa độ giả định
    },
    {
        id: 7,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 7, Đường G, Quận Phú Nhuận, Thành phố Hồ Chí Minh",
        position: [10.799338, 106.677945], // Tọa độ giả định
    },
    {
        id: 8,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 8, Đường H, Quận Bình Thạnh, Thành phố Hồ Chí Minh",
        position: [10.804499, 106.713344], // Tọa độ giả định
    },
    {
        id: 9,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 9, Đường I, Quận 7, Thành phố Hồ Chí Minh",
        position: [10.735605, 106.709145], // Tọa độ giả định
    },
    {
        id: 10,
        name: "COFFEE HOUSE Tea & Coffee",
        address: "Số 10, Đường J, Quận Thủ Đức, Thành phố Hồ Chí Minh",
        position: [10.848357, 106.771012], // Tọa độ giả định
    },
];
const Branches = () => {
    const [currentPosition, setCurrentPosition] = useState([0, 0]);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedArea, setSelectedArea] = useState("");

    const areas = [
        "Quận 1",
        "Quận 3",
        "Quận 5",
        "Quận 7",
        "Quận 10",
        "Tân Bình",
        "Phú Nhuận",
        "Bình Thạnh",
        "Thủ Đức",
    ];

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition([latitude, longitude]);
        });
    }, []);

    const handleSelectBranch = (branch) => {
        setSelectedBranch(branch);
    };

    return (
        <div className="py-14 mb-10 container max-w-[1200px]">
            <div className="container mx-auto text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-10">
                    -Chọn khu vực-
                </h1>
                <select
                    className="mb-6 p-2 border border-gray-400 rounded"
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                >
                    <option value="">Chọn khu vực</option>
                    {areas.map((area) => (
                        <option key={area} value={area}>
                            {area}
                        </option>
                    ))}
                </select>
                <MapWithRouting
                    branches={branches}
                    currentPosition={currentPosition}
                    selectedBranch={selectedBranch}
                />
                <BranchTable
                    branches={branches}
                    onSelectBranch={handleSelectBranch}
                />
            </div>
        </div>
    );
};

export default Branches;
