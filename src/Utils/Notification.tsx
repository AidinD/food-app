import { notification } from "antd";
import { IconType, NotificationPlacement } from "antd/lib/notification";

export const showNotification = (
    message: string,
    description: string,
    type: IconType,
    duration: number
) => {
    const placement: NotificationPlacement = "topRight";

    return notification.open({
        message,
        description,
        className: "notification-" + type,
        placement,
        type,
        duration,
    });
};
