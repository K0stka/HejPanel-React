import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import ActivityText from "@/components/ActivityText";
import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import { Fragment } from "react";
import Link from "next/link";
import { NextPage } from "next";
import PageError from "@/components/utility/PageError";
import PageTemplate from "@/components/utility/PageTemplate";
import SendMessageForm from "./_components/SendMessageForm";
import { getSessionUserInfo } from "@/auth/session-utils";
import { getThreadById } from "./actions";

interface Props {
    params: Promise<{ id: string }>;
}

const ThreadPage: NextPage<Props> = async ({ params }) => {
    const user = await getSessionUserInfo();

    const id = parseInt((await params).id);

    let thread;

    if (isNaN(id) || !(thread = await getThreadById(id)))
        return (
            <PageError error="Panel nebyl nalezen" backLink="/active-panels" />
        );

    return (
        <PageTemplate>
            <div className="grid h-full grid-rows-[auto,1fr,auto] items-start gap-5">
                <div className="flex items-center gap-5 rounded-lg bg-accent p-5">
                    <Link href={`/active-panels`}>Zpět</Link>
                </div>
                <div className="flex h-full flex-col gap-5 overflow-auto">
                    {thread.activities.map((activity, i) => {
                        const showAvatar =
                            !thread.activities[i + 1] ||
                            activity.author.id !==
                                thread.activities[i + 1].author.id;
                        return (
                            <Fragment key={activity.id}>
                                <div
                                    className={`flex ${activity.author.id === user.id ? "flex-row-reverse" : "flex-row"} items-end justify-start gap-2`}
                                >
                                    {showAvatar ? (
                                        <Avatar
                                            user={activity.author}
                                            nameOnHover={true}
                                        />
                                    ) : (
                                        <div className="w-8" />
                                    )}
                                    <div className="rounded-lg bg-secondary px-4 py-2">
                                        {activity.type !== "message" ? (
                                            <ActivityText
                                                activity={activity}
                                                details
                                            />
                                        ) : (
                                            activity.data.message
                                        )}
                                    </div>
                                    <span className="text-muted-foreground">
                                        {JSON.stringify(activity.sentAt)}
                                    </span>
                                </div>
                            </Fragment>
                        );
                    })}
                    <div className="flex justify-center gap-2">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Požádat o změnu obsahu
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Are you absolutely sure?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline">
                                    Požádat o změnu doby zobrazení
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Are you absolutely sure?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete your account and
                                        remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <SendMessageForm thread={thread} />
            </div>
        </PageTemplate>
    );
};

export default ThreadPage;
