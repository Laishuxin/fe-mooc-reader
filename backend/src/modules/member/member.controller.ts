import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { CurrentMember } from 'src/decorators/member.decorator';
import { Member as EMember } from './entities/member.entity';

@Controller('member')
@UseGuards(JwtAuthGuard)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/profile')
  findOne(@CurrentMember() member: EMember) {
    return this.memberService.findOne(member.member_id);
  }

  @Patch()
  update(@CurrentMember() member: EMember, @Body() updateMemberDto: UpdateMemberDto) {
    const { member_id } = member;
    return this.memberService.update(member_id, updateMemberDto);
  }
}
