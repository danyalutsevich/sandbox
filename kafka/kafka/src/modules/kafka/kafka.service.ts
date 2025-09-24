import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}
  producer: Producer;

  async onModuleInit() {
    // Subscribe to the topic
    this.kafkaClient.subscribeToResponseOf('test-topic');
    await this.kafkaClient.connect();
    console.log('Kafka producer connected:', this.producer);
  }

  sendMessage(message: string) {
    console.log('Message sent:', message);
    return this.kafkaClient.emit('test-topic', { value: message });
  }
}
