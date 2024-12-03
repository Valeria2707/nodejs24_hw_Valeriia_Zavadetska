import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseAbstractionModule } from 'src/database-abstraction/database-abstraction.module';
import { DBType } from 'src/database-abstraction/types/enums/database-type.enum';
import { ReservationsModule } from 'src/reservations/reservations.module';

@Module({
  imports: [
    DatabaseAbstractionModule.register(DBType.MONGODB),
    forwardRef(() => ReservationsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
