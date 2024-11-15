import { Box, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<string>('');

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetch('https://wttr.in/Ankara?format=%C+%t');
      const data = await response.text();
      setWeatherData(data);
    };

    fetchWeather();
  }, []);

  return (
    <Paper sx={{ p: 2, m: 2 }}>
      <Typography variant="h6" color="text.primary">Ankara</Typography>
      <Typography color="text.secondary">{weatherData}</Typography>
    </Paper>
  );
};

export default WeatherCard;
