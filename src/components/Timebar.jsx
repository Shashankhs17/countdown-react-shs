/* eslint-disable react/prop-types */
import Timer from "./Timer";
import classes from "./Timebar.module.css";
import { useRef, useEffect, useState } from "react";

function _getTimeData(targetTime) {
	let ms = new Date(targetTime) - new Date();

	let totalSeconds = Math.round(ms / 1000);
	let seconds = totalSeconds % 60;

	let totalMinutes = Math.floor(totalSeconds / 60);
	let minutes = totalMinutes % 60;

	let totalHours = Math.floor(totalMinutes / 60);
	let hours = totalHours % 24;

	let days = Math.floor(totalHours / 24);

	return { ms, seconds, minutes, hours, days };
}

const Timebar = ({
	targetTime,
	timerRunning,
	startTimer,
	stopTimer,
}) => {
	const timerRef = useRef();
	const [calcTime, setCalcTime] = useState({
		ms: 0,
		seconds: 0,
		minutes: 0,
		hours: 0,
		days: 0,
	});

	// console.log(calcTime);

	useEffect(() => {
		if (targetTime !== undefined) {
			let calculatedRemainingTime = _getTimeData(targetTime);
			// console.log(calculatedRemainingTime);
			setCalcTime(calculatedRemainingTime);

			if (
				calculatedRemainingTime.days >= 0 &&
				calculatedRemainingTime.days < 100
			) {
				startTimer();

				timerRef.current = setInterval(() => {
					let calculatedRemainingTime = _getTimeData(targetTime);
					if (calculatedRemainingTime.ms <= 0) {
						stopTimer();
						clearInterval(timerRef.current);
						// console.log("clearing timer - 1");
					} else {
						setCalcTime(calculatedRemainingTime);
					}
				}, 1000);
			}
		}

		return () => {
			// console.log("clearing timer");
			clearInterval(timerRef.current);
			stopTimer();
		};
	}, [startTimer, stopTimer, targetTime]);

	return (
		<>
			{(targetTime === undefined || timerRunning) && (
				<div className={classes.timebar}>
					<Timer
						count={timerRunning ? calcTime.days : 0}
						description="days"
					/>
					<Timer
						count={timerRunning ? Math.floor(calcTime.hours) : 0}
						description="hours"
					/>
					<Timer
						count={timerRunning ? Math.floor(calcTime.minutes) : 0}
						description="minutes"
					/>
					<Timer
						count={timerRunning ? Math.floor(calcTime.seconds) : 0}
						description="seconds"
					/>
				</div>
			)}

			{!timerRunning && calcTime.days < 0 && (
				<p className={classes.error}>
					Cannot start timer, timer can only be set for future!
				</p>
			)}
			{!timerRunning && calcTime.days >= 100 && (
				<p className={classes.error}>
					You&apos;ve set timer for more than 100 days!
				</p>
			)}
			{!timerRunning &&
				targetTime !== undefined &&
				calcTime.ms <= 1000 &&
				calcTime.ms >= 0 && (
					<p className={classes.message}>
						The countdown is over! What&apos;s next on your
						adventure ?🎉
					</p>
				)}
		</>
	);
};

export default Timebar;