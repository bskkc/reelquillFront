import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationViewProps {
    count: number;
    currentPage: number;
    variant?: 'outlined';
    color?: 'primary';
    handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationView: React.FC<PaginationViewProps> = ({ count, currentPage, variant = 'outlined', color = 'primary', handlePageChange }) => {
    return (
        <Pagination
            count={count}
            page={currentPage}
            variant={variant}
            color={color}
            onChange={handlePageChange}
        />
    );
};

export default PaginationView;
