import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Sess from 'supertokens-node/recipe/session';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const resp = ctx.getResponse();

    const sess = await Sess.getSession(ctx.getRequest(), resp, {
      sessionRequired: true,
    });
    sess.getAccessTokenPayload();

    console.log({ sess: sess.getUserId() });
    return true;
  }
}
