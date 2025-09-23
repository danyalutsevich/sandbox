import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class KafkaService {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) { }

  async onModuleInit() {
    // Subscribe to the topic
    this.kafkaClient.subscribeToResponseOf('test-topic');
    await this.kafkaClient.connect();
  }

  sendMessage(message: string) {
    return this.kafkaClient.send('test-topic', { value: message });
  }
}
