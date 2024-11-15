import React from 'react';
import '../styles/MainContainer.scss';
import { CircularProgress, circularProgressClasses } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Loading: React.FC = () => {
    const theme = useTheme();

    return (
        <div className="loading-container">
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: theme.palette.primary.main,
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
