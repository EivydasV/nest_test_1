import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Session,
} from '@nestjs/common';
import { Response } from 'express';
import {
  createNewSession,
  SessionContainer,
} from 'supertokens-node/recipe/session';
import { AuthService } from './auth.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/user.entity';
import { Public } from 'src/common/decorators/public.decorator';
import * as argon from 'argon2';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public()
  async register(
    @Body() registerUserDto: CreateUserDto,
  ): Promise<{ message: string } | never> {
    await this.authService.create(registerUserDto);

    return { message: 'User successfully created now you can login' };
  }
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  async login(
    @Res({ passthrough: true }) res: Response,
    @Body() LoginUserDto: LoginUserDto,
  ): Promise<{ message: string } | never> {
    const user = await this.authService.login(LoginUserDto);

    if (
      !user ||
      !(await this.comparePassword(user.password, LoginUserDto.password))
    ) {
      throw new BadRequestException('Invalid credentials');
    }

    await createNewSession(res, user._id, { roles: user.roles });

    /* a new session has been created.
     * - an access & refresh token has been attached to the response's cookie
     * - a new row has been inserted into the database for this new session
     */

    return { message: 'User logged in!' };
  }

  @Post('logout')
  @HttpCode(HttpStatus.UNAUTHORIZED)
  async logout(
    @Session() session: SessionContainer,
  ): Promise<{ message: string }> {
    await session.revokeSession();
    return { message: 'User logged out!' };
  }

  @Get('me')
  @Roles(Role.USER)
  async me(@Session() session: SessionContainer) {
    const tokenPayload = session.getAccessTokenPayload();
    const userID = session.getUserId();

    return { tokenPayload, userID };
  }

  async comparePassword(currentPassword: string, candidatePassword: string) {
    return argon.verify(currentPassword, candidatePassword);
  }
}
