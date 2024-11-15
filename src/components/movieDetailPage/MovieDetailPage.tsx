import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { QuillController } from '../../controllers/QuillController';
import { Quill } from '../../models/quill';
import '../../styles/MovieDetail.scss';
import MovieInfoCard from './cards/MovieInfoCard';
import MovieStatsCard from './cards/MovieStatsCard';
import CommentsSection from './cards/CommentsSection';
import uiConstantsTR from '../../constants/uiConstantsTR';

const MovieDetailPage: React.FC = () => {
    const dispatch = useDispatch();
    const selectedMovie = useSelector((state: any) => state.generalInfo.detailedGeneralInfo);
    const userInfo = useSelector((state: any) => state.userInfo);

    const [movie, setMovie] = useState<any | null>(null);
    const [comments, setComments] = useState<Quill[]>([]);
    const [selectedMovieRate, setSelectedMovieRate] = useState(0);
    const [isRateSelectDisabled, setIsRateSelectDisabled] = useState(false);

    useEffect(() => {
        setMovie(selectedMovie);
        QuillController.getGeneralInfoQuills(selectedMovie.id, (response: Quill[] | null) => {
            if (response) setComments(response);
            else console.error('Failed to fetch comments');
        });
    }, [selectedMovie.id]);

    const handleCommentSubmit = (comment: string) => {
        if (comment.trim()) {
            const newQuillRequest = { userId: userInfo.data.id, username: userInfo.data.username, quill: comment, generalInfoId: movie.id };
            QuillController.addNewQuill(newQuillRequest, dispatch);
            setComments([...comments, { ...newQuillRequest, id: Date.now(), createdAt: new Date().toISOString() }]);
        }
    };

    const handleRateMovie = (value: number) => {
        setSelectedMovieRate(value);
        setIsRateSelectDisabled(true);
    };

    return (
        <div className="movie-detail-page">
            {movie ? (
                <>
                    <MovieInfoCard movie={movie} />
                    <div className="d-flex mt-3">
                        <MovieStatsCard
                            movie={movie}
                            selectedMovieRate={selectedMovieRate}
                            isRateSelectDisabled={isRateSelectDisabled}
                            onRateMovie={handleRateMovie}
                        />
                    </div>
                    <CommentsSection comments={comments} onSubmitComment={handleCommentSubmit} />
                </>
            ) : (
                <span>{uiConstantsTR.USER_MESSAGES.NO_MOVIES}</span>
            )}
        </div>
    );
};

export default MovieDetailPage;
