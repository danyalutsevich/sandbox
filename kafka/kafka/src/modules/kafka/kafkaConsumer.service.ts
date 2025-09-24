import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    clientId: 'nestjs-client',
    brokers: ['kafka.danlutsevych.online:9092'],
  });

  private readonly consumer = this.kafka.consumer({ groupId: 'nestjs-group' });

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({
      topic: 'user-registered',
      fromBeginning: true,
    });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const userData = JSON.parse(message.value.toString());
        console.log(
          `Received user registration event: ${JSON.stringify(userData)}`,
        );
      },
    });
    console.log('Kafka consumer connected and running');
  }

  async onModuleDestroy() {
    await this.consumer.disconnect();
  }
}
