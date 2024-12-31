import { Activity } from "shared/types";
import PanelPreview from "./PanelPreview";
import { getPanelById } from "@/actions/panel";

interface ActivityPreviewProps {
    activity: Activity;
    details?: boolean;
}

const ActivityText = async ({
    activity,
    details = false,
}: ActivityPreviewProps) => {
    let message, data;

    switch (activity.type) {
        case "admin:accept":
            message = "přijal žádost";
            break;
        case "admin:reject":
            message = "odmítl žádost";
            break;
        case "message":
            message = `napsal zprávu`;
            break;
        case "user:request:addPanel":
            message = "žádá o přidání panelu";
            break;
        case "admin:addPanel":
            message = "přidal panel";
            break;
        case "user:request:changeTime":
            message = "žádá o změnu zobrazení času panelu";
            break;
        case "admin:changeTime":
            message = "změnil čas zobrazení panelu";
            break;
        case "user:request:changeContent":
            message = "žádá o změnu obsahu panelu";
            break;
        case "admin:changeContent":
            message = "změnil obsah panelu";
            break;
    }

    if (details)
        switch (activity.type) {
            case "user:request:addPanel":
            case "admin:addPanel":
                const panel = await getPanelById(activity.data.panel);
                data = (
                    <>
                        <PanelPreview
                            type={panel.type}
                            content={panel.content}
                        />
                        Od: {panel.showFrom.toLocaleDateString()}
                        {JSON.stringify(panel.showFrom)}
                        <br />
                        Do: {panel.showTill.toLocaleDateString()}
                        {JSON.stringify(panel.showTill)}
                    </>
                );
                break;
        }

    return (
        <>
            {message}
            {data && <br />}
            {data && <br />}
            {data}
        </>
    );
};

export default ActivityText;
