import React, { useState, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
	if (action.type === "EMAIL_INPUT") {
		return { value: action.val, isValid: action.val.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.val, isValid: state.val.includes("@") };
	}
	return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === "PASSWORD_INPUT") {
		return { value: action.val, isValid: action.val.trim().length > 6 };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.val, isValid: action.val.trim().length > 6 };
	}
};

const Login = (props) => {
	//const [enteredEmail, setEnteredEmail] = useState("");
	//const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: false });
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: false,
	});

	// useEffect(() => {
	// 	const formCheckDelay = setTimeout(() => {
	// 		console.log("Checking form!");
	// 		setFormIsValid(emailState.value.includes("@") && enteredPassword.trim().length > 6);
	// 	}, 800);
	// 	return () => {
	// 		console.log("Clean up!");
	// 		clearTimeout(formCheckDelay);
	// 	};
	// }, [enteredEmail, enteredPassword]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "EMAIL_INPUT", val: event.target.value });

		setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: "PASSWORD_INPUT", val: event.target.value });

		setFormIsValid(emailState.isValid && passwordState.isValid);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		props.onLogin(emailState.value, passwordState.value);
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<div
					className={`${classes.control} ${
						emailState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="email">E-Mail</label>
					<input
						type="email"
						id="email"
						value={emailState.value}
						onChange={emailChangeHandler}
						onBlur={validateEmailHandler}
					/>
				</div>
				<div
					className={`${classes.control} ${
						passwordState.isValid === false ? classes.invalid : ""
					}`}
				>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						value={passwordState.value}
						onChange={passwordChangeHandler}
						onBlur={validatePasswordHandler}
					/>
				</div>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn} disabled={!formIsValid}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
