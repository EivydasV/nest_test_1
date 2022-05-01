import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import { IsEqualTo } from 'src/common/validators/is-equal-to.valdiator';
import { IsStrongPassword } from 'src/common/validators/strong-password.valdiator';

export class CreateUserDto {
  @Length(2, 50)
  @IsNotEmpty()
  @IsString()
  name: string;

  @Length(2, 50)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEqualTo('password')
  password_confirmation: string;
}
