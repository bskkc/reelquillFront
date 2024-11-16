import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/home');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                backgroundColor: '#f4f6f8',
                color: '#333',
            }}
        >
            <ErrorOutlineIcon sx={{ fontSize: 80, color: '#ff4040', marginBottom: 2 }} />
            <Typography variant="h4" sx={{ fontWeight: 600, marginBottom: 2 }}>
                Oops! Sayfa Bulunamadı.
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: 3 }}>
                Aradığınız sayfa mevcut değil. Lütfen ana sayfaya dönün.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoHome}
                sx={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#1976d2',
                    '&:hover': {
                        backgroundColor: '#1565c0',
                    },
                }}
            >
                Ana Sayfaya Git
            </Button>
        </Box>
    );
};

export default NotFoundPage;
