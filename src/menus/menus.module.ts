import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';
import { DatabaseAbstractionModule } from 'src/database-abstraction/database-abstraction.module';
import { DBType } from 'src/database-abstraction/types/enums/database-type.enum';

@Module({
  imports: [DatabaseAbstractionModule.register(DBType.MONGODB)],
  controllers: [MenusController],
  providers: [MenusService],
})
export class MenusModule {}
