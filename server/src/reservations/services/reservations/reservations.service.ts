import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
import { KiosksService } from 'src/kiosks/kiosks.service';
import { ToolsService } from 'src/tools/tools.service';
import { UserTool } from 'src/typeorm/entities/UserTool';
import { UsersService } from 'src/users/users.service';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ReservationsService {
    constructor(@InjectRepository(UserTool) private reservationsRepo: Repository<UserTool>, private userService: UsersService, private toolService: ToolsService){}

    async createReseration(reservation: CreateReservationDto){
        const user = await this.userService.findUserByUsername(reservation.PK_username)
        const tool = await this.toolService.getTool(reservation.PK_tool_id)

        var newReservation: UserTool = new UserTool;
        newReservation.tool = tool;
        newReservation.user = user[0];
        newReservation.code = reservation.code;
        newReservation.condition = null;
        newReservation.price = reservation.price;
        newReservation.start_date = reservation.start_date;
        newReservation.end_date = reservation.end_date;
        newReservation.take_date = null;
        newReservation.returned_date = null;
        newReservation.paid = false;
        newReservation.communication = reservation.communication;

        this.reservationsRepo.save(newReservation);
    }

    async getNotPaidReservations(): Promise<UserTool[]>{
        return this.reservationsRepo.find({where: {paid: false}})
    }

    async getReservationsByToolId(toolId: number): Promise<UserTool[]>{
        console.log(await this.reservationsRepo.find());
        
        return this.reservationsRepo.find({where: {PK_tool_id: toolId}})
    }

    async getReservationsByUsername(username: string): Promise<UserTool[]>{
        return this.reservationsRepo.find({where: {PK_username: username}})
    }

    async editReservationById(id: number, username: string, toolId: number, reservation: CreateReservationDto): Promise<UpdateResult> {

        const compositeKey = {
            PK_user_tool_id: id,
            PK_username: username,
            PK_tool_id: toolId
          };

          
          
        return (await this.reservationsRepo.update(compositeKey, reservation))
    }

    async deleteReservationById(id: number, username: string, toolId: number): Promise<string> {
        const compositeKey = {
            PK_user_tool_id: id,
            PK_username: username,
            PK_tool_id: toolId
          };
        
        return (await this.reservationsRepo.delete(compositeKey)).raw;
    }
}
