import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import Sess from 'supertokens-node/recipe/session';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!roles || roles.length === 0) return true;

    const ctx = context.switchToHttp();
    const resp = ctx.getResponse();

    const sess = await Sess.getSession(ctx.getRequest(), resp);

    if (sess.getAccessTokenPayload().roles.some((r) => roles.includes(r)))
      return true;

    return false;
  }
}
