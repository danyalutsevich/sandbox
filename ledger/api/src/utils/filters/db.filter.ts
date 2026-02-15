import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class DBQueryExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DBQueryExceptionFilter.name);
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.message);
    // PostgreSQL unique violation error code
    //@ts-ignore
    if (exception.driverError?.code === '23505') {
      return response.status(400).json({
        statusCode: 400,
        message: 'You can create only one entry.',
      });
    }
    return response.status(500).json({
      statusCode: 500,
      message: 'Internal server error',
    });
  }
}
