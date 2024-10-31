import "dotenv/config";
import process from "node:process";

import { bgBrightBlue, bgBrightGreen, bgBrightYellow, black, bold, underline, brightCyan, brightGreen, brightRed, cyan, gray, green, white, yellow, brightBlue, brightYellow } from "https://deno.land/std@0.150.0/fmt/colors.ts";

const printStartupScreen = () => {
	console.log(" _   _       _ ____                  _      _    ____ ___ ");
	console.log("| | | | ___ (_)  _ \\ __ _ _ __   ___| |    / \\  |  _ \\_ _|");
	console.log("| |_| |/ _ \\| | |_) / _` | '_ \\ / _ \\ |   / _ \\ | |_) | | ");
	console.log("|  _  |  __/| |  __/ (_| | | | |  __/ |  / ___ \\|  __/| | ");
	console.log("|_| |_|\\___|/ |_|   \\__,_|_| |_|\\___|_| /_/   \\_\\_|  |___|");
	console.log("          |__/                                            ");

	console.log();

	console.log(white("┌─────────────────────────────────────────────────────────┐"));
	console.log(white("│"), cyan("✅ API server running on:      "), bgBrightBlue(black(` ${process.env.BACKEND_URL!}:${process.env.API_PORT!} `)), white("│"));
	console.log(white("│"), green("✅ WebSocket server running on:"), bgBrightGreen(black(` ${process.env.BACKEND_URL!}:${process.env.WS_PORT!} `)), white("│"));
	console.log(white("├─────────────────────────────────────────────────────────┤"));
	console.log(white("│"), yellow("🌐 Expected frontend URL:      "), bgBrightYellow(black(` ${process.env.FRONTEND_URL!}:${process.env.FRONTEND_PORT!} `)), white("│"));
	console.log(white("└─────────────────────────────────────────────────────────┘"));

	console.log();
};

const printMessage = (emote: string | null, ...message: string[]) => console.log(emote ? `  ${emote} ` : "    ", ...message);

const printServerReady = () => {
	console.log();
	printMessage("👍", brightYellow("Server is ready to accept connections!"));
	console.log();
};

const printConnect = (UID: string) => printMessage("🟢", brightGreen("Connected"), gray(`[UID:${UID}]`));
const printDisconnect = (UID: string) => printMessage("🔴", brightRed("Disconnected"), gray(`[UID:${UID}]`));

const printFetchedData = (dataDescription: string) => printMessage("🔄", brightCyan("Fetched"), bold(underline(dataDescription)));
const printReadDataFromCache = (dataDescription: string, wasCachedInDB: boolean = false) => printMessage("📦", `Read ${wasCachedInDB ? "DB" : "memory"} cached`, bold(underline(dataDescription)));
const printWrittenDataToCache = (dataDescription: string) => printMessage("📝", `Written`, bold(underline(dataDescription)), `to DB cache`);
const printClearedCache = (dataDescription: string) => printMessage("🗑️", gray(`Cleared old cache for`), bold(underline(dataDescription)));

const printHydratedData = (...dataDescription: string[]) => printMessage("🌊", brightBlue("Hydrated"), dataDescription.map((e) => bold(underline(e))).join(", "));
const printSentDataToUID = (UID: string, ...dataDescription: string[]) => printMessage("📨", yellow("Sent"), dataDescription.map((e) => bold(underline(e))).join(", "), gray(`to [UID:${UID}]`));

export { printStartupScreen, printMessage, printServerReady, printConnect, printDisconnect, printFetchedData, printReadDataFromCache, printClearedCache, printWrittenDataToCache, printHydratedData, printSentDataToUID };
