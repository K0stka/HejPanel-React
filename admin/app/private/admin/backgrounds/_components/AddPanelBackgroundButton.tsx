"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/inputs/ColorPicker";
import { Input } from "@/components/ui/input";
import { SetState } from "shared/types";
import { addPanelBackground } from "../actions";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";

interface AddPanelBackgroundButtonProps {
    addPanelBackgroundDialogOpen: boolean;
    setAddPanelBackgroundDialogOpen: SetState<boolean>;
}

const AddPanelBackgroundDialog = ({
    addPanelBackgroundDialogOpen,
    setAddPanelBackgroundDialogOpen,
}: AddPanelBackgroundButtonProps) => {
    const [base64, setBase64] = useState<string | null>(null);
    const [color, setColor] = useState<string>("#000000");
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const add = () => {
        if (!base64) {
            toast.error("Nebyl vybrán žádný obrázek");
            return;
        }

        setIsSaving(true);

        addPanelBackground(base64, color)
            .then(() => {
                setAddPanelBackgroundDialogOpen(false);
                setBase64(null);
                setColor("#000000");
                setIsSaving(false);
                toast.success("Pozadí bylo úspěšně přidáno");
            })
            .catch((e) => {
                toast.error("Pozadí se nepodařilo přidat", {
                    description: e.message,
                });
                setIsSaving(false);
            });
    };

    return (
        <Dialog
            open={addPanelBackgroundDialogOpen}
            onOpenChange={setAddPanelBackgroundDialogOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Přidat pozadí panelu</DialogTitle>
                    <DialogDescription>
                        Zvolte obrázek a barvu textu
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-5">
                    {base64 && (
                        <div className="relative flex aspect-video w-full items-center justify-center">
                            <img
                                alt=""
                                src={base64}
                                className="absolute h-full w-full bg-muted object-contain"
                            />
                            <div
                                className="absolute"
                                style={{
                                    color,
                                }}
                            >
                                Takto vypadá text
                            </div>
                        </div>
                    )}
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files?.[0];

                            if (!file) {
                                setBase64(null);
                                return;
                            }

                            const reader = new FileReader();

                            reader.onload = (e) => {
                                setBase64(e.target?.result as string);
                            };

                            reader.readAsDataURL(file);
                        }}
                    />
                    <div className="grid grid-cols-[auto,auto,1fr] items-center gap-5">
                        <span>Barva textu:</span>
                        <ColorPicker
                            value={color}
                            onChange={setColor}
                            open={colorPickerOpen}
                            setOpen={setColorPickerOpen}
                        />
                        <Input
                            value={color}
                            readOnly
                            className={cn({
                                "cursor-pointer": !isSaving,
                                "cursor-default": isSaving,
                            })}
                            onClick={() =>
                                !isSaving && setColorPickerOpen(true)
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={add} disabled={isSaving}>
                        {isSaving ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            "Přidat"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AddPanelBackgroundDialog;
