import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Producer } from 'kafkajs';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}
  producer: Producer;

  async onModuleInit() {
    // Subscribe to the topic
    this.kafkaClient.subscribeToResponseOf('test-topic.reply');
    this.producer = await this.kafkaClient.connect();
    console.log('Kafka producer connected:', this.producer);
  }

  sendMessage(message: string) {
    this.producer.send({
      topic: 'test-topic',
      messages: [{ value: message }],
    });
    console.log('Message sent:', message);
    return this.kafkaClient.send('test-topic', { value: message });
    // return this.kafkaClient.emit('test-topic', { value: message });
  }
}
