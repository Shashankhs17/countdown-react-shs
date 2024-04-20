/* eslint-disable react/prop-types */
import classes from "./Timer.module.css";

const Timer = ({ count, description }) => {
	return (
		<div className={classes.timer}>
			<h2 className={classes.counter}>{count}</h2>
			<p className={classes.description}>{description}</p>
		</div>
	);
};

export default Timer;
