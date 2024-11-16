import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Grid, Paper } from '@mui/material';
import '../../styles/HomePage.scss';
import { GetSongResponse } from '../../models/getSongResponse';

interface SongCardViewProps {
  songs: GetSongResponse[];
  currentIndex: number;
  onPlay: (id: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  isPlaying: boolean;
  currentSongId: string;
}

const SongCardView: React.FC<SongCardViewProps> = ({
  songs,
  currentIndex,
  onPlay,
  onPrevious,
  onNext,
  isPlaying,
  currentSongId,
}) => {
  const theme = useTheme();

  return (
    <Box className="d-flex justify-content-center align-items-center">
      <Grid container spacing={3}>
        {songs.map((song, index) => (
          <Grid item xs={12} sm={6} md={4} key={song.id}>
            <Paper className="song-card">
              <Card className="song-card-content">
                <CardContent className="song-card-text">
                  <Typography component="div" variant="h5" className="song-title">
                    {song.name}
                  </Typography>
                </CardContent>
                <Box className="song-controls">
                  <IconButton aria-label="previous" onClick={onPrevious}>
                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                  </IconButton>
                  <IconButton aria-label="play/pause" onClick={() => onPlay(song.id)}>
                    {isPlaying && currentSongId === song.id ? (
                      <PauseIcon sx={{ height: 38, width: 38 }} />
                    ) : (
                      <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    )}
                  </IconButton>
                  <IconButton aria-label="next" onClick={onNext}>
                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                  </IconButton>
                </Box>
                <CardMedia
                  component="img"
                  className="song-image"
                  image={song.image && song.image.length > 0 ? song.image[0] : 'fallback-image-url'}
                  alt={`${song.name} album cover`}
                />
              </Card>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SongCardView;
