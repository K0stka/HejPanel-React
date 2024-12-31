"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { RefreshCcw, Save } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { getConfiguration, setConfiguration } from "./actions";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { NextPage } from "next";
import PageTemplate from "@/components/utility/PageTemplate";
import Spinner from "@/components/utility/Spinner";
import { Switch } from "@/components/ui/switch";
import { themes } from "shared/constants";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const configurationFormSchema = z.object({
    theme: z.enum(themes, { message: "Neplatné téma" }),
    timetableEnabled: z.boolean(),
    canteenEnabled: z.boolean(),
    departuresEnabled: z.boolean(),
});

const SettingsPage: NextPage = () => {
    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof configurationFormSchema>>({
        resolver: zodResolver(configurationFormSchema),
    });

    useEffect(() => {
        getConfiguration().then((configuration) => {
            form.reset(configuration);
            setLoading(false);
        });
    }, [form, loading]);

    const onSubmit = (data: z.infer<typeof configurationFormSchema>) => {
        setConfiguration(data)
            .then(() => {
                toast.success("Nastavení bylo uloženo.");
            })
            .catch((e) => {
                toast.error("Nastavení se nepodařilo uložit.", {
                    description: e.message,
                });
            });
    };

    const resetConfiguration = () => {
        form.reset({
            theme: "normal",
            timetableEnabled: true,
            canteenEnabled: true,
            departuresEnabled: true,
        });
        form.handleSubmit(onSubmit)();
    };

    return loading ? (
        <Spinner />
    ) : (
        <PageTemplate title="Nastavení HejPanelu">
            <div className="flex h-full w-full items-center justify-center">
                <Card className="w-96">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="grid grid-cols-2 gap-4 p-3">
                                <FormField
                                    control={form.control}
                                    name="theme"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 grid grid-cols-subgrid grid-rows-subgrid items-center">
                                            <FormLabel>Téma</FormLabel>
                                            <FormControl>
                                                <Select
                                                    value={field.value}
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Vyberte téma" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {themes.map((theme) => (
                                                            <SelectItem
                                                                key={theme}
                                                                value={theme}
                                                            >
                                                                {(() => {
                                                                    switch (
                                                                        theme
                                                                    ) {
                                                                        case "normal":
                                                                            return "Běžné";
                                                                        case "light":
                                                                            return "Světlé";
                                                                        case "dark":
                                                                            return "Tmavé";
                                                                    }
                                                                })()}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="timetableEnabled"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 grid grid-cols-subgrid grid-rows-subgrid items-center">
                                            <FormLabel>Rozvrh</FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="canteenEnabled"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 grid grid-cols-subgrid grid-rows-subgrid items-center">
                                            <FormLabel>Jídelna</FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="departuresEnabled"
                                    render={({ field }) => (
                                        <FormItem className="col-span-2 grid grid-cols-subgrid grid-rows-subgrid items-center">
                                            <FormLabel>Odjezdy</FormLabel>
                                            <FormControl>
                                                <Switch
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter className="flex justify-end gap-3 p-3">
                                <Button
                                    type="button"
                                    onClick={resetConfiguration}
                                    variant="outline"
                                >
                                    <RefreshCcw />
                                    Resetovat
                                </Button>
                                <Button type="submit">
                                    <Save />
                                    Uložit
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </Card>
            </div>
        </PageTemplate>
    );
};

export default SettingsPage;
