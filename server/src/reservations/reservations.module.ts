import { Module } from '@nestjs/common';
import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './services/reservations/reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTool } from 'src/typeorm/entities/UserTool';
import { UsersModule } from 'src/users/users.module';
import { KiosksModule } from 'src/kiosks/kiosks.module';
import { ToolsService } from 'src/tools/tools.service';
import { ToolsModule } from 'src/tools/tools.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserTool]), UsersModule, ToolsModule],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
