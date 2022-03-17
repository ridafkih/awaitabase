import pg from "pg-promise";
import mongoose from "mongoose";

/**
 * Attempts to connect to a PostgreSQL database using the provided connection URL.
 * @param url The PostgreSQL connection URL to connect to.
 * @returns A promise that resolves whether or not the connection was successful.
 */
const postgres = async (url: string): Promise<boolean> => {
  const database = pg();
  return database(url)
    .connect()
    .then(() => true)
    .catch(() => {
      database.end();
      throw false;
    });
};

/**
 * Attempts to connect to a MongoDB database using the provided connection URL.
 * @param url The MongoDB connection URL to connect to.
 * @returns A promise that resolves whether or not the connection was successful.
 */
const mongo = async (url: string): Promise<boolean> => {
  const serverSelectionTimeoutMS = 1000;

  return mongoose
    .connect(url, { serverSelectionTimeoutMS })
    .then(() => true)
    .catch(() => {
      throw false;
    });
};

export default { mongo, postgres };
