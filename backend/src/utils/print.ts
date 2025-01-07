import { bgBrightBlue, bgBrightGreen, bgBrightYellow, black, bold, brightBlue, brightCyan, brightGreen, brightRed, brightYellow, cyan, gray, green, underline, white, yellow } from "https://deno.land/std@0.150.0/fmt/colors.ts";

export const printStartupScreen = () => {
	console.log(" _   _       _ ____                  _      _    ____ ___ ");
	console.log("| | | | ___ (_)  _ \\ __ _ _ __   ___| |    / \\  |  _ \\_ _|");
	console.log("| |_| |/ _ \\| | |_) / _` | '_ \\ / _ \\ |   / _ \\ | |_) | | ");
	console.log("|  _  |  __/| |  __/ (_| | | | |  __/ |  / ___ \\|  __/| | ");
	console.log("|_| |_|\\___|/ |_|   \\__,_|_| |_|\\___|_| /_/   \\_\\_|  |___|");
	console.log("          |__/                                            ");

	console.log();

	const backendPort = `${Deno.env.get("API_PORT")}`;
	const wsPort = `${Deno.env.get("WS_PORT")}`;
	const frontendUrl = Deno.env.get("PANEL_URL")!;
	const adminUrl = Deno.env.get("ADMIN_URL")!;

	const maxLength = Math.max(backendPort.length, wsPort.length, frontendUrl.length) + 41;

	const horizontalLine = "─".repeat(maxLength);
	const emptySpace = (length: number) => " ".repeat(maxLength - length - 41);

	console.log(white(`┌${horizontalLine}┐`));
	console.log(white("│"), cyan("✅ API server running on port:      "), bgBrightBlue(black(` ${backendPort} `)) + emptySpace(backendPort.length), white("│"));
	console.log(white("│"), green("✅ WebSocket server running on port:"), bgBrightGreen(black(` ${wsPort} `)) + emptySpace(wsPort.length), white("│"));
	console.log(white(`├${horizontalLine}┤`));
	console.log(white("│"), yellow("🌐 Expected frontend URL:           "), bgBrightYellow(black(` ${frontendUrl} `)) + emptySpace(frontendUrl.length), white("│"));
	console.log(white("│"), yellow("🌐 Expected admin URL:              "), bgBrightYellow(black(` ${adminUrl} `)) + emptySpace(adminUrl.length), white("│"));
	console.log(white(`└${horizontalLine}┘`));

	console.log();
};

export const printMessage = (emote: string | null, ...message: string[]) => console.log(`[${new Date().toLocaleString()}]`, emote ? `${emote} ` : "  ", ...message);

export const printServerReady = () => {
	console.log();
	printMessage("👍", brightYellow("Server is ready to accept connections!"));
	console.log();
};

export const printConnect = (UID: string) => printMessage("🟢", brightGreen("Connected"), gray(`[UID:${UID}]`));
export const printDisconnect = (UID: string) => printMessage("🔴", brightRed("Disconnected"), gray(`[UID:${UID}]`));

export const printFetchedData = (dataDescription: string) => printMessage("🔄", brightCyan("Fetched"), bold(underline(dataDescription)));
export const printReadDataFromCache = (dataDescription: string, wasCachedInDB: boolean = false) => printMessage("📦", `Read ${wasCachedInDB ? "DB" : "memory"} cached`, bold(underline(dataDescription)));
export const printLoadedDataFromDB = (dataDescription: string) => printMessage("💽", `Loaded`, bold(underline(dataDescription)), `from DB`);
export const printWrittenDataToDB = (dataDescription: string) => printMessage("📝", `Written`, bold(underline(dataDescription)), `to DB`);
export const printClearedCache = (dataDescription: string) => printMessage("🗑️", gray(`Cleared old cache for`), bold(underline(dataDescription)));

export const printHydratedData = (...dataDescription: string[]) => printMessage("🌊", brightBlue("Hydrated"), dataDescription.map((e) => bold(underline(e))).join(", "));
export const printSentDataToUID = (UID: string, ...dataDescription: string[]) => printMessage("📨", brightYellow("Sent"), dataDescription.map((e) => bold(underline(e))).join(", "), gray(`to [UID:${UID}]`));

export const printRestartingSync = () => {
	console.log();
	printMessage("🌅", brightYellow("Starting background synchronization tasks..."));
	console.log();
};
export const printSuspendingSync = () => {
	console.log();
	printMessage("🌙", brightYellow("Suspending background synchronization tasks to preserve resources..."));
	console.log();
};
