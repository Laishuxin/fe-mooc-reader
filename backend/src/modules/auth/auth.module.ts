import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MemberModule } from 'src/modules/member/member.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { MemberService } from 'src/modules/member/member.service';
import { Member } from 'src/modules/member/entities/member.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JWT } from 'src/config/env';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    MemberModule,
    PassportModule,
    TypeOrmModule.forFeature([Member]),
    JwtModule.register({
      secret: JWT.secret,
      signOptions: { expiresIn: JWT.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MemberService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
