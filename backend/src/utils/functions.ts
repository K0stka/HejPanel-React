const setInstantInterval = (callback: (isFirst: boolean) => void, interval: number): number => {
	callback(true);
	return setInterval(() => {
		callback(false);
	}, interval);
};

export default setInstantInterval;
