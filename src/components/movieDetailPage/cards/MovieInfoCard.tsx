import React from 'react';
import { Paper, Typography } from '@mui/material';
import '../../../styles/MovieDetail.scss';
import uiConstantsTR from '../../../constants/uiConstantsTR';

interface MovieInfoCardProps {
    movie: any;
}

const MovieInfoCard: React.FC<MovieInfoCardProps> = ({ movie }) => (
    <Paper className="movie-detail-info">
        <Typography variant="h5" color="text.primary" className="movie-detail-info-title">{movie.title}</Typography>

        <div className="movie-detail-info-row">
            <div className="movie-detail-info-left">
                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">{uiConstantsTR.MOVIE_DETAIL_PAGE.DESCRIPTION_LABEL}</Typography>
                <Typography color="text.primary">{movie.description}</Typography>
            </div>
            <div className="movie-detail-info-right">
                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">{uiConstantsTR.MOVIE_DETAIL_PAGE.ACTORS_LABEL}</Typography>
                <Typography color="text.primary">{movie.actors}</Typography>
            </div>
        </div>

        <div className="movie-detail-info-row">
            <div className="movie-detail-info-left">
                <Typography color="text.secondary" className="movie-detail-info-label">{uiConstantsTR.MOVIE_DETAIL_PAGE.DIRECTOR_LABEL}</Typography>
                <Typography color="text.primary">{movie.director}</Typography>
            </div>
            <div className="movie-detail-info-right">
                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">{uiConstantsTR.MOVIE_DETAIL_PAGE.GENRE_LABEL}</Typography>
                <Typography color="text.primary">{movie.genre}</Typography>
            </div>
        </div>

        <div className="movie-detail-info-row">
            <div className="movie-detail-info-left">
                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">{uiConstantsTR.MOVIE_DETAIL_PAGE.REVENUE_LABEL}</Typography>
                <Typography color="text.primary">${movie.revenue} {uiConstantsTR.MOVIE_DETAIL_PAGE.MILLION_LABEL}</Typography>
            </div>
            <div className="movie-detail-info-right">
                <Typography variant="body1" color="text.secondary" className="movie-detail-info-label">{uiConstantsTR.MOVIE_DETAIL_PAGE.RUNTIME_LABEL}</Typography>
                <Typography color="text.primary">{movie.runtime} {uiConstantsTR.MOVIE_DETAIL_PAGE.MINUTE_LABEL}</Typography>
            </div>
        </div>
    </Paper>
);

export default MovieInfoCard;
