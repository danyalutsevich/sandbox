import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { DBQueryExceptionFilter } from './utils/filters/db.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new DBQueryExceptionFilter());

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
