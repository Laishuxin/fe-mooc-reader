import { OK } from 'src/constant/response';
import { ApiException } from 'src/exceptions';

export class ApiResponse<T = any> {
  constructor(
    // 状态码
    public code: number,

    // 数据
    public data: T,

    // 当前请求的消息：一般都为 'success'
    public message: string,
  ) {}

  static success<T = any>(data: T = null, message = OK.message) {
    return new ApiResponse(OK.code, data, message);
  }

  static error(apiException: ApiException) {
    return new ApiResponse(apiException.code, null, apiException.message);
  }
}
