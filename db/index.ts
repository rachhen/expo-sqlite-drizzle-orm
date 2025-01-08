import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

import * as schema from "./schema";

const DATABASE_NAME = "db.db";
const expoDB = openDatabaseSync(DATABASE_NAME, {
  enableChangeListener: true,
});

const db = drizzle(expoDB, { schema });

export { DATABASE_NAME, db, expoDB, schema };
