import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ReservationsService } from '../services/reservations/reservations.service';
import { CreateReservationDto } from 'src/dtos/create-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateDateColumn, UpdateResult } from 'typeorm';
import { UserTool } from 'src/typeorm/entities/UserTool';

@Controller('reservations')
export class ReservationsController {
    constructor(private reservationsService: ReservationsService) {}

    @UseGuards()
    @Post('')
    async createReservation(@Body() reservation: CreateReservationDto) {
        return this.reservationsService.createReseration(reservation);
    }

    @UseGuards()
    @Post('tool/:toolId')
    async getReservationsByToolId(@Param('toolId') id: number) {
        return this.reservationsService.getReservationsByToolId(id);
    }

    @UseGuards()
    @Post('user/:username')
    async getReservationsByUsername(@Param('username') username: string) {
        return this.reservationsService.getReservationsByUsername(username);
    }

    @UseGuards()
    @Get('notPaid')
    async getReservationsNotPaid(): Promise<UserTool[]> {
        return this.reservationsService.getNotPaidReservations();
    }

    @UseGuards()
    @Put(':reservationId/:username/:toolId')
    async updateReservationById(
        @Param('reservationId') id: number, 
        @Param('username') username: string,
        @Param('toolId') toolId: number,
        @Body() reservation: CreateReservationDto
    ):Promise<UpdateResult> {
        return this.reservationsService.editReservationById(id, username, toolId, reservation);
    }

    @UseGuards()
    @Delete(':reservationId/:username/:toolId')
    async deleteReservationsById(
        @Param('reservationId') id: number, 
        @Param('username') username: string,
        @Param('toolId') toolId: number
        ): Promise<string> {
        
        return this.reservationsService.deleteReservationById(id, username, toolId);
    }
}
