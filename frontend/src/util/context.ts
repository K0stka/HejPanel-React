import { createContext } from "react";
import { Canteen, Departures, Panel } from "../../../shared/panel";

const PanelsContext = createContext<Panel[]>([]);
const CanteenContext = createContext<Canteen>({} as Canteen);
const DeparturesContext = createContext<Departures>({} as Departures);
const TimetableEnabledContext = createContext<boolean>(false);

export { PanelsContext, CanteenContext, DeparturesContext, TimetableEnabledContext };
