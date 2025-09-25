import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.connectMicroservice<MicroserviceOptions>({
  //   transport: Transport.KAFKA,
  //   options: {
  //     client: {
  //       brokers: ['kafka.danlutsevych.online:9092'], // your Kafka broker(s)
  //     },
  //     consumer: {
  //       groupId: 'my-consumer-' + Math.random(), // unique consumer group
  //     },
  //   },
  // });
  //
  //

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@danlutsevych.online:5672'], // match docker-compose user/pass
      queue: 'my_queue_v2', // your queue name
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
