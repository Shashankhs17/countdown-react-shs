import Timebar from "./components/Timebar";
import classes from "./App.module.css";
import { useCallback, useState } from "react";
import { useRef } from "react";

const App = () => {
	const inputRef = useRef();
	const [targetTime, setTargetTime] = useState(undefined);
	const [timerRunning, setTimerRunning] = useState(false);

	function handleStartOrStop(event) {
		event.preventDefault();

		if (!timerRunning) {
			if (!inputRef.current.value) return;
			setTargetTime(inputRef.current.value);
		} else {
			inputRef.current.value = undefined;
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
