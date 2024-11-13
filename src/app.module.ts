import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogIpMiddleware } from './middlewares/log-ip/logIp.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './file/file.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { ReservationsModule } from './reservations/reservations.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        return {
          connectionFactory: (connection) => {
            if (connection.readyState === 1) {
              console.log('Database Connected successfully');
            }
            return connection;
          },
          uri: process.env.MONGO_URI,
        };
      },
    }),
    FileModule,
    RestaurantsModule,
    MenusModule,
    ReservationsModule,
    FavoritesModule,
    ReviewsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogIpMiddleware).forRoutes('*');
  }
}
