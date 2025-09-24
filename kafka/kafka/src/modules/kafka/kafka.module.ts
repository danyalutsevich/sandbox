import { Module } from '@nestjs/common';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumerService } from './kafkaConsumer.service';
import { KafkaProducerService } from './kafkaProducer.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'nestjs-client',
            brokers: ['kafka.danlutsevych.online:9092'], // your Kafka broker(s)
          },
          consumer: {
            groupId: 'nestjs-group',
          },
        },
      },
    ]),
  ],
  controllers: [KafkaController],
  providers: [KafkaService, KafkaConsumerService, KafkaProducerService],
  exports: [KafkaService, KafkaProducerService, KafkaConsumerService],
})
export class KafkaModule {}
