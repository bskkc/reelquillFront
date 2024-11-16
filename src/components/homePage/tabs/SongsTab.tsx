import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player';
import '../../../styles/HomePage.scss';
import { SongController } from '../../../controllers/SongController';
import SongCardView from '../../common/SongCardView';
import uiConstantsTR from '../../../constants/uiConstantsTR';
import PaginationView from '../../common/PaginationView';
import { GetSongResponse } from '../../../models/getSongResponse';

const SongsTab: React.FC = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state: any) => state.song.data)  as GetSongResponse[];
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState<string>('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    SongController.searchWithSong('rihanna', dispatch);
  }, []);

  const handlePlay = (id: string) => {
    if (currentSongId === id && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentSongId(id);
      setIsPlaying(true);
      setCurrentSongIndex(songs.findIndex((song) => song.id === id));
    }
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
    setCurrentSongId(songs[currentSongIndex]?.id);
    setIsPlaying(true);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    setCurrentSongId(songs[currentSongIndex]?.id);
    setIsPlaying(true);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const currentSongDownloadUrl =
    songs[currentSongIndex]?.downloadUrls && songs[currentSongIndex].downloadUrls[3]?.url;

  return (
    <div className="d-flex align-items-center">
      {songs && songs.length > 0 ? (
        <div>
          <SongCardView
            songs={songs}
            currentIndex={currentSongIndex}
            onPlay={handlePlay}
            onPrevious={handlePrevious}
            onNext={handleNext}
            isPlaying={isPlaying}
            currentSongId={currentSongId}
          />
          <div className='m-3'>
            <PaginationView
              count={Math.ceil(songs.length / itemsPerPage)}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </div>
          {isPlaying ?
            <ReactPlayer
              url={currentSongDownloadUrl}
              playing={isPlaying}
              controls={true}
              width="100%"
              height="50px"
              config={{
                file: {
                  forceAudio: true,
                },
              }}
            />
            : <div />}
        </div>
      ) : (
        <span>{uiConstantsTR.USER_MESSAGES.NO_SONGS}</span>
      )}
    </div>
  );
};

export default SongsTab;
