import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { CRUDEntities } from './src/services/index';

export default defineConfig({
  entities: [...CRUDEntities],
  driver: PostgreSqlDriver,
  clientUrl: 'postgresql://postgres:root@localhost:5432/erika-db',
});
