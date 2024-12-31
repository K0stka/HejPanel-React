import { Clapperboard, Image, LetterText } from "lucide-react";
import { Panel, SetState } from "shared/types";

import { Card } from "@/components/ui/card";
import { CreatePanelContentState } from "../page";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Step1Props {
    type: Panel["type"] | undefined;
    setType: SetState<Panel["type"] | undefined>;
    setContent: SetState<CreatePanelContentState<Panel["type"] | undefined>>;
    nextStep: () => void;
}

const Step1 = ({ type, setType, setContent, nextStep }: Step1Props) => {
    interface PanelTypeButtonProps {
        type: Panel["type"];
        selectedType: Panel["type"] | undefined;
        name: string;
        icon: React.ReactNode;
    }

    const PanelTypeButton = ({
        type,
        selectedType,
        name,
        icon,
    }: PanelTypeButtonProps) => (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Card
                className={cn(
                    `flex size-36 cursor-pointer flex-col items-center justify-center gap-1 rounded-md border-2`,
                    {
                        "border-primary": type === selectedType,
                    },
                )}
                onClick={() => {
                    setType(type);
                    if (type !== selectedType) setContent(undefined);
                    nextStep();
                }}
            >
                {icon}
                {name}
            </Card>
        </motion.div>
    );

    return (
        <>
            <h1 className="nunito text-2xl font-bold">Zvolte typ panelu</h1>
            <div className="flex gap-5">
                <PanelTypeButton
                    type="image"
                    name="Obrázek"
                    icon={<Image className="size-24" />}
                    selectedType={type}
                />
                <PanelTypeButton
                    type="video"
                    name="Video"
                    icon={<Clapperboard className="size-24" />}
                    selectedType={type}
                />
                <PanelTypeButton
                    type="text"
                    name="Text"
                    icon={<LetterText className="size-24" />}
                    selectedType={type}
                />
            </div>
        </>
    );
};

export default Step1;
