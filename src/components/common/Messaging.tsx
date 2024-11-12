import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import { Box, Typography, Divider, Button } from '@mui/material';
import uiActions from '../../actions/uiActions';
import { MessageResponse } from '../../models/messageResponse';
import '../../styles/Messaging.scss';
import { formatDateWithText } from '../../helpers/formatter';

const Messaging: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<any>({ groupedMessages: [] }); // Başlangıç değeri

    const userInfo = useSelector((state: any) => state.userInfo);
    const isMessageDetailDrawerOpen = useSelector((state: any) => state.ui.isMessageDetailDrawerOpen);
    const messageList = useSelector((state: any) => state.message.selectedMessage);
    const dispatch = useDispatch();

    useEffect(() => {
        setSelectedMessage(messageList || { groupedMessages: [] });
    }, [messageList]);

    useEffect(() => {
        const sock = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => sock,
            onConnect: (frame) => {
                console.log('WebSocket bağlantısı kuruldu:', frame);

                // Mesajları dinle
                client.subscribe('/topic/messages', (message) => {
                    const receivedMessage = JSON.parse(message.body);

                    console.log("receivedMessage", receivedMessage);
                    if (receivedMessage) {
                        setSelectedMessage((prevSelectedMessage: any) => ({
                            ...prevSelectedMessage,
                            groupedMessages: [
                                ...prevSelectedMessage.groupedMessages,
                                receivedMessage
                            ]
                        }));
                    }
                });

                setStompClient(client);
            },
            onStompError: (frame) => {
                console.error('STOMP hatası:', frame);
            }
        });

        client.activate();

        return () => {
            if (client) {
                client.deactivate();
                console.log('WebSocket bağlantısı kapatıldı.');
            }
        };
    }, [userInfo.data.id, dispatch]);

    const sendMessage = () => {
        if (stompClient) {
            const messagePayload = {
                senderId: selectedMessage.senderId,
                receiverId: selectedMessage.receiverId,
                senderUsername: selectedMessage.senderUsername,
                receiverUsername: selectedMessage.receiverUsername,
                content: message,
            };

            stompClient.publish({
                destination: '/app/send',
                body: JSON.stringify(messagePayload),
            });

            setMessage('');
        }
    };

    const toggleDrawer = (open: boolean) => () => {
        dispatch(uiActions.messageDetailDrawerStatusChanged(open));
    };

    return (
        <div>
            <Drawer anchor="right" open={isMessageDetailDrawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 500, p: 2, display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Mesajlaşma
                    </Typography>
                    <Divider />

                    <div className="message-list-container">
                        <ul className="message-list">
                            {selectedMessage.groupedMessages && selectedMessage.groupedMessages.length > 0 ? (
                                selectedMessage.groupedMessages.map((msg: MessageResponse, index: number) => (
                                    <li key={index} className={msg.senderId === userInfo.data.id ? 'sent' : 'received'}>
                                        <div className="message-bubble">
                                            <div className="message-header">
                                                <strong>{msg.senderUsername}</strong>
                                                <span className="message-time">{formatDateWithText(msg.timestamp)}</span>
                                            </div>
                                            <div className="message-content">
                                                {msg.content}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li>No messages yet.</li>
                            )}
                        </ul>
                    </div>

                    <div className="message-input-container">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Mesajınızı yazın..."
                            className="message-input"
                        />
                        <Button
                            variant="contained"
                            onClick={sendMessage}
                            className="send-button"
                        >
                            Gönder
                        </Button>
                    </div>
                </Box>
            </Drawer>
        </div>
    );
};

export default Messaging;
