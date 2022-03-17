#!/usr/bin/env node

import ora from "ora";

import drivers from "@/utils/drivers";
import env from "@/utils/env";
import { makeAttemptsTracker } from "@/utils/attempts";

import AwaitabaseArgs from "@/@types/AwaitabaseArgs";
import DriverMethodName from "@/@types/DriverMethodName";
import supportedDrivers from "@/constants/supportedDrivers";

const MAX_ATTEMPTS = 30; // #
const ATTEMPT_INTERVAL = 1000; // ms

const { DATABASE_URL } = env;

const args = process.argv.slice(2);
const [driver, url]: AwaitabaseArgs = args as AwaitabaseArgs;

if (!supportedDrivers.has(driver as DriverMethodName))
  throw new Error("Please provide a valid & supported driver.");

if (!url && !DATABASE_URL)
  throw new Error("You must provide a URL to the database.");

const tooltip = "Waiting for database...";
const { getAttemptsData, markAttempt } = makeAttemptsTracker(MAX_ATTEMPTS);

const spinner = ora(`${tooltip} ${getAttemptsData().display}`).start();

/**
 * Handles successful state, marks spinner as complete
 * and exits the process.
 */
const handleSuccess = () => {
  spinner.succeed("Database confirmed as active!");
  process.exit(0);
};

/**
 * Handles a database connection failure by re-attempting connection,
 * or closing the process if attempts have been exceeded.
 */
const handleFailure = () => {
  markAttempt();
  const { attempts } = getAttemptsData();

  if (attempts < MAX_ATTEMPTS) setTimeout(main, ATTEMPT_INTERVAL);
  else throw new Error("Exceeded the maximum number of attempts.");

  spinner.text = `${tooltip} ${getAttemptsData().display}`;
};

/**
 * Main CLI entry-point.
 */
const main = (): Promise<void> =>
  drivers[driver](url || (DATABASE_URL as string))
    .then(handleSuccess)
    .catch(handleFailure);

main();
