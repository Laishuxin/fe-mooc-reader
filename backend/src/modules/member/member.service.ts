import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MEMBER_NOT_EXISTS, MEMBER_EXISTED } from 'src/constant/response';
import { ApiException } from 'src/exceptions';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: {
    username: string;
    password: string;
    nickname: string;
  }) {
    const existedMember = await this.memberRepository.findOneBy({
      username: createMemberDto.username,
    });
    if (existedMember != null) {
      throw new ApiException(MEMBER_EXISTED);
    }

    const member = new Member();
    Object.assign(member, createMemberDto);
    await member.save();
    return member;
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOneBy({ member_id: id });
    if (member == null) {
      throw new ApiException(MEMBER_NOT_EXISTS);
    }
    return member;
  }

  async findOneByUsername(username: string) {
    const member = await this.memberRepository.findOneBy({
      username: username,
    });
    if (member == null) {
      throw new ApiException(MEMBER_NOT_EXISTS);
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const member = await this.findOne(id);
    member.nickname = updateMemberDto.nickname;
    await member.save();
    return member;
  }

  findAll() {
    return `This action returns all member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
