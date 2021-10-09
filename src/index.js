import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthContestProvider } from "./components/context/auth-context";

ReactDOM.render(
	<AuthContestProvider>
		<App />
	</AuthContestProvider>,
	document.getElementById("root")
);
