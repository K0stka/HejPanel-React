import { io } from "socket.io-client";

// @ts-ignore
const URL = import.meta.env.BACKEND_URL ?? "http://localhost:3001";

export const socket = io(URL);
