import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

const DATABASE_URL = 'postgresql://postgres:root@localhost:5432/admin';

@Injectable()
export class BetterAuthService {
  public betterAuth: any;

  constructor() {
    import('better-auth').then((betterAuth) => {
      const auth = betterAuth.betterAuth({
        database: new Pool({ connectionString: DATABASE_URL }),
        trustedOrigins: ['*'],
        advanced: {
          disableCSRFCheck: true,
        },
      });

      this.betterAuth = auth;
      console.log({ auth });
    });
  }
}
