import { createAction } from '@reduxjs/toolkit';
import actionEnum from '../constants/actionEnum';
import { GetBookResponse } from '../models/getBookResponse';

export const bookDataChanged = createAction<GetBookResponse[]>(actionEnum.BOOK_DATA_CHANGED);

const bookActions = {
    bookDataChanged,
};

export default bookActions;
