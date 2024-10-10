import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogIpMiddleware } from './middlewares/log-ip/logIp.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseAbstractionModule } from './database-abstraction/database-abstraction.module';
import { DBType } from './database-abstraction/types/enums/database-type.enum';

@Module({
  imports: [
    UsersModule,

    AuthModule,
    ConfigModule.forRoot(),
    DatabaseAbstractionModule.register(DBType.POSTGRES),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIpMiddleware).forRoutes('*');
  }
}
