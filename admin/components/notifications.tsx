import { desc, eq } from "shared/orm";

import db from "shared/db";
import { getSessionUserInfo } from "@/auth/session-utils";
import { notifications } from "shared/schema";

const Notifications = async () => {
    const user = await getSessionUserInfo();

    const notificationsList = await db.query.notifications.findMany({
        where: eq(notifications.recipient, user.id),
        orderBy: desc(notifications.sentAt),
        limit: 10,
    });

    return (
        <>
            {notificationsList.map((notification) => (
                <span key={notification.id}>
                    <br />
                    <br />
                    <span>{notification.title}</span>
                    <br />
                    <span>{notification.content}</span>
                    <br />
                    <span>{notification.sentAt.toLocaleDateString()}</span>
                    <br />
                    <span>{notification.read ? "Read" : "Unread"}</span>
                </span>
            ))}
        </>
    );
};

export default Notifications;
