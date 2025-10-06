import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
import * as E from './entities';

dotenv.config({ path: '.env' });

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: Object.values(E),
  migrations: ['./src/utils/migrations/*.ts'],
  logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => {
    console.error('Database connection error', err);
  });

// npx typeorm-ts-node-commonjs migration:generate -d ./src/db/dataSource.ts ./src/db/migrations/init
// npx typeorm-ts-node-commonjs migration:run -d ./src/db/dataSource.ts
