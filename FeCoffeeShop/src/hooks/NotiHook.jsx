import React from "react";
import { notification } from "antd";

const useNotification = () => {
    const openNotification = ({
        type = "success",
        message = "Thông báo",
        description,
        duration = 2,
    }) => {
        notification[type]({
            message,
            description,
            duration,
            placement: "topRight", // or any preferred placement
        });
    };

    // Limit the number of notifications
    notification.config({
        maxCount: 3,
    });

    return openNotification;
};

export default useNotification;
