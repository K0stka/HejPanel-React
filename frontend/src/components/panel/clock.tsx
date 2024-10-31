import { useContext, useEffect, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { TimetableEnabledContext } from "../../util/context";

const Clock = () => {
	const [time, setTime] = useState(new Date().toLocaleTimeString());
	const [timetable, setTimetable] = useState<string | null>();

	const timetableEnabled = useContext(TimetableEnabledContext);

	const timetable_lookup = [
		{
			text: "1. hodina | 8:00 - 8:45",
			from_milTime: 800,
			to_milTime: 845,
		},
		{
			text: "Přestávka | 8:45 - 8:55",
			from_milTime: 845,
			to_milTime: 855,
		},
		{
			text: "2. hodina | 8:55 - 9:40",
			from_milTime: 855,
			to_milTime: 940,
		},
		{
			text: "Přestávka | 9:40 - 10:00",
			from_milTime: 940,
			to_milTime: 1000,
		},
		{
			text: "3. hodina | 10:00 - 10:45",
			from_milTime: 1000,
			to_milTime: 1045,
		},
		{
			text: "Přestávka | 10:45 - 10:55",
			from_milTime: 1045,
			to_milTime: 1055,
		},
		{
			text: "4. hodina | 10:55 - 11:40",
			from_milTime: 1055,
			to_milTime: 1140,
		},
		{
			text: "Přestávka | 11:40 - 11:50",
			from_milTime: 1140,
			to_milTime: 1150,
		},
		{
			text: "5. hodina | 11:50 - 12:35",
			from_milTime: 1150,
			to_milTime: 1235,
		},
		{
			text: "Přestávka | 12:35 - 12:45",
			from_milTime: 1235,
			to_milTime: 1245,
		},
		{
			text: "6. hodina | 12:45 - 13:30",
			from_milTime: 1245,
			to_milTime: 1330,
		},
		{
			text: "Přestávka | 13:30 - 14:00",
			from_milTime: 1330,
			to_milTime: 1400,
		},
		{
			text: "7. hodina | 14:00 - 14:45",
			from_milTime: 1400,
			to_milTime: 1445,
		},
		{
			text: "Přestávka | 14:45 - 14:55",
			from_milTime: 1445,
			to_milTime: 1455,
		},
		{
			text: "8. hodina | 14:55 - 15:40",
			from_milTime: 1455,
			to_milTime: 1540,
		},
	];

	const updateCurrentTimetable = () => {
		const now = new Date();
		const milTime = now.getHours() * 100 + now.getMinutes();

		for (let i = 0; i < timetable_lookup.length; i++)
			if (milTime >= timetable_lookup[i].from_milTime && milTime < timetable_lookup[i].to_milTime) {
				setTimetable(timetable_lookup[i].text);
				return;
			}

		setTimetable(null);
	};

	useEffect(() => {
		updateCurrentTimetable();

		const timer = setInterval(() => {
			const now = new Date();

			setTime(now.toLocaleTimeString());

			if (now.getSeconds() === 0) updateCurrentTimetable();
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const [parent] = useAutoAnimate();

	return (
		<div
			className="clock"
			ref={parent}>
			<div className="time">{time}</div>
			{timetableEnabled && timetable && (
				<div
					className="timetable"
					key={timetable.slice(-5)}>
					{timetable}
				</div>
			)}
		</div>
	);
};

export default Clock;
