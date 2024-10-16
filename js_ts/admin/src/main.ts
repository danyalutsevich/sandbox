import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { createAgent } from '@forestadmin/agent';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import * as Expre from 'express';

// import { CrudConfigService } from '@dataui/crud';

// CrudConfigService.load({
//   query: {
//     limit: 25,
//     cache: 2000,
//   },
//   params: {
//     id: {
//       field: 'id',
//       type: 'uuid',
//       primary: true,
//     },
//   },
//   routes: {
//     updateOneBase: {
//       allowParamsOverride: true,
//     },
//     deleteOneBase: {
//       returnDeleted: true,
//     },
//   },
// });

import { AppModule } from './app.module';
import { QueryExceptionFilter } from './utils/exceptionFilters/query.filter';

// const FOREST_ENV_SECRET = "FOREST_ENV_SECRET=12873322a2175a476aad373ca4b7578a3ed17fccab762b55f0a2df2e4af880b7";

// const FOREST_ENV_SECRET =
//   '08d213b829b92202a7e6a2d043e845b4ea343c20fab24aeaa646ac258873d643';
// const FOREST_AUTH_SECRET = '83abd8e83f19fe9c56d753849efd6a17673e99f113c47ee1';
// const DATABASE_URL = 'postgresql://postgres:root@localhost:5432/admin';

async function bootstrap() {
  const PORT = 3333;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Admin example')
    .setDescription('The admin API description')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new QueryExceptionFilter());
  app.enableCors({
    origin: 'http://localhost:5173',
    methods: '*',
  });

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  // app.enableCors({
  //   allowedHeaders: '*',
  //   methods: '*',
  //   origin: 'https://app.forestadmin.com/',
  // });
  // const agent = createAgent({
  //   authSecret: FOREST_AUTH_SECRET,
  //   envSecret: FOREST_ENV_SECRET,
  //   isProduction: true,
  //   instantCacheRefresh: true,
  //   // typingsPath: './typings.ts',
  //   // typingsMaxDepth: 5,
  // })
  /*
   type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      database: 'admin',
      username: 'postgres',
      password: 'root',
      synchronize: true,
      logging: true,
      entities: Object.values(Entities),
  */
  // Create your SQL datasource
  // .addDataSource(createSqlDataSource(DATABASE_URL));
  // await agent.mountOnNestJs(app).mountOnStandaloneServer(3001).start();
  // app.enableCors({
  //   allowedHeaders: '*',
  //   methods: '*',
  //   origin: 'https://app.forestadmin.com/',
  // });
  await app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}/api`);
  });
}
bootstrap();
