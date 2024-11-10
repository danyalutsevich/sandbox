import { Injectable } from "@nestjs/common";
import pg from "pg";
import { createBetterAuthService } from "./lib/auth.js";

const { Pool } = pg;

const DATABASE_URL = "postgresql://postgres:root@localhost:5432/admin";
@Injectable()
export class BetterAuthService {
  public auth: any;

  constructor() {
    createBetterAuthService(
      {
        database: new Pool({
          connectionString: DATABASE_URL,
        }),
        //other options...
      },
      (auth) => {
        this.auth = auth;
        console.log(this.auth);
      }
    );
  }
}
