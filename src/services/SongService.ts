import axios from 'axios';
import { GetSongResponse } from '../models/getSongResponse';

const API_URL = 'http://localhost:8080/api/song';

const searchWithArtist = (artistName: string, callback: (response: any[] | null) => void): void => {
    axios.get<GetSongResponse[]>(`${API_URL}/searchSongsWithArtist?query=${artistName}`)
        .then(response => {
            callback(response.data);
        })
        .catch(error => {
            console.error('Error fetching song', error);
            callback(null);
        });
};

const searchWithSong = (songName: string, callback: (response: any[] | null) => void): void => {
    axios.get<GetSongResponse[]>(`${API_URL}/searchSongsWithName?query=${songName}`)
        .then(response => callback(response.data))
        .catch(error => {
            console.error('Error fetching song', error);
            callback(null);
        });
};

export const SongService = { searchWithArtist, searchWithSong };
