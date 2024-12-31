import "./css/index.css";
import "./css/theme.css";
import "./css/Panel.css";

import Panel from "./Panel.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Panel />
	</StrictMode>
);
