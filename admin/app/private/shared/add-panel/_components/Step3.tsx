"use client";

import { Panel, PanelBackground, SetState } from "shared/types";
import { Suspense, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { CreatePanelContentState } from "../page";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { getPanelBackgroundUrl } from "@/lib/utils";
import { getPanelBackgrounds } from "../actions";

interface Step3Props<T extends Panel["type"]> {
    content: CreatePanelContentState<T> | undefined;
    setContent: SetState<CreatePanelContentState<T> | undefined>;
    nextStep: () => void;
}

const Step3 = ({
    type,
    content,
    setContent,
    nextStep,
}: Step3Props<Panel["type"]> & {
    type: Panel["type"];
}) => {
    switch (type) {
        case "image":
            return (
                <Step3Image
                    content={content as CreatePanelContentState<"image">}
                    setContent={
                        setContent as SetState<
                            CreatePanelContentState<"image"> | undefined
                        >
                    }
                    nextStep={nextStep}
                />
            );
        case "video":
            return (
                <Step3Video
                    content={content as CreatePanelContentState<"video">}
                    setContent={
                        setContent as SetState<
                            CreatePanelContentState<"video"> | undefined
                        >
                    }
                    nextStep={nextStep}
                />
            );
        case "text":
            return (
                <Step3Text
                    content={content as CreatePanelContentState<"text">}
                    setContent={
                        setContent as SetState<
                            CreatePanelContentState<"text"> | undefined
                        >
                    }
                    nextStep={nextStep}
                />
            );
    }
};

export default Step3;

const Step3Image = ({ content, setContent, nextStep }: Step3Props<"image">) => {
    const isComplete = content && content.base64 && content.base64.length > 0;

    return (
        <>
            <h1 className="nunito text-2xl font-bold">Zvolte obrázek</h1>
            <Input
                className="w-auto max-w-full"
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            setContent({
                                base64: e.target?.result as string,
                            });
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />
            {isComplete && <Button onClick={nextStep}>Další</Button>}
        </>
    );
};

const Step3Video = ({ content, setContent, nextStep }: Step3Props<"video">) => {
    const isComplete = content && content.base64 && content.base64.length > 0;

    return (
        <>
            <h1 className="nunito text-2xl font-bold">Zvolte video</h1>
            <Input
                className="w-auto max-w-full"
                type="file"
                accept="video/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            setContent({
                                base64: e.target?.result as string,
                            });
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />
            {isComplete && <Button onClick={nextStep}>Další</Button>}
        </>
    );
};

const Step3Text = ({ content, setContent, nextStep }: Step3Props<"text">) => {
    const [backgrounds, setBackgrounds] = useState<PanelBackground[]>([]);

    useEffect(() => {
        getPanelBackgrounds().then(setBackgrounds);
    }, []);

    const isComplete =
        content &&
        content.content &&
        content.content.length > 0 &&
        content.background &&
        content.background >= 0 &&
        content.textColor &&
        content.textColor.length > 0;

    return (
        <>
            <h1 className="nunito text-2xl font-bold">Zvolte obsah panelu</h1>
            <Textarea
                className="h-24 w-96 resize-none"
                onChange={(e) =>
                    setContent((oldContent) => ({
                        content: e.target.value,
                        background: oldContent?.background ?? -1,
                        textColor: oldContent?.textColor ?? "",
                    }))
                }
            />
            <div className="flex max-w-96 flex-wrap justify-center gap-5">
                {backgrounds.length > 0 ? (
                    backgrounds.map((background, i) => (
                        <div
                            key={background.id + "-" + i}
                            className={`size-16 cursor-pointer overflow-hidden rounded-md border-4 bg-secondary ${content?.background === background.id ? "border-primary" : "border-primary/10"}`}
                            onClick={() => {
                                setContent((oldContent) => ({
                                    content: oldContent?.content ?? "",
                                    background: background.id,
                                    textColor: background.textColor,
                                }));
                            }}
                        >
                            <Image
                                alt=""
                                width={64}
                                height={64}
                                src={getPanelBackgroundUrl(background.id)}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    ))
                ) : (
                    <>
                        <Skeleton className="size-16 rounded-md" />
                        <Skeleton className="size-16 rounded-md" />
                        <Skeleton className="size-16 rounded-md" />
                    </>
                )}
            </div>
            {isComplete && <Button onClick={nextStep}>Další</Button>}
        </>
    );
};
