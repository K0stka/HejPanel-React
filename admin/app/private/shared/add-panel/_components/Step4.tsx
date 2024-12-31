import { Button } from "@/components/ui/button";
import { CreatePanelContentState } from "../page";
import { DateInput } from "@/components/inputs/DateInput";
import { Panel } from "shared/types";
import PanelPreview from "@/components/PanelPreview";

interface Step4Props {
    type: Panel["type"];
    showFrom: Date;
    showTill: Date;
    content: CreatePanelContentState<Panel["type"]>;
    submitPanel: () => void;
}

const Step4 = ({
    type,
    showFrom,
    showTill,
    content,
    submitPanel,
}: Step4Props) => {
    const panelContent: Panel["content"] =
        type === "text"
            ? {
                  content: (content as CreatePanelContentState<"text">).content,
                  background: (content as CreatePanelContentState<"text">)
                      .background,
                  textColor: (content as CreatePanelContentState<"text">)
                      .textColor,
              }
            : type == "image"
              ? {
                    url: (content as CreatePanelContentState<"image">).base64,
                }
              : {
                    url: (content as CreatePanelContentState<"video">).base64,
                };

    return (
        <>
            <h1 className="nunito bold text-2xl">Rekapitulace</h1>
            <PanelPreview type={type} content={panelContent} size={96} />
            <div className="flex items-center justify-center gap-5">
                <DateInput value={showFrom} readOnly={true} />
                -
                <DateInput value={showTill} readOnly={true} />
            </div>
            <Button onClick={submitPanel}>Odeslat</Button>
        </>
    );
};

export default Step4;
