"use client";

import { Locale, startOfDay } from "date-fns";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";

interface DateRange {
    from: Date;
    to: Date;
}

interface DateRangePickerProps {
    from: Date;
    to: Date;
    onChange: (range: DateRange) => void;
    min?: Date;
    max?: Date;
    locale?: Locale;
}

const DateRangePicker = ({
    from: fromProp,
    to: toProp,
    onChange,
    min,
    max,
    locale,
}: DateRangePickerProps) => {
    console.log("Rerender", fromProp, toProp);

    const from = startOfDay(fromProp);
    const to = startOfDay(toProp);

    const onSelect = (
        _range:
            | {
                  from?: Date;
                  to?: Date;
              }
            | undefined,
        selectedDay: Date,
    ) => {
        const selectedDayTime = selectedDay.getTime();
        const fromTime = from.getTime();
        const toTime = to.getTime();

        if (selectedDayTime === fromTime && selectedDayTime === toTime) return;

        if (selectedDayTime === fromTime)
            onChange({
                from,
                to: selectedDay,
            });
        else if (selectedDayTime === toTime)
            onChange({
                from: selectedDay,
                to,
            });
        else if (
            Math.abs(selectedDayTime - fromTime) <
            Math.abs(selectedDayTime - toTime)
        )
            onChange({
                from: selectedDay,
                to,
            });
        else
            onChange({
                from,
                to: selectedDay,
            });
    };

    return (
        <>
            <Calendar
                mode="range"
                locale={locale}
                fromDate={min}
                toDate={max}
                selected={{
                    from,
                    to,
                }}
                onSelect={onSelect}
            />
            <pre suppressHydrationWarning>
                {JSON.stringify({ from, to }, null, 2)}
            </pre>
        </>
    );
};

export default DateRangePicker;
