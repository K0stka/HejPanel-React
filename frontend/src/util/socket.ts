import { io } from "socket.io-client";

const DEV: boolean = true;

const URL = DEV ? "http://localhost:5050" : "http://194.182.86.61:5050";

export const socket = io(URL);
