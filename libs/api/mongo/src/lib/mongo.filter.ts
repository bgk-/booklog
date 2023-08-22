import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongooseError } from 'mongoose';
import { MongoError } from 'mongodb';

@Catch(MongooseError)
export class MongooseErrorFilter implements ExceptionFilter {
  catch(error: MongooseError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      statusCode: error.name,
      message: error.message,
    });
  }
}

@Catch(MongoError)
export class MongoErrorFilter implements ExceptionFilter {
  catch(error: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.status(500).json({
      statusCode: error.code,
      message: error.message,
    });
  }
}
