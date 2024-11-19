import db from "@/db/connector";

import { config } from "@/db/schema";

export const getFromDb = async () => {
	return db.select().from(config).execute();
};
