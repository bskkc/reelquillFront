import * as React from 'react';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/joy/ListItemButton';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import CircleIcon from '@mui/icons-material/Circle';
import AvatarWithStatus from './AvatarWithStatus';
import { MessageResponse } from '../../models/messageResponse';
// import { toggleMessagesPane } from '../utils';

type ChatListItemProps = ListItemButtonProps & {
  id: string;
  unread?: boolean;
  sender: string; // Gönderen kullanıcının adı
  messages: MessageResponse[]; // Mesajların listesi
  setSelectedMessage: (message: any) => void; // Mesajı ayarlamak için kullanılan fonksiyon
};

export default function ChatListItem(props: ChatListItemProps) {
  const { id, sender, messages, setSelectedMessage } = props;

  const handleClick = () => {
    // toggleMessagesPane();
    setSelectedMessage({ 
      receiverId: id, 
      receiverUsername: sender, 
      groupedMessages: messages 
    });
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemButton
          onClick={handleClick}
          color="neutral"
          sx={{ flexDirection: 'column', alignItems: 'initial', gap: 1 }}
        >
          <Stack direction="row" spacing={1.5}>
            <AvatarWithStatus online={true} src="default_avatar.png" /> {/* Örnek avatar */}
            <Box sx={{ flex: 1 }}>
              <Typography level="title-sm">{sender}</Typography>
              <Typography level="body-sm">{messages[0]?.senderUsername}</Typography>
            </Box>
            <Box sx={{ lineHeight: 1.5, textAlign: 'right' }}>
              {!messages[0]?.isRead && (
                <CircleIcon sx={{ fontSize: 12 }} color="primary" />
              )}
              <Typography level="body-xs" noWrap>
                5 mins ago
              </Typography>
            </Box>
          </Stack>
          <Typography
            level="body-sm"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {messages[0]?.content}
          </Typography>
        </ListItemButton>
      </ListItem>
      <ListDivider sx={{ margin: 0 }} />
    </React.Fragment>
  );
}
