import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  username: string;

  @IsString()
  @MaxLength(32)
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  nickname: string;
}
