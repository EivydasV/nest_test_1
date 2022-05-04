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
import { EntityExists } from 'src/common/validators/is-unique.validator';
import { IsStrongPassword } from 'src/common/validators/strong-password.valdiator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @Length(2, 50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Validate(EntityExists, [User])
  @Length(2, 50)
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  @IsEqualTo('password')
  @IsNotEmpty()
  password_confirmation: string;
}
