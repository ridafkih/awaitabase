import { config } from "dotenv";
import CustomEnv from "@/@types/CustomEnv";

config();

const { env } = process;
export default env as typeof env & CustomEnv;
