import React, { useState } from "react";
import { Pagination, List, Typography } from "antd";

const { Title, Paragraph } = Typography;

const Pagination = ({ itemsPerPage, data }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    return (
        <div>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={paginatedData}
                renderItem={(item) => (
                    <List.Item key={item.id}>
                        <Title level={4}>{item.title}</Title>
                        <Paragraph>{item.description}</Paragraph>
                    </List.Item>
                )}
            />
            <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={data.length}
                onChange={handlePageChange}
                showSizeChanger={false}
                className="mt-4"
            />
        </div>
    );
};

export default Pagination;
