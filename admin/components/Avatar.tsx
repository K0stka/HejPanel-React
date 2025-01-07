"use client";

import { AvatarFallback, Avatar as ShadCnAvatar } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

import { cn } from "@/lib/utils";

interface AvatarProps {
    user: {
        name: string;
    };
    nameOnHover?: boolean;
}

const normalizeHash = (hash: number, min: number, max: number): number => {
    return Math.floor((hash % (max - min)) + min);
};

const getColorFromName = (name: string): { light: string; dark: string } => {
    let hash = 0;

    for (let i = 0; i < name.length; i++)
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = Math.abs(hash);

    return {
        light: `hsl(${normalizeHash(hash, 0, 360)}, ${normalizeHash(hash, 50, 90)}%, ${normalizeHash(hash, 20, 40)}%)`,
        dark: `hsl(${normalizeHash(hash, 0, 360)}, ${normalizeHash(hash, 50, 90)}%, ${normalizeHash(hash, 80, 90)}%)`,
    };
};

const Avatar = ({ user, nameOnHover }: AvatarProps) => {
    const { light, dark } = getColorFromName(user.name);
    const names = user.name.split(" ");

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <ShadCnAvatar className="h-8 w-8 rounded-lg">
                        <AvatarFallback
                            suppressHydrationWarning
                            className={cn(
                                "nunito select-none rounded-lg bg-[var(--light)] text-base font-bold text-[var(--dark)] dark:bg-[var(--dark)] dark:text-[var(--light)]",
                                {
                                    "text-xs": names.length > 2,
                                },
                            )}
                            style={
                                {
                                    "--light": light,
                                    "--dark": dark,
                                } as React.CSSProperties
                            }
                        >
                            {names
                                .map((name) => name[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    </ShadCnAvatar>
                </TooltipTrigger>
                {nameOnHover && (
                    <TooltipContent>
                        <p>{user.name}</p>
                    </TooltipContent>
                )}
            </Tooltip>
        </TooltipProvider>
    );
};

export default Avatar;
