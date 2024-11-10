import { NestFactory } from "@nestjs/core";
import { BetterAuthModule } from "./better-auth.module.js";
import { Express } from "express";
import pg from "pg";

const { Pool } = pg;

const DATABASE_URL = "postgresql://postgres:root@localhost:5432/admin";

async function bootstrap() {
  const app = await NestFactory.create(BetterAuthModule);

  process.env.BETTER_AUTH_SECRET = "ULTRA_SECRET";
  process.env.BETTER_AUTH_URL = "http://localhost:3000";
  process.env.BETTER_AUTH_TRUSTED_ORIGINS = "*";

  const expressApp: Express = app.getHttpAdapter().getInstance();

  const betterAuth = await import("better-auth");

  const auth = betterAuth.betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    database: new Pool({
      connectionString: DATABASE_URL,
    }),
    advanced: {
      disableCSRFCheck: true,
    },
  });

  const toNodeHandler = await import("better-auth/node");

  expressApp.all("/api/auth/*", async (req: any, res: any) => {
    const result = await auth.handler(req);
    console.log({ result });
  });

  await app.listen(3000);
}
bootstrap();
