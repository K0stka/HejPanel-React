"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Eye, EyeOff, Plus } from "lucide-react";

import AddPanelBackgroundDialog from "./AddPanelBackgroundButton";
import PageTemplate from "@/components/utility/PageTemplate";
import { PanelBackground } from "shared/types";
import PanelBackgroundElement from "./PanelBackground";
import { useState } from "react";

interface BackgroundsPageProps {
    backgrounds: PanelBackground[];
}

const BackgroundsPageClientSide = ({ backgrounds }: BackgroundsPageProps) => {
    const [showDisabled, setShowDisabled] = useState(false);
    const [addPanelBackgroundDialogOpen, setAddPanelBackgroundDialogOpen] =
        useState(false);

    return (
        <PageTemplate
            title="Pozadí panelů"
            actions={[
                {
                    id: "toggle-disabled",
                    text: showDisabled
                        ? "Skrýt deaktivovaná"
                        : "Zobrazit deaktivovaná",
                    icon: showDisabled ? <EyeOff /> : <Eye />,
                    onClick: () => setShowDisabled(!showDisabled),
                    props: {
                        variant: "secondary",
                    },
                },
                {
                    id: "add-panel-background",
                    text: "Přidat pozadí",
                    icon: <Plus />,
                    onClick: () => setAddPanelBackgroundDialogOpen(true),
                    props: {
                        variant: "outline",
                    },
                },
            ]}
        >
            <AddPanelBackgroundDialog
                addPanelBackgroundDialogOpen={addPanelBackgroundDialogOpen}
                setAddPanelBackgroundDialogOpen={
                    setAddPanelBackgroundDialogOpen
                }
            />
            <div className="grid grid-cols-1 gap-5 overflow-hidden md:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence>
                    {backgrounds
                        .filter((b) => showDisabled || !b.disabled)
                        .map((background) => (
                            <motion.div
                                key={background.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <PanelBackgroundElement
                                    panelBackground={background}
                                />
                            </motion.div>
                        ))}
                </AnimatePresence>
            </div>
        </PageTemplate>
    );
};

export default BackgroundsPageClientSide;
