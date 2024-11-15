import React, { useState } from 'react';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface TextFieldViewProps {
    label: string;
    margin?: 'none' | 'dense' | 'normal';
    variant?: 'filled' | 'outlined' | 'standard';
    fullWidth?: boolean;
    type?: 'password' | 'text';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    className?: string
}

const TextFieldView: React.FC<TextFieldViewProps> = ({
    label,
    margin = 'normal',
    variant = 'standard',
    fullWidth,
    type = 'text',
    value,
    onChange,
    name,
    className = ''
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <TextField
            className={className}
            fullWidth={fullWidth}
            label={label}
            margin={margin}
            variant={variant}
            type={type === 'password' && showPassword ? 'text' : type}
            value={value}
            onChange={onChange}
            name={name}
            InputProps={{
                endAdornment: type === 'password' ? (
                    <InputAdornment position="end">
                        <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ) : null,
            }}
        />
    );
};

export default TextFieldView;
