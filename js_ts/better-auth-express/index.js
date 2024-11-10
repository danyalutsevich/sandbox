import express from "express";
import { betterAuth } from "better-auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import { Pool } from "pg";

const DATABASE_URL = "postgresql://postgres:root@localhost:5432/admin";

process.env.BETTER_AUTH_SECRET = "HAHAHAHAAHAHAAHAHAH";
process.env.BETTER_AUTH_URL = "http://localhost:3000";
process.env.BETTER_AUTH_TRUSTED_ORIGINS = "http://localhost:5173";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

const auth = betterAuth({
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

app.all("/api/auth/*", (req, res) => {
  console.log(req.body);

  return toNodeHandler(auth)(req, res);
});

app.listen(3000, () => {
  console.log("http://localhost:3000");
});
