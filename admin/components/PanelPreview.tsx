"use client";

import { ImagePanel, Panel, TextPanel, VideoPanel } from "shared/types";

import { cn } from "@/lib/utils";

interface PanelPreviewProps {
    type: Panel["type"];
    content: Panel["content"];
    size?: 20 | 40 | 60 | 80 | 96;
}

const PanelPreview = ({ type, content, size = 40 }: PanelPreviewProps) => {
    return (
        <div
            className={cn(`relative aspect-video overflow-hidden rounded-md`, {
                "h-20": size === 20,
                "h-40": size === 40,
                "h-60": size === 60,
                "h-80": size === 80,
                "h-96": size === 96,
            })}
        >
            {(() => {
                switch (type) {
                    case "image":
                        return (
                            <>
                                <img
                                    src={(content as ImagePanel["content"]).url}
                                    alt="panel"
                                    className="absolute h-full w-full object-cover blur-lg brightness-50"
                                />
                                <img
                                    src={(content as ImagePanel["content"]).url}
                                    alt="panel"
                                    className="absolute h-full w-full object-contain"
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
                                />
                            </>
                        );
                    case "text":
                        return (
                            <div
                                className="flex h-full w-full items-center justify-center"
                                style={{
                                    backgroundImage: `url(${(content as TextPanel["content"]).background})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    color: (content as TextPanel["content"])
                                        .textColor,
                                }}
                            >
                                {(content as TextPanel["content"]).content}
                            </div>
                        );
                }
            })()}
        </div>
    );
};

export default PanelPreview;
