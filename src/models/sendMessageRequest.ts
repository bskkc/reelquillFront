export interface SendMessageRequest {
    senderId: number;
    receiverId: number;
    senderUsername: string;
    receiverUsername: string;
    content: string;
}
