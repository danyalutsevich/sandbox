import { Controller, Get, Query } from '@nestjs/common';
import { CqrsService } from './cqrs.service';

@Controller('cqrs')
export class CqrsController {
  constructor(private readonly cqrsService: CqrsService) {}

  @Get()
  async execute(@Query() query: any) {
    return this.cqrsService.execute(query);
  }
}
