import React from 'react';
import { IconButton } from '@mui/material';

interface IconButtonViewProps {
    color?: 'inherit';
    size?: 'large';
    onClickCallback?: () => void;
    children?: React.ReactNode;
    className?: string;
}

const IconButtonView: React.FC<IconButtonViewProps> = ({
    color = 'inherit',
    size = 'large',
    onClickCallback,
    children,
    className = "",
}) => {
    return (
        <IconButton
            className={className}
            color={color}
            onClick={onClickCallback}
        >
            {children}
        </IconButton>
    );
};

export default IconButtonView;
