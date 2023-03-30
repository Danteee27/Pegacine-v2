import { BaseResponse } from './base.response';

export class ErrorResponse implements BaseResponse<any> {
  constructor(message: string, statusCode?: number) {
    this.message = message;
    this.statusCode = statusCode ?? 400;
  }
  success = false;
  statusCode: number;
  message: string;
}
