import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { isArray, isObject } from 'lodash';
import { Paginated } from 'nestjs-paginate';
import { Observable, map, delay } from 'rxjs';
import { DELAY } from 'src/constant/env';
import { snakeCaseKeys } from 'src/utils/core';
import { ApiResponse } from '../utils/response';

function isPaginated(data?: {
  data?: any[];
  links?: object;
  meta?: object;
}): data is Paginated<any> {
  return (
    isObject(data) &&
    isArray(data.data) &&
    isObject(data.links) &&
    isObject(data.meta)
  );
}

function normalizePaginated(paginated: Paginated<any>) {
  const { data, links, meta } = paginated;
  return {
    list: data,
    meta: snakeCaseKeys(meta),
    links,
  };
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (isPaginated(data)) {
          return ApiResponse.success(normalizePaginated(data));
        }
        return ApiResponse.success(data);
      }),
    );
  }
}
