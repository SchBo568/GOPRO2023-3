import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Timestamp } from "typeorm";

export class CreateReservationDto {
    @IsString()
    @IsNotEmpty()
    PK_username: string;

    @IsNumber()
    @IsNotEmpty()
    PK_tool_id: number;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsBoolean()
    @IsOptional()
    paid: boolean;

    @IsString()
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    start_date: Date;

    @IsNotEmpty()
    end_date: Date;

    @IsOptional()
    take_date: Timestamp;

    @IsOptional()
    returned_date: Timestamp;

    @IsString()
    @IsOptional()
    condition: string;

    @IsString()
    @IsNotEmpty()
    communication: string;
}
