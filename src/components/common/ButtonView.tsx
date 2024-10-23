import React from 'react';
import { Button } from '@mui/material';

interface ButtonViewProps {
    label: string;
    color?: 'primary';
    variant?: 'contained';
    fullWidth?: boolean;
    onClickCallback?: () => void;
}

const ButtonView: React.FC<ButtonViewProps> = ({ label, color, variant = 'contained', fullWidth, onClickCallback }) => {
    return (
        <Button
            fullWidth={fullWidth}
            color={color}
            variant={variant}
            onClick={onClickCallback}
        >
            {label}
        </Button>
    );
};

export default ButtonView;
