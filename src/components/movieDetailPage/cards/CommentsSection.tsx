import React, { useState } from 'react';
import { Box, TextField, List, Divider } from '@mui/material';
import { Quill } from '../../../models/quill';
import ListItemView from '../../common/ListItemView';
import uiConstantsTR from '../../../constants/uiConstantsTR';
import { formatDateWithText } from '../../../helpers/formatter';
import '../../../styles/MovieDetail.scss';
import ButtonView from '../../common/ButtonView';

interface CommentsSectionProps {
    comments: Quill[];
    onSubmitComment: (comment: string) => void;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments, onSubmitComment }) => {
    const [newComment, setNewComment] = useState('');

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        onSubmitComment(newComment);
        setNewComment('');
    };

    return (
        <Box className="comments-section">
            <TextField
                label={uiConstantsTR.MOVIE_DETAIL_PAGE.COMMENT_MOVIE_LABEL}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={newComment}
                onChange={handleCommentChange}
                className="comment-input"
            />
            <ButtonView label={uiConstantsTR.HOME_PAGE.ADD_LABEL} onClickCallback={handleCommentSubmit} />

            <Box className="comments-list">
                {comments.length > 0 ? (
                    <List>
                        {comments.map((quill: Quill, index: number) => (
                            <React.Fragment key={index}>
                                <ListItemView
                                    avatarSrc="/static/images/avatar/1.jpg"
                                    primaryText={quill.quill}
                                    secondaryText={quill.username}
                                    secondaryUser={formatDateWithText(quill.createdAt)}
                                />
                                <Divider variant="inset" component="li" />
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <span>{uiConstantsTR.USER_MESSAGES.NO_QUILLS}</span>
                )}
            </Box>
        </Box>
    );
};

export default CommentsSection;
