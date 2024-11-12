export interface MessageResponse {
    id: number;
    senderId: number;
    receiverId: number;
    senderUsername: string;
    receiverUsername: string;
    content: string;
    timestamp: string;
    isRead: boolean;
    groupedMessages: [];
}
