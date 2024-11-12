import { toast } from 'react-toastify';
import { GetBookResponse } from '../models/getBookResponse';
import { BookService } from '../services/BookService';
import bookActions from '../actions/bookActions';

const getAllBooks = (queryString: string, dispatch: React.Dispatch<any>): Promise<GetBookResponse[]> => {
    return new Promise((resolve, reject) => {
        BookService.getAllBooks(queryString, (response) => {
            if (response) {
                dispatch(bookActions.bookDataChanged(response));
                resolve(response);
            } else {
                toast.error('Failed to fetch books.');
            }
        });
    });
};

export const BookController = { getAllBooks };