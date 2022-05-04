import { AuthGuard } from './common/guards/auth.guard';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './common/guards/role.guard';
import { LoggingMiddleware } from './common/middlewares/logging.middleware';
import appConfig from './config/app.config';
import { EntityExists } from './common/validators/is-unique.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    AuthModule.forRoot({
      // try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.
      connectionURI: 'https://try.supertokens.com',
      // apiKey: "IF YOU HAVE AN API KEY FOR THE CORE, ADD IT HERE",
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/session/appinfo
        appName: 'eivydas',
        apiDomain: 'http://localhost:3001',
        websiteDomain: 'http://localhost:3000',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [
    EntityExists,
    AppService,
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
