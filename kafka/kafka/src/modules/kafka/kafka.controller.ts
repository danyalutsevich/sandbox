import { Controller, Post, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { KafkaProducerService } from './kafkaProducer.service';

@Controller()
export class KafkaController {
  constructor(
    private readonly kafkaProducerService: KafkaProducerService,
    private readonly kafkaService: KafkaService,
  ) {}

  @MessagePattern('test-topic')
  handleMessage(@Payload() message: any) {
    console.log('Received message:', message.value);
  }

  @Post('produce')
  produceMessage(@Query('message') message: string) {
    this.kafkaService.sendMessage(message);
    return this.kafkaProducerService.emitUserRegisteredEvent({ message });
  }
}
