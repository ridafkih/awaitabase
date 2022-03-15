import pg from "pg-promise";

import env from "@/utils/env";
import supportedDrivers from "@/constants/supportedDrivers";

const MAX_ATTEMPTS = 30; // #
const ATTEMPT_INTERVAL = 1000; // ms

const { DATABASE_URL } = env;

const [driver, url]: string[] = process.argv.slice(2);

if (!supportedDrivers.has(driver))
  throw new Error("Please provide a valid & supported driver.");

if (!url && !DATABASE_URL)
  throw new Error("You must provide a URL to the database.");

let attempts = 0;
const database = pg();

/**
 * Handles a database connection failure.
 */
const handleFailure = () => {
  database.end();
  if (++attempts < MAX_ATTEMPTS) setTimeout(main, ATTEMPT_INTERVAL);
  else throw new Error("DB connection attempts has been exceeded.");
};

/**
 * Main CLI entry-point.
 */
const main = (): Promise<void> =>
  database(url || (DATABASE_URL as string))
    .connect()
    .then(() => process.exit(0))
    .catch(handleFailure);

main();
