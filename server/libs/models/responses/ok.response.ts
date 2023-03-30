import { BaseResponse } from './base.response';

export class OkResponse<T> implements BaseResponse<T> {
  constructor(data?: T) {
    this.data = data;
  }
  success = true;
  statusCode = 200;
  data: T;
  message = '';
}
