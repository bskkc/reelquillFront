import React from 'react';
import { TextField } from '@mui/material';

interface TextFieldViewProps {
    label: string;
    margin?: 'none' | 'dense' | 'normal';
    variant?: 'filled' | 'outlined' | 'standard';
    fullWidth?: boolean;
    type?: 'password' | 'text';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
}

const TextFieldView: React.FC<TextFieldViewProps> = ({
    label,
    margin = 'normal',
    variant = 'outlined',
    fullWidth,
    type = 'text',
    value,
    onChange,
    name,
}) => {
    return (
        <TextField
            fullWidth={fullWidth}
            label={label}
            margin={margin}
            variant={variant}
            type={type}
            value={value}
            onChange={onChange}
            name={name}
        />
    );
};

export default TextFieldView;
