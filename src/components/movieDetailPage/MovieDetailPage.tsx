import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, Divider, List } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AddQuillRequest } from '../../models/addQuillRequest';
import { QuillController } from '../../controllers/QuillController';
import ListItemView from '../common/ListItemView';
import { formatDateWithText } from '../../helpers/formatter';
import { Quill } from '../../models/quill';
import uiConstantsTR from '../../constants/uiConstantsTR';
import '../../styles/MovieDetail.scss';
import RateView from '../common/RateView';
import { GeneralInfoController } from '../../controllers/GeneralInfoController';
import { GeneralInfoResponse } from '../../models/generalInfoResponse';

const MovieDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.userInfo);
    const selectedMovie = useSelector((state: any) => state.generalInfo.detailedGeneralInfo);

    const [movie, setMovie] = useState<any | null>(null);
    const [comments, setComments] = useState<Quill[]>([]);
    const [newComment, setNewComment] = useState('');
    const [selectedMovieRate, setSelectedMovieRate] = useState(0);
    const [isRateSelectDisabled, setIsRateSelectDisabled] = useState(false);

    useEffect(() => {
        setMovie(selectedMovie);
    }, []);

    useEffect(() => {
        QuillController.getGeneralInfoQuills(selectedMovie.id, (response: Quill[] | null) => {
            if (response) {
                setComments(response);
            } else {
                console.error('Failed to fetch comments');
            }
        });
    }, [selectedMovie.id]);

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(event.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            const userId = userInfo.data.id;
            const username = userInfo.data.username;
            const newQuillRequest: AddQuillRequest = {
                userId: userId,
                username: username,
                quill: newComment,
                generalInfoId: movie.id
            };
            QuillController.addNewQuill(newQuillRequest, dispatch);
            setNewComment('');
        }
    };

    const handleRateMovie = (value: number) => {
        console.log('Yeni rating:', value);
        setSelectedMovieRate(value);
        setIsRateSelectDisabled(true);
        const rateGeneralInfoRequest = {
            movieId: movie.id,
            rate: value,
        };

        GeneralInfoController.rateGeneralInfo(rateGeneralInfoRequest, dispatch)
            .then((response) => {
                console.log('Başarılı rating güncelleme:', response);
                setMovie(response);
            })
    }

    return (
        <div className="movie-detail-page">
            {movie ? (
                <Box className="movie-detail-container">
                    <Typography variant="h4" gutterBottom className="movie-detail-info-title">
                        {movie.title}
                    </Typography>
                    <Box className="movie-detail-info">
                        <Typography variant="h6" color="text.primary" className="movie-detail-info-title">Movie Details</Typography>

                        <div className="movie-detail-info-row">
                            <div className="movie-detail-info-left">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Description:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.description}</Typography>
                            </div>
                            <div className="movie-detail-info-right">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Actors:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.actors}</Typography>
                            </div>
                        </div>

                        <div className="movie-detail-info-row">
                            <div className="movie-detail-info-left">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Director:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.director}</Typography>
                            </div>
                            <div className="movie-detail-info-right">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Genre:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.genre}</Typography>
                            </div>
                        </div>

                        <div className="movie-detail-info-row">
                            <div className="info-left">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Metascore:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.metascore}</Typography>
                            </div>
                            <div className="movie-detail-info-right">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Rating:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.rating}</Typography>
                            </div>
                        </div>

                        <RateView
                            label="Rate this Movie"
                            defaultValue={0}
                            value={selectedMovieRate}
                            disabled={isRateSelectDisabled}
                            onChange={(value) => { handleRateMovie(value) }}
                        />

                        <div className="movie-detail-info-row">
                            <div className="movie-detail-info-left">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Revenue:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">${movie.revenue} million</Typography>
                            </div>
                            <div className="movie-detail-info-right">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Runtime:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.runtime} minutes</Typography>
                            </div>
                        </div>

                        <div className="movie-detail-info-row">
                            <div className="movie-detail-info-left">
                                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">Year:</Typography>
                                <Typography variant="body1" color="text.primary" className="movie-detail-info-value">{movie.year}</Typography>
                            </div>
                        </div>
                    </Box>

                    <Box className="comments-section">
                        <Typography variant="h5" gutterBottom>User Comments</Typography>
                        <TextField
                            label="Add a comment"
                            multiline
                            rows={4}
                            variant="outlined"
                            fullWidth
                            value={newComment}
                            onChange={handleCommentChange}
                            className="comment-input"
                        />
                        <Button variant="contained" color="primary" onClick={handleCommentSubmit} className="submit-button">
                            Submit
                        </Button>

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
                </Box>
            ) : (
                <Typography variant="h6">Film bilgisi bulunamadı.</Typography>
            )}
        </div>
    );
};

export default MovieDetailPage;
