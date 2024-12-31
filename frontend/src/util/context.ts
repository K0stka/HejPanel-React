import { Canteen, Departures } from "shared";

import { createContext } from "react";

export const CanteenContext = createContext<Canteen>({} as Canteen);
export const DeparturesContext = createContext<Departures>({} as Departures);
export const TimetableEnabledContext = createContext<boolean>(false);
