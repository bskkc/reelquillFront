import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useSelector, useDispatch } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import { Box, Typography, Divider } from '@mui/material';
import uiActions from '../../actions/uiActions';
import { MessageResponse } from '../../models/messageResponse';
import '../../styles/Messaging.scss';
import { formatDateWithText } from '../../helpers/formatter';
import { styled, useTheme } from '@mui/material/styles';
import ButtonView from './ButtonView';
import uiConstantsTR from '../../constants/uiConstantsTR';
import { MessageController } from '../../controllers/MessageController';
import { MarkMessagesAsReadRequest } from '../../models/markMessageAsReadRequest';

const Messaging: React.FC = () => {
    const [message, setMessage] = useState<string>('');
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const [selectedMessage, setSelectedMessage] = useState<any>({ groupedMessages: [] });

    const userInfo = useSelector((state: any) => state.userInfo);
    const isMessageDetailDrawerOpen = useSelector((state: any) => state.ui.isMessageDetailDrawerOpen);
    const messageList = useSelector((state: any) => state.message.selectedMessage);
    const dispatch = useDispatch();
    const theme = useTheme();

    useEffect(() => {
        setSelectedMessage(messageList || { groupedMessages: [] });
    }, [messageList]);

    useEffect(() => {
        const sock = new SockJS('http://localhost:8080/ws');
        const client = new Client({
            webSocketFactory: () => sock,
            onConnect: (frame) => {
                console.log('WebSocket bağlantısı kuruldu:', frame);

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

    const StyledButtonView = styled(ButtonView)(({ theme }) => ({
        bgcolor: theme.palette.primary.main,
        color: "#DADADA",
        '&:hover': {
            bgcolor: theme.palette.primary.dark,
        }
    }));

    return (
        <div>
            <Drawer anchor="right" open={isMessageDetailDrawerOpen} onClose={toggleDrawer(false)}>
                <Box
                    sx={{
                        width: 500,
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100vh',
                        color: theme.palette.text.primary,
                    }}>
                    <Typography variant="h5" gutterBottom>
                        {uiConstantsTR.MESSAGE_DRAWER.MESSAGING_TITLE}
                    </Typography>
                    <Divider />

                    <div className="message-list-container">
                        <ul className="message-list">
                            {selectedMessage.groupedMessages && selectedMessage.groupedMessages.length > 0 ? (
                                selectedMessage.groupedMessages.map((msg: MessageResponse, index: number) => (
                                    <li key={index} className={msg.senderId === userInfo.data.id ? 'sent' : 'received'}>
                                        <div
                                            className="message-bubble"
                                            style={{
                                                backgroundColor:
                                                    msg.senderId === userInfo.data.id
                                                        ? theme.palette.primary.main
                                                        : theme.palette.secondary.main,
                                                color: "#DADADA",
                                            }}>
                                            <div className="message-header">
                                                <strong>{msg.senderUsername}</strong>
                                                <span>{formatDateWithText(msg.timestamp)}</span>
                                            </div>
                                            <div className="message-content">
                                                {msg.content}
                                            </div>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li>{uiConstantsTR.MESSAGE_DRAWER.NO_MESSAGES_TEXT}</li>
                            )}
                        </ul>
                    </div>

                    <div className="message-input-container">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder={uiConstantsTR.MESSAGE_DRAWER.ENTER_MESSAGE}
                            className="message-input"
                        />
                        <StyledButtonView
                            label='Gönder'
                            variant="contained"
                            onClickCallback={sendMessage}
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: "#DADADA",
                                '&:hover': { bgcolor: theme.palette.primary.dark },
                            }}
                        />
                    </div>
                </Box>
            </Drawer>
        </div>
    );
};

export default Messaging;
