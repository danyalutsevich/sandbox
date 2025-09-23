import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('kafka')
export class KafkaController {
  @MessagePattern('test-topic')
  handleMessage(@Payload() message: any) {
    console.log('Received message:', message.value);
  }
}
