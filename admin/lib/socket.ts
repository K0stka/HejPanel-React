"use client";

import { io } from "socket.io-client";

const Connection = io("http://localhost:5050");

export default Connection;
