import { isNumber, isObject } from 'lodash';
import {
  CREATE_FAILURE,
  NOT_FOUND,
  UPDATE_FAILURE,
} from 'src/constant/response';

export class ApiException extends Error {
  public code: number;
  public message: string;

  constructor(codeAndMessage: { code: number; message: string });
  constructor(code: number, message: string);
  constructor() {
    if (isNumber(arguments[0])) {
      super(arguments[1]);
      this.message = arguments[1];
      this.code = arguments[0];
    } else {
      super(arguments[0].message);
      this.message = arguments[0].message;
      this.code = arguments[0].code;
    }
  }

  static notFound(message = NOT_FOUND.message) {
    return new ApiException({ code: NOT_FOUND.code, message });
  }

  static failToUpdate(message = UPDATE_FAILURE.message) {
    return new ApiException({ code: UPDATE_FAILURE.code, message });
  }

  static failToCreate(message = CREATE_FAILURE.message) {
    return new ApiException({ code: CREATE_FAILURE.code, message });
  }
}
