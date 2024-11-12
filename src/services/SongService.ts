import axios from 'axios';

const API_URL = 'https://saavn.dev/api/search';

const searchWithArtist = (artistName: string, callback: (response: any[] | null) => void): void => {
    axios.get<{ success: boolean, data: { results: any[] } }>(`${API_URL}/artists?query=${artistName}`)
        .then(response => {
            callback(response.data.data.results);
        })
        .catch(error => {
            console.error('Error fetching song', error);
            callback(null);
        });
};

const searchWithSong = (songName: string, callback: (response: any[] | null) => void): void => {
    axios.get<{ success: boolean, data: { results: any[] } }>(`${API_URL}/songs?query=${songName}`)
        .then(response => callback(response.data.data.results))
        .catch(error => {
            console.error('Error fetching song', error);
            callback(null);
        });
};

export const SongService = { searchWithArtist, searchWithSong };
