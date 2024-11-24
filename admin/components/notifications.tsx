"use client";

import Connection from "@/lib/socket";
import { useEffect, useState } from "react";

const SocketTest = () => {
	const [isConnected, setIsConnected] = useState(false);

	useEffect(() => {
		const onConnect = () => setIsConnected(true);
		const onDisconnect = () => setIsConnected(false);
		const onReceivedMessage = (message: any) => alert(message);

		Connection.on("connect", onConnect);
		Connection.on("disconnect", onDisconnect);
		Connection.on("message", onReceivedMessage);

		return () => {
			Connection.off("connect", onConnect);
			Connection.off("disconnect", onDisconnect);
			Connection.off("message", onReceivedMessage);
		};
	});

	return (
		<>
			<p>Connected: {isConnected ? "Yes" : "No"}</p>
			<p>Socket ID: {Connection.id}</p>
			<button onClick={() => Connection.emit("message", "Hello!")}>Send message</button>
		</>
	);
};

export default SocketTest;
