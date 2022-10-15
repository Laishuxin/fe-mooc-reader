import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UNAUTHORIZED } from 'src/constant/response';
import { ApiException } from 'src/exceptions';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new ApiException(UNAUTHORIZED);
    }
    return user;
  }
}
