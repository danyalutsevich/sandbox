import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

export class CqrsCommand {
  constructor(public data: any) {}
}

@CommandHandler(CqrsCommand)
export class CqrsHandler implements ICommandHandler<CqrsCommand> {
  async execute(command: CqrsCommand): Promise<any> {
    console.log('CqrsHandler:execute: command.data:', command.data);
    return command.data;
  }
}
