// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styles
import "./css/index.css";
import "./css/theme.css";

// Pages
import Panel from "./Panel.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Panel />
	</StrictMode>
);
