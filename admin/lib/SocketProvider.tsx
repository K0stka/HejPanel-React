"use client";

import { createContext, useEffect } from "react";

import { HejNotification } from "shared/types";
import { Socket } from "socket.io-client";
import { io } from "socket.io-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const socket = io(process.env.BACKEND_URL ?? "http://localhost:5050");

export const SocketContext = createContext<Socket>({} as Socket);

interface SocketProviderProps {
  children: React.ReactNode;
}

const SocketProvider = ({ children }: SocketProviderProps) => {
  useEffect(() => {
    const onNotification = (notification: HejNotification) => {
      const action = notification.path
        ? {
            label: "Více",
            onClick: () => redirect(notification.path ?? "/"),
          }
        : null;
      toast(notification.title, {
        description: notification.content,
        action,
      });
    };

    socket.on("notification", onNotification);

    return () => {
      socket.off("notification", onNotification);
    };
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
