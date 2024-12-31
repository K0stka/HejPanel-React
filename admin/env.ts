import "server-only";

import { z } from "zod";

const envSchema = z.object({
    POSTGRES_URL: z.string().readonly(),
    BACKEND_URL: z.string().readonly(),
    WS_URL: z.string().readonly(),
    AUTH_CALLBACK_URL: z.string().readonly(),
    AUTH_SECRET: z.string().readonly(),
    MICROSOFT_CLIENT_ID: z.string().readonly(),
    MICROSOFT_CLIENT_SECRET: z.string().readonly(),
    MICROSOFT_TENANT_ID: z.string().readonly(),
});

export const env = envSchema.parse(process.env);
