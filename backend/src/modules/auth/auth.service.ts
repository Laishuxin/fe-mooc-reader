import { Injectable } from '@nestjs/common';
import { PASSWORD_ERROR } from 'src/constant/response';
import { ApiException } from 'src/exceptions';
import { MemberService } from 'src/modules/member/member.service';
import { hash } from 'src/utils/crypt';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { Member } from 'src/modules/member/entities/member.entity';
import { merge } from 'lodash';

@Injectable()
export class AuthService {
  constructor(
    private memberService: MemberService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const member = await this.memberService.findOneByUsername(username);
    if (member.password == hash(pass)) {
      return member;
    } else {
      throw new ApiException(PASSWORD_ERROR);
    }
  }

  async login(member: any) {
    const payload = { username: member.username, sub: member.member_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(_member: RegisterDto) {
    const { username } = _member;
    const member = await this.memberService.create(
      merge(_member, { nickname: username }),
    );

    const payload = { username: member.username, sub: member.member_id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  create() {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update() {}

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
