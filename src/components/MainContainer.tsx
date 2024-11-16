import React from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/MainContainer.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const isMainContentInProgress = useSelector((state: any) => state.ui.isMainContentInProgress);

    return (
        <div className="container m-0 p-0">
            {isMainContentInProgress && <Loading />}
            {children}
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                draggableDirection="y"
                pauseOnFocusLoss
                theme="colored"
            />
        </div>
    );
};

export default MainContainer;
