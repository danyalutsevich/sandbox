import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class RabbitmqService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@danlutsevych.online:5672'], // match docker-compose user/pass
        queue: 'my_queue_v2', // your queue name
      },
    });
  }

  sendMessage(message: string) {
    return this.client.emit('message', message);
  }
}
