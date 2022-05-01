import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, LeanDocument } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}
  async login(loginUserDto: LoginUserDto): Promise<User | null> {
    return this.UserModel.findOne({
      email: loginUserDto.email,
    })
      .select('password email roles')
      .exec();
  }

  async create(registerUserDto: CreateUserDto): Promise<User | null> {
    return this.UserModel.create(registerUserDto);
  }
}
