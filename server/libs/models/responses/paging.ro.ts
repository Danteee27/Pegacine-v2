import { ApiResponseProperty } from '@nestjs/swagger';

export class PagingRo<T> {
  @ApiResponseProperty()
  page: number;
  @ApiResponseProperty()
  pageSize: number;
  @ApiResponseProperty()
  totalCount: number;
  @ApiResponseProperty()
  items: T[];
}
