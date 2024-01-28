export class GetReservationDto {
    PK_user_tool_id?: number;
    PK_username?: string;
    PK_tool_id?: number;
    price?: number;
    paid?: boolean;
    code?: string;
    start_date?: string;
    end_date?: string;
    take_date?: Date;
    returned_date?: Date;
    condition?: string;
    communication?: string;
    paymentMethodPKPMethodId?: number;
}