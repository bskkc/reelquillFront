import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

interface CardViewProps<T> {
    cardData: T[];
    isClickable?: boolean;
    handleSelectItem?: (item: T) => void;
}

const CardView = <T,>({ cardData, isClickable = false, handleSelectItem }: CardViewProps<T>) => {
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {cardData.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <Card
                            onClick={() => isClickable && handleSelectItem && handleSelectItem(card)}
                            sx={{
                                cursor: isClickable ? 'pointer' : 'default',
                                height: '150px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1, paddingBottom: '16px' }}>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: 'vertical',
                                    }}
                                >
                                    {(card as any).title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        height: '60px',
                                    }}
                                >
                                    {(card as any).description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default CardView;
