import { useEffect, useState } from "react";

import { useAutoAnimate } from "@formkit/auto-animate/react";

const Clock = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString());

	useEffect(() => {
		const timer = setInterval(() => {
			setTime(new Date().toLocaleTimeString());
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const [parent] = useAutoAnimate();

	return (
		<div
			className="clock"
			ref={parent}>
			<div className="time">{time}</div>
			<div className="timetable">9:00 - 12:00 | Den otevřených dveří</div>
		</div>
	);
};

export default Clock;
