import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @MaxLength(128)
  @IsNotEmpty()
  @MinLength(2)
  username: string;

  @IsString()
  @MaxLength(32)
  @MinLength(6)
  password: string;

  // @IsString()
  // @MaxLength(128)
  // nickname: string;

  // TODO(rushui 2022-10-13): 验证码
}
