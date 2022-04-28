import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import {
  createNewSession,
  SessionContainer,
} from 'supertokens-node/recipe/session';
import { AuthGuard } from '../common/guards/auth.guard';
import { AuthService } from './auth.service';
import superSession from 'supertokens-node/recipe/session';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    await createNewSession(res, 'Eivydas', { role: 'admin' });

    /* a new session has been created.
     * - an access & refresh token has been attached to the response's cookie
     * - a new row has been inserted into the database for this new session
     */

    return { message: 'User logged in!' };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(
    @Session() session: SessionContainer,
  ): Promise<{ message: string }> {
    await session.revokeSession();
    return { message: 'User logged out!' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async me(@Session() session: SessionContainer) {
    const tokenPayload = session.getAccessTokenPayload();
    const userID = session.getUserId();

    return { tokenPayload, userID };
  }
}
