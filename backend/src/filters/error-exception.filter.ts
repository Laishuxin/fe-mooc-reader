import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, response, Response } from 'express';
import { isString, stubArray } from 'lodash';
import { IS_DEV } from 'src/config/env';
import {
  BAD_REQUEST,
  NOT_FOUND,
  SERVER_ERROR,
  UNKNOWN_ERROR,
} from 'src/constant/response';
import { ApiException } from 'src/exceptions';
import { ApiResponse } from 'src/utils/response';
import { TypeORMError } from 'typeorm';

@Catch()
export class ErrorExceptionFilter<T> implements ExceptionFilter {
  private readonly logger = new Logger(ErrorExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const res: any = exception.getResponse();
      const httpStatus = exception.getStatus();
      let status = httpStatus;

      let message = exception.message;
      if (!isString(res)) {
        message = Array.isArray(res.message)
          ? res.message.join('\n')
          : res.message
          ? res.message
          : res.error;
      }

      if (httpStatus == 400) {
        status = BAD_REQUEST.code;
      } else if (httpStatus == 404) {
        status = NOT_FOUND.code;
        message = NOT_FOUND.message;
      }

      message = message.toLowerCase();

      response.status(200).json(new ApiResponse(status, null, message));
    } else if (exception instanceof TypeORMError) {
      // let errors: any = null;
      // if (IS_DEV && exception.stack != null) {
      //   errors = exception.stack.split('\n').map((err) => err.trim());
      // }
      this.logger.error(exception.message, exception.stack);
      response
        .status(200)
        .json(new ApiResponse(SERVER_ERROR.code, null, SERVER_ERROR.message));
    } else if (exception instanceof ApiException) {
      response.status(200).json(ApiResponse.error(exception));
    } else {
      this.logger.error(exception.message, exception.stack);
      response
        .status(200)
        .json(new ApiResponse(UNKNOWN_ERROR.code, null, UNKNOWN_ERROR.message));
    }
  }
}
