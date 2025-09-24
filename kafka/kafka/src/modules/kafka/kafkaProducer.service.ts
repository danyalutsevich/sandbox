import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaProducerService {
  private readonly kafka = new Kafka({
    brokers: ['kafka.danlutsevych.online:9092'],
  });
  private readonly producer = this.kafka.producer();

  constructor() {
    this.producer.connect().catch(console.error);
  }

  async emitUserRegisteredEvent(userData: any) {
    console.log('Producing user registration event:', userData);
    await this.producer.send({
      topic: 'user-registered', // Topic name
      messages: [{ key: 'user-registration', value: JSON.stringify(userData) }],
    });
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }
}
