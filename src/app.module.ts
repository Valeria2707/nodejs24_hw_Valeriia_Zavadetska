import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogIpMiddleware } from './middlewares/log-ip/logIp.middleware';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseAbstractionModule } from './database-abstraction/database-abstraction.module';
import { DBType } from './database-abstraction/types/enums/database-type.enum';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { ReservationsModule } from './reservations/reservations.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot(),
    DatabaseAbstractionModule.register(DBType.MONGODB),
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
