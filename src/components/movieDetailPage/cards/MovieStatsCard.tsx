import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import '../../../styles/MovieDetail.scss';
import RateView from '../../common/RateView';
import uiConstantsTR from '../../../constants/uiConstantsTR';

interface MovieStatsCardProps {
    movie: any;
    selectedMovieRate: number;
    isRateSelectDisabled: boolean;
    onRateMovie: (value: number) => void;
}

const MovieStatsCard: React.FC<MovieStatsCardProps> = ({ movie, selectedMovieRate, isRateSelectDisabled, onRateMovie }) => (
    <Paper className="w-100 p-3">
        <Typography color="text.secondary" className="movie-detail-info-label">{movie.votes} {uiConstantsTR.MOVIE_DETAIL_PAGE.VOTES_LABEL}</Typography>
        <RateView
            label={movie.rating}
            defaultValue={0}
            value={selectedMovieRate}
            disabled={isRateSelectDisabled}
            onChange={onRateMovie}
        />
    </Paper>
);

export default MovieStatsCard;
