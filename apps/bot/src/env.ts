import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    // DATABASE_URL: z.url(),
    DISCORD_CLIENT_ID: z.string().min(1),
    DISCORD_BOT_TOKEN: z.string().min(1),
  },
    runtimeEnv: process.env,
});