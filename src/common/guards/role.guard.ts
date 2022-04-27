import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Session,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { verifySession } from 'supertokens-node/recipe/session/framework/express';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // const session = await verifySession()(request, response, (res) => {
    //   console.log(res);
    // });
    // console.log({ roles: request });
    Session;

    if (!roles || roles.length === 0) {
      return true;
    }

    // let err = undefined;
    // const resp = ctx.getResponse();
    // // You can create an optional version of this by passing {sessionRequired: false} to verifySession
    // const test = await verifySession()(ctx.getRequest(), resp, (res) => {
    //   console.log(res);
    //   err = res;
    // });

    return false;
  }
}
