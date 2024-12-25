import { Panel } from "shared/types";
import db from "shared/db";
import { eq } from "shared/orm";
import { panelBackgrounds } from "shared/schema";

interface PanelPreviewProps {
  panel: Panel;
}

const PanelPreview = async ({ panel }: PanelPreviewProps) => {
  let background;
  if (panel.type === "text")
    background = await db.query.panelBackgrounds.findFirst({
      where: eq(panelBackgrounds.id, panel.content.background),
      columns: {
        textColor: true,
        url: true,
      },
    });

  return (
    <div className="aspect-video h-40 overflow-hidden rounded-md">
      {panel.type === "image" && (
        <img
          src={panel.content.url}
          alt="panel"
          className="h-full w-full object-cover"
        />
      )}
      {panel.type === "video" && (
        <video
          src={panel.content.url}
          className="h-full w-full object-cover"
          controls
        />
      )}
      {panel.type === "text" && (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            backgroundImage: `url(${background?.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: background?.textColor,
          }}
        >
          {panel.content.content}
        </div>
      )}
    </div>
  );
};

export default PanelPreview;
