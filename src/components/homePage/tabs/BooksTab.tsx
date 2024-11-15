import React, { useEffect, useState } from 'react';
import '../../../styles/HomePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import CardView from '../../common/CardView';
import PaginationView from '../../common/PaginationView';
import { BookController } from '../../../controllers/BookController';
import { GetBookResponse } from '../../../models/getBookResponse';
import uiConstantsTR from '../../../constants/uiConstantsTR';

const BooksTab: React.FC = () => {
    const dispatch = useDispatch();
    const books = useSelector((state: any) => state.book.data) as GetBookResponse[];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = books.length > 0 ? books.slice(indexOfFirstItem, indexOfLastItem) : [];

    useEffect(() => {
        BookController.getAllBooks(" '' ", dispatch);
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const onSelectItem = (item: {}) => {
        console.log(item)
    };

    return (
        <div className="d-flex align-items-center">
            {books && books.length > 0 ? (
                <div>
                    <CardView cardData={currentItems} isClickable={true} handleSelectItem={onSelectItem} />
                    <PaginationView
                        count={Math.ceil(books.length / itemsPerPage)}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            ) : (
                <span>{uiConstantsTR.USER_MESSAGES.NO_BOOKS}</span>
            )}
        </div>
    );
};

export default BooksTab;
