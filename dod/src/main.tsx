// React

import "./css/globals.css";
import "./css/main.css";

import Panel from "./Panel.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styles

// Pages

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Panel />
	</StrictMode>
);
