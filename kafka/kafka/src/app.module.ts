import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './modules/kafka/kafka.module';
import { RabbitmqModule } from './modules/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    // ClientsModule.register([
    //   {
    //     name: 'KAFKA_SERVICE',
    //     transport: Transport.KAFKA,
    //     options: {
    //       client: {
    //         brokers: ['https://kafka.danlutsevych.online:9092'], // your Kafka broker(s)
    //       },
    //       consumer: {
    //         groupId: 'my-consumer-' + Math.random(), // unique consumer group
    //       },
    //     },
    //   },
    // ]),
    // KafkaModule,
    RabbitmqModule,
  ],
})
export class AppModule {}
