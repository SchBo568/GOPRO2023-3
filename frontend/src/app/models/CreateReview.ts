
export interface CreateReview {
    stars?: number;
    comment?: string;
    timestamp?: Date;
    toolId: number;
    reviewingUser?: string;
}