import React from 'react';
import '../styles/MainContainer.scss';
import { CircularProgress, circularProgressClasses } from '@mui/material';

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: '#1a90ff',
                    animationDuration: '550ms',
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
            />
        </div>
    );
};

export default Loading;
