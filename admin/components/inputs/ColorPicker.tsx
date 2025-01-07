"use client";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { forwardRef, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import type { ButtonProps } from "@/components/ui/button";
import { HexColorPicker } from "react-colorful";
import { Input } from "@/components/ui/input";
import { SetState } from "shared/types";
import { cn } from "@/lib/utils";
import { useForwardedRef } from "@/lib/useForwardedRef";

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    open?: boolean;
    setOpen?: SetState<boolean>;
}

const ColorPicker = forwardRef<
    HTMLInputElement,
    Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
    (
        {
            disabled,
            value,
            onChange,
            onBlur,
            name,
            className,
            open: propsOpen = null,
            setOpen: propsSetOpen = null,
            ...props
        },
        forwardedRef,
    ) => {
        const ref = useForwardedRef(forwardedRef);
        const [open, setOpen] =
            propsOpen !== null && propsSetOpen !== null
                ? [propsOpen, propsSetOpen]
                : useState(false);

        const parsedValue = useMemo(() => {
            return value || "#ffffff";
        }, [value]);

        return (
            <Popover onOpenChange={setOpen} open={open}>
                <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
                    <Button
                        {...props}
                        className={cn("block", className)}
                        name={name}
                        onClick={() => {
                            setOpen(true);
                        }}
                        size="icon"
                        style={{
                            backgroundColor: parsedValue,
                            opacity: 1,
                        }}
                        variant="outline"
                    >
                        <div />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-full flex-col items-center gap-2">
                    <HexColorPicker
                        color={parsedValue}
                        onChange={(value) => {
                            onChange(
                                value !== "#NaNNaNNaN"
                                    ? value.toLowerCase()
                                    : "#ffffff",
                            );
                        }}
                        // className="flex flex-col gap-2"
                        style={{
                            width: "100%",
                        }}
                    />
                    <Input
                        maxLength={7}
                        onChange={(e) => {
                            onChange(e?.currentTarget?.value.toLowerCase());
                        }}
                        ref={ref}
                        value={parsedValue}
                    />
                </PopoverContent>
            </Popover>
        );
    },
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
