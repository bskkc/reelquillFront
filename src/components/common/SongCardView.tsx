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
import { Grid } from '@mui/material';

interface Song {
  id: string;
  name: string;
  role: string;
  image: { url: string }[];
}

interface SongCardViewProps {
  songs: Song[];
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
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Grid container spacing={2}>
          {songs.map((song, index) => (
            <Grid item xs={12} sm={6} md={4} key={song.id}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5">
                  {song.name} 
                </Typography>
                <Typography
                  variant="subtitle1"
                  component="div"
                  sx={{ color: 'text.secondary' }}
                >
                  {song.role}
                </Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <IconButton aria-label="previous" onClick={onPrevious}>
                  {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                </IconButton>
                <IconButton
                  aria-label="play/pause"
                  onClick={() => onPlay(song.id)} 
                >
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
                sx={{ width: 151 }}
                image={song.image && song.image.length > 0 ? song.image[0].url : 'fallback-image-url'}
                alt={`${song.name} album cover`}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
};

export default SongCardView;
