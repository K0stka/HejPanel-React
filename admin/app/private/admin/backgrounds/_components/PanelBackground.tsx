"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Eye, EyeClosed, EyeOff, Loader2, Save, Trash2 } from "lucide-react";
import { PanelBackground, SetState } from "shared/types";
import {
    disablePanelBackground,
    enablePanelBackground,
    updatePanelBackgroundTextColor,
} from "../actions";

import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/inputs/ColorPicker";
import { Input } from "@/components/ui/input";
import PanelPreview from "@/components/PanelPreview";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

interface PanelBackgroundElementProps {
    panelBackground: PanelBackground;
}

const PanelBackgroundElement = ({
    panelBackground,
}: PanelBackgroundElementProps) => {
    const [textColor, setTextColor] = useState(panelBackground.textColor);
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [disableDialogOpen, setDisableDialogOpen] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEnabling, setIsEnabling] = useState(false);
    const [isDisabling, setIsDisabling] = useState(false);

    const update = () => {
        setIsUpdating(true);
        updatePanelBackgroundTextColor(panelBackground.id, textColor)
            .then(() => {
                toast.success("Barva textu byla úspěšně změněna");
            })
            .catch((e) => {
                toast.error("Barvu textu se nepodařilo změnit", {
                    description: e.message,
                });
            })
            .finally(() => {
                setIsUpdating(false);
            });
    };

    const enable = () => {
        setIsEnabling(true);
        enablePanelBackground(panelBackground.id)
            .then(() => {
                toast.success("Pozadí bylo úspěšně aktivováno");
            })
            .catch((e) => {
                toast.error("Pozadí se nepodařilo aktivovat", {
                    description: e.message,
                });
            })
            .finally(() => {
                setIsEnabling(false);
            });
    };

    const disable = () => {
        setIsDisabling(true);
        disablePanelBackground(panelBackground.id)
            .then(() => {
                toast.success("Pozadí bylo úspěšně deaktivované");
            })
            .catch((e) => {
                toast.error("Pozadí se nepodařilo deaktivovat", {
                    description: e.message,
                });
            })
            .finally(() => {
                setDisableDialogOpen(false);
                setIsDisabling(false);
            });
    };

    return (
        <Card
            className={cn("pt-6", {
                "border-primary": textColor !== panelBackground.textColor,
                "bg-muted": panelBackground.disabled,
            })}
        >
            <CardContent>
                <PanelPreview
                    type="text"
                    content={{
                        background: panelBackground.id,
                        textColor: textColor,
                        content: "Takto vypadá text",
                    }}
                    className="h-auto w-full"
                />
            </CardContent>
            <CardFooter
                className={cn("grid gap-2", {
                    "grid-cols-[auto,1fr,auto]":
                        textColor === panelBackground.textColor,
                    "grid-cols-[auto,1fr,auto,auto]":
                        textColor !== panelBackground.textColor,
                })}
            >
                <ColorPicker
                    value={textColor}
                    onChange={setTextColor}
                    open={colorPickerOpen}
                    setOpen={setColorPickerOpen}
                    disabled={isUpdating || panelBackground.disabled}
                />
                <Input
                    value={textColor}
                    readOnly
                    className={cn({
                        "border-primary":
                            textColor !== panelBackground.textColor,
                        "cursor-pointer":
                            !isUpdating && !panelBackground.disabled,
                        "cursor-default":
                            isUpdating || panelBackground.disabled,
                    })}
                    onClick={() =>
                        !isUpdating &&
                        !panelBackground.disabled &&
                        setColorPickerOpen(true)
                    }
                />
                {textColor !== panelBackground.textColor && (
                    <Button size="icon" onClick={update} disabled={isUpdating}>
                        {isUpdating ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Save />
                        )}
                    </Button>
                )}
                {panelBackground.disabled ? (
                    <EnableButton enable={enable} isEnabling={isEnabling} />
                ) : (
                    <DisableButton
                        disable={disable}
                        disableDialogOpen={disableDialogOpen}
                        setDisableDialogOpen={setDisableDialogOpen}
                        isDisabling={isDisabling}
                    />
                )}
            </CardFooter>
        </Card>
    );
};

export default PanelBackgroundElement;

interface DisableButtonProps {
    disableDialogOpen: boolean;
    setDisableDialogOpen: SetState<boolean>;
    disable: () => void;
    isDisabling: boolean;
}

const DisableButton = ({
    disableDialogOpen,
    setDisableDialogOpen,
    disable,
    isDisabling,
}: DisableButtonProps) => (
    <Dialog open={disableDialogOpen} onOpenChange={setDisableDialogOpen}>
        <DialogTrigger asChild>
            <Button variant="destructive" size="icon">
                <EyeOff />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Deaktivovat pozadí?</DialogTitle>
                <DialogDescription>
                    Panely, které využívají toto pozadí budou i nadále fungovat,
                    ale již nebude možné vybrat toto pozadí pro nové panely.
                    <br />
                    <br />
                    Pozadí lze kdykoliv znovu aktivovat.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button
                    variant="destructive"
                    onClick={disable}
                    disabled={isDisabling}
                >
                    {isDisabling ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            <EyeOff />
                            Deaktivovat
                        </>
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
);

interface EnableButtonProps {
    enable: () => void;
    isEnabling: boolean;
}

const EnableButton = ({ enable, isEnabling }: EnableButtonProps) => (
    <Button
        size="icon"
        className="bg-lime-500 hover:bg-lime-600"
        onClick={enable}
        disabled={isEnabling}
    >
        {isEnabling ? <Loader2 className="animate-spin" /> : <Eye />}
    </Button>
);
