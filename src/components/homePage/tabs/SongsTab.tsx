import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import '../../../styles/HomePage.scss';
import { SongController } from '../../../controllers/SongController';
import SongCardView from '../../common/SongCardView';

const SongsTab: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: any) => state.song.data);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string>('');

  useEffect(() => {
    SongController.searchWithSong('rihanna', dispatch);
  }, []);

  const handlePlay = (id: string) => {
    console.log(id)
    if (currentSongId === id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSongId(id);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
  };

  const currentSongDownloadUrl =
    songs[currentSongIndex]?.downloadUrl && songs[currentSongIndex].downloadUrl[3]?.url;

  return (
    <div className="tab-div">
      {songs && songs.length > 0 ? (
        <div className="tab-container">
          <SongCardView
            songs={songs}
            currentIndex={currentSongIndex}
            onPlay={handlePlay}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isPlaying={isPlaying}
            currentSongId={currentSongId}
          />
          {currentSongDownloadUrl && isPlaying && currentSongId === songs[currentSongIndex].id && (
            <ReactPlayer
              url={currentSongDownloadUrl}
              playing={isPlaying}
              controls={true}
              width="0"
              height="0"
              config={{
                file: {
                  forceAudio: true,
                },
              }}
            />
          )}
        </div>
      ) : (
        <p>No songs available.</p>
      )}
    </div>
  );
};

export default SongsTab;
