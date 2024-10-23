import React from 'react';
import { ToastContainer } from 'react-toastify';
import '../styles/MainContainer.scss';
import 'react-toastify/dist/ReactToastify.css';

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="container">
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
