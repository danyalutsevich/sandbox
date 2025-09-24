import { Controller, Post, Query } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';

@Controller('kafka')
export class KafkaController {
  constructor(private readonly kafkaService: KafkaService) {}

  @MessagePattern('test-topic.reply')
  handleMessage(@Payload() message: any) {
    console.log('Received message:', message.value);
  }

  @Post('produce')
  produceMessage(@Query('message') message: string) {
    this.kafkaService.sendMessage(message);
  }
}
