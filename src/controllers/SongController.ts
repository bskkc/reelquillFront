// SongController.ts
import { toast } from 'react-toastify';
import uiConstantsTR from '../constants/uiConstantsTR';
import uiActions from '../actions/uiActions';
import { SongService } from '../services/SongService';
import songActions from '../actions/songActions';

const searchWithArtist = (artistName: string, dispatch: React.Dispatch<any>): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        SongService.searchWithArtist(artistName, (response) => {
            if (response) {
                dispatch(songActions.songDataChanged(response));
                resolve(response);
            } else {
                toast.error('Failed to fetch music.');
                reject('No response from the server.');
            }
        });
    });
};

const searchWithSong = (songName: string, dispatch: React.Dispatch<any>): Promise<any[]> => {
    return new Promise((resolve, reject) => {
        SongService.searchWithSong(songName, (response) => {
            if (response) {
                dispatch(songActions.songDataChanged(response));
                resolve(response);
            } else {
                toast.error('Failed to fetch music.');
            }
        });
    });
};

export const SongController = { searchWithArtist, searchWithSong };
