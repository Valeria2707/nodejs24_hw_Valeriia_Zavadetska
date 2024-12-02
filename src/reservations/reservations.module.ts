import { forwardRef, Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseAbstractionModule } from 'src/database-abstraction/database-abstraction.module';
import { DBType } from 'src/database-abstraction/types/enums/database-type.enum';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    DatabaseAbstractionModule.register(DBType.POSTGRES),
    forwardRef(() => UsersModule),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService],
  exports: [ReservationsService],
})
export class ReservationsModule {}
