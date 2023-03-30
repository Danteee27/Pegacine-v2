import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const errors = exceptionResponse.hasOwnProperty('errors')
      ? exceptionResponse['errors']
      : null;

    response.status(status).json({
      statusCode: status,
      success: false,
      message: exception.message,
      errors: errors,
      path: request.url,
    });
  }
}
