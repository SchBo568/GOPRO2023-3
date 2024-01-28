import { User } from "./User";

export interface GetReview { 
    PK_review_id?: number;
    stars?: number;
    comment?: string;
    timestamp?: Date;
    toolId?: number;
    reviewingUser?: User;
}