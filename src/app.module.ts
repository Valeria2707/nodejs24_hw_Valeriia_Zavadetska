import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogIpMiddleware } from './middlewares/log-ip/logIp.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  onModuleInit() {
    console.log('hello');
    mongoose.connection.on('connected', () => {
      console.log('Successfully connected to db');
    });
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIpMiddleware).forRoutes('*');
  }
}
