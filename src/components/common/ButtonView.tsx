import React from 'react';
import { Button } from '@mui/material';

interface ButtonViewProps {
    label: string;
    color?: 'primary' | 'secondary' | 'error';
    variant?: 'contained' | 'outlined';
    fullWidth?: boolean;
    onClickCallback?: () => void;
    className?: string;
    isDisabled?: boolean;
}

const ButtonView: React.FC<ButtonViewProps> = ({
    label,
    color = 'primary',
    variant = 'contained',
    fullWidth,
    onClickCallback,
    className = "",
    isDisabled = false
}) => {
    return (
        <Button
            className={className}
            fullWidth={fullWidth}
            color={color}
            variant={variant}
            onClick={onClickCallback}
            disabled={isDisabled}
        >
            {label}
        </Button>
    );
};

export default ButtonView;
