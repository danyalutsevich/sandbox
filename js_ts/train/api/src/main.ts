import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DBQueryExceptionFilter } from './utils/filters/db.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000;

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new DBQueryExceptionFilter());
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Train schedule API')
    .setDescription('Api documentation for train schedule.')
    .setVersion('1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      docExpansion: 'none',
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  await app.listen(PORT, () =>
    Logger.log(`Api docs on http://localhost:${PORT}/docs`, 'Bootstrap'),
  );
}
bootstrap();
