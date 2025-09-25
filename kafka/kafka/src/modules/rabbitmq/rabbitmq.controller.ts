import { Controller, Post, Query } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { RabbitmqService } from './rabbitmq.service';

@Controller()
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @MessagePattern('message')
  handleMessage(message: string) {
    console.log('Received message from RabbitMQ:', message);
  }

  @Post('produce')
  produceMessage(@Query('message') message: string) {
    this.rabbitmqService.sendMessage(message);
    return { status: 'Message sent to RabbitMQ', message };
  }
}
