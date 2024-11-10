import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CqrsCommand } from './cqrs.handler';

@Injectable()
export class CqrsService {
  constructor(private readonly commandBus: CommandBus) {}

  async execute(command: any) {
    return this.commandBus.execute(new CqrsCommand(command));
  }
}
