import { useEffect } from "react";

let version: string | null = null;

const SyncHandler = () => {
	useEffect(() => {
		const interval = setInterval(() => {
			fetch("/state.json", { cache: "no-store" })
				.then((response) => response.json())
				.then((json) => {
					if (version == null) version = json.version;
					if (json.version !== version) throw new Error();
				})
				.catch(() => window.location.reload());
		}, 30_000);
		return () => clearInterval(interval);
	});

	return <></>;
};

export default SyncHandler;
