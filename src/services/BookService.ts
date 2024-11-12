import axios from 'axios';
import { GetBookResponse } from '../models/getBookResponse';

const API_URL = 'http://localhost:8080/api/books';

const getAllBooks = (queryString: string, callback: (response: GetBookResponse[] | null) => void): void => {
    axios.get<GetBookResponse[]>(`${API_URL}/getBooks?query=${queryString}`)
        .then(response => callback(response.data))
        .catch(error => {
            console.error('Error fetching books', error);
            callback(null);
        });
};

export const BookService = { getAllBooks };