import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiException } from 'src/exceptions';
import { UNAUTHORIZED } from 'src/constant/response';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const member = await this.authService.validateUser(username, password);
    if (member == null) {
      throw new ApiException(UNAUTHORIZED);
    }
    return member;
  }
}
