import React, { useEffect } from 'react';
import TabView from '../common/TabView';
import AllQuillsTab from './tabs/AllQuillsTab';
import FriendsQuillsTab from './tabs/FriendsQuillsTab';
import { useDispatch } from 'react-redux';
import uiActions from '../../actions/uiActions';
import AddQuillModal from './modals/AddQuillModal';
import Inbox from '../common/Inbox';
import Messaging from '../common/Messaging';
import MoviesTab from './tabs/MoviesTab';
import uiConstantsTR from '../../constants/uiConstantsTR';
import BooksTab from './tabs/BooksTab';
import SongsTab from './tabs/SongsTab';
import WeatherCard from './cards/WeatherCard';
import CryptoCurrencyCard from './cards/CryptoCurrencyCard';

const HomePage: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(uiActions.messageDrawerStatusChanged(false));
        dispatch(uiActions.messageDetailDrawerStatusChanged(false));
    }, []);

    const tabs = [
        { label: uiConstantsTR.TAB_LABELS.TRENDS, component: <AllQuillsTab /> },
        { label: uiConstantsTR.TAB_LABELS.FRIENDS, component: <FriendsQuillsTab /> },
        { label: uiConstantsTR.TAB_LABELS.MOVIES, component: <MoviesTab /> },
        { label: uiConstantsTR.TAB_LABELS.BOOKS, component: <BooksTab /> },
        { label: uiConstantsTR.TAB_LABELS.SONGS, component: <SongsTab /> },
    ];

    const onClickAddQuill = () => {
        dispatch(uiActions.addQuillModalStatusChanged(true));
    }

    return (
        <div className='d-flex'>
            <div style={{ width: '80%' }}>
                <TabView tabs={tabs} onClickAddQuill={onClickAddQuill} />
            </div>

            <div className='home-page-right-container '>
                    <WeatherCard />
                    <CryptoCurrencyCard />
            </div>

            <AddQuillModal />
        </div>
    );

};

export default HomePage;
