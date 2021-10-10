import React, { useState, useEffect, useReducer, useContext, useRef } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";

import AuthContext from "../context/auth-context";

const emailReducer = (state, action) => {
	if (action.type === "EMAIL_INPUT") {
		return { value: action.value, isValid: action.value.includes("@") };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.includes("@") };
	}
	return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
	if (action.type === "PASSWORD_INPUT") {
		return { value: action.value, isValid: action.value.trim().length > 6 };
	}
	if (action.type === "INPUT_BLUR") {
		return { value: state.value, isValid: state.value.trim().length > 6 };
	}
};

const Login = (props) => {
	const authCtx = useContext(AuthContext);
	const emailInputRef = useRef();
	const passwordInputRef = useRef();
	//const [enteredEmail, setEnteredEmail] = useState("");
	//const [emailIsValid, setEmailIsValid] = useState();
	// const [enteredPassword, setEnteredPassword] = useState("");
	// const [passwordIsValid, setPasswordIsValid] = useState();
	const [formIsValid, setFormIsValid] = useState(false);

	const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null });
	const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
		value: "",
		isValid: null,
	});

	const { isValid: emailIsValid } = emailState;
	const { isValid: passwordIsValid } = passwordState;

	useEffect(() => {
		const formCheckDelay = setTimeout(() => {
			console.log("Checking form!");
			setFormIsValid(emailIsValid && passwordIsValid);
		}, 500);
		return () => {
			console.log("Clean up!");
			clearTimeout(formCheckDelay);
		};
	}, [emailIsValid, passwordIsValid]);

	const emailChangeHandler = (event) => {
		dispatchEmail({ type: "EMAIL_INPUT", value: event.target.value });

		//setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
	};

	const passwordChangeHandler = (event) => {
		dispatchPassword({ type: "PASSWORD_INPUT", value: event.target.value });

		//setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
	};

	const validateEmailHandler = () => {
		dispatchEmail({ type: "INPUT_BLUR" });
	};

	const validatePasswordHandler = () => {
		dispatchPassword({ type: "INPUT_BLUR" });
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (formIsValid) {
			authCtx.onLogin(emailState.value, passwordState.value);
		} else {
			if (!emailIsValid) {
				emailInputRef.current.focus();
			} else {
				passwordInputRef.current.focus();
			}
		}
	};

	return (
		<Card className={classes.login}>
			<form onSubmit={submitHandler}>
				<Input
					id="email"
					label="E-Mail"
					type="email"
					isValid={emailIsValid}
					value={emailState.value}
					onChange={emailChangeHandler}
					onBlur={validateEmailHandler}
					ref={emailInputRef}
				/>
				<Input
					id="password"
					label="Password"
					type="password"
					isValid={passwordIsValid}
					value={passwordState.value}
					onChange={passwordChangeHandler}
					onBlur={validatePasswordHandler}
					ref={passwordInputRef}
				/>
				<div className={classes.actions}>
					<Button type="submit" className={classes.btn}>
						Login
					</Button>
				</div>
			</form>
		</Card>
	);
};

export default Login;
