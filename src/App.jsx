import Timebar from "./components/Timebar";
import classes from "./App.module.css";
import { useCallback, useEffect, useState } from "react";
import { useRef } from "react";

const App = () => {
	const inputRef = useRef();
	const [targetTime, setTargetTime] = useState(localStorage.getItem('targetTime') || undefined);
	const [timerRunning, setTimerRunning] = useState(false);

	// console.log(localStorage.getItem('targetTime'), targetTime);

	useEffect(() => {
		document.querySelector('input').value = targetTime;
	});

	function handleStartOrStop(event) {
		event.preventDefault();

		if (!timerRunning) {
			if (!inputRef.current.value) return;
			setTargetTime(inputRef.current.value);
			localStorage.setItem('targetTime', inputRef.current.value);
		} else {
			inputRef.current.value = undefined;
			localStorage.removeItem('targetTime');
			setTargetTime(undefined);
			stopTimer();
		}
	}

	const startTimer = useCallback(() => {
		setTimerRunning(true);
	}, []);

	const stopTimer = useCallback(() => {
		setTimerRunning(false);
	}, []);

	return (
		<main className={classes.main}>
			<h1 className={classes.heading}>Countdown timer</h1>
			<div className={classes.form}>
				<input
					type="datetime-local"
					ref={inputRef}
					disabled={timerRunning}
				/>
				<button
					className={timerRunning ? classes.stop : classes.start}
					type="button"
					onClick={handleStartOrStop}
				>
					{timerRunning ? "Cancel" : "Start"} timer
				</button>
			</div>
			<Timebar
				targetTime={targetTime}
				timerRunning={timerRunning}
				startTimer={startTimer}
				stopTimer={stopTimer}
			/>
		</main>
	);
};

export default App;
