"use client";

import { ImagePanel, Panel, TextPanel, VideoPanel } from "shared/types";
import { cn, getPanelBackgroundUrl } from "@/lib/utils";

import Image from "next/image";

const IMAGE_SIZE = {
    width: 800,
    height: 450,
};

type PanelPreviewProps<T extends Panel["type"]> = {
    type: T;
    content: Extract<Panel, { type: T }>["content"];
    className?: string;
};

const PanelPreview = <T extends Panel["type"]>({
    type,
    content,
    className,
}: PanelPreviewProps<T>) => {
    return (
        <div
            className={cn(
                `relative aspect-video overflow-hidden rounded-md`,
                className,
            )}
        >
            {(() => {
                switch (type) {
                    case "image":
                        return (
                            <>
                                <Image
                                    alt=""
                                    src={(content as ImagePanel["content"]).url}
                                    className="absolute h-full w-full object-cover blur-lg brightness-50"
                                    {...IMAGE_SIZE}
                                />
                                <Image
                                    alt=""
                                    src={(content as ImagePanel["content"]).url}
                                    className="absolute h-full w-full object-contain"
                                    {...IMAGE_SIZE}
                                />
                            </>
                        );
                    case "video":
                        return (
                            <>
                                <div className="absolute h-full w-full bg-black" />
                                <video
                                    src={(content as VideoPanel["content"]).url}
                                    className="absolute h-full w-full object-contain"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </>
                        );
                    case "text":
                        return (
                            <div
                                className={`relative flex h-full w-full items-center justify-center`}
                                style={{
                                    color: (content as TextPanel["content"])
                                        .textColor,
                                }}
                            >
                                <Image
                                    alt=""
                                    className="absolute z-0 h-full w-full"
                                    src={getPanelBackgroundUrl(
                                        (content as TextPanel["content"])
                                            .background,
                                    )}
                                    {...IMAGE_SIZE}
                                />
                                <span className="absolute whitespace-pre-wrap">
                                    {(content as TextPanel["content"]).content}
                                </span>
                            </div>
                        );
                }
            })()}
        </div>
    );
};

export default PanelPreview;
