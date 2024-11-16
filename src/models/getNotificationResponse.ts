export interface GetNotificationResponse {
    id: number;
    receiverId: number;
    senderId?: number;
    senderUsername?: string;
    type: number;
    status: number;
    content?: string;
    data?: string;
    createdAt: string;
    updatedAt?: string;
}
