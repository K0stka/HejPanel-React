import { Activity, User } from "shared/types";

interface ActivityPreviewProps {
  activity: Activity & { author: User };
}

const ActivityPreview = ({ activity }: ActivityPreviewProps) => {
  let message;

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

  return (
    <div>
      {activity.sentAt.toLocaleString()}: {activity.author.name}
      &nbsp;
      {message}
    </div>
  );
};

export default ActivityPreview;
