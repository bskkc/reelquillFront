export interface AlbumDTO {
    id: string;
    name: string;
    url: string;
}

export interface ArtistsDTO {
    primary: string[];
    featured: string[];
    all: string[];
}

export interface DownloadUrlDTO {
    url: string;
}

export interface GetSongResponse {
    id: string;
    name: string;
    url: string;
    album: AlbumDTO;
    artists: ArtistsDTO;
    copyright: string;
    downloadUrls: DownloadUrlDTO[];
    duration: number;
    explicitContent: boolean;
    hasLyrics: boolean;
    image: string[];
    label: string;
    language: string;
    year: string;
    type: string;
    playCount: number;
}
