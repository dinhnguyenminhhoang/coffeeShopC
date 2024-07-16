import React from "react";

const BranchTable = ({ branches, onSelectBranch }) => {
    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="py-2">STT</th>
                    <th className="py-2">Tên chi nhánh</th>
                    <th className="py-2">Địa chỉ</th>
                    <th className="py-2">Hành động</th>
                </tr>
            </thead>
            <tbody>
                {branches.map((branch, index) => (
                    <tr key={branch.id} className="text-center">
                        <td className="py-2">{index + 1}</td>
                        <td className="py-2">{branch.name}</td>
                        <td className="py-2">{branch.address}</td>
                        <td className="py-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                                onClick={() => onSelectBranch(branch)}
                            >
                                Chọn
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default BranchTable;
