"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PanelThread } from "shared/types";
import { Send } from "lucide-react";
import { sendMessage } from "../actions";
import { useState } from "react";

interface SendMessageFormProps {
    thread: PanelThread;
}

const SendMessageForm = ({ thread }: SendMessageFormProps) => {
    const [message, setMessage] = useState("");

    const send = async () => {
        if (!message) return;

        await sendMessage(thread.id, message);

        setMessage("");
    };

    return (
        <div className="flex items-center justify-center gap-5">
            <Input
                placeholder="Napište zprávu"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") send();
                }}
            />
            <Button onClick={send}>
                <Send />
                Poslat
            </Button>
        </div>
    );
};

export default SendMessageForm;
