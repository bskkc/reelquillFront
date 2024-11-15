import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GeneralInfoController } from '../../../controllers/GeneralInfoController';
import CardView from '../../common/CardView';
import { GeneralInfoResponse } from '../../../models/generalInfoResponse';
import PaginationView from '../../common/PaginationView';
import '../../../styles/HomePage.scss';
import generalInfoActions from '../../../actions/generalInfoActions';
import uiConstantsTR from '../../../constants/uiConstantsTR';

const MoviesTab: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const generalInfo = useSelector((state: any) => state.generalInfo.data) as GeneralInfoResponse[];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 16;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = generalInfo.length > 0 ? generalInfo.slice(indexOfFirstItem, indexOfLastItem) : [];

    useEffect(() => {
        GeneralInfoController.getAllGeneralInfo(dispatch);
    }, []);

    const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        setCurrentPage(page);
    };

    const onSelectItem = (item: GeneralInfoResponse) => {
        dispatch(generalInfoActions.detailedGeneralInfoChanged(item));
        navigate('/movieDetail');
    };

    return (
        <div className="d-flex align-items-center">
            {generalInfo && generalInfo.length > 0 ? (
                <div>
                    <CardView cardData={currentItems} isClickable={true} handleSelectItem={onSelectItem} />
                    <PaginationView
                        count={Math.ceil(generalInfo.length / itemsPerPage)}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </div>
            ) : (
                <span>{uiConstantsTR.USER_MESSAGES.NO_MOVIES}</span>
            )}
        </div>
    );
};

export default MoviesTab;
