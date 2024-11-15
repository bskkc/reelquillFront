import { Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import uiConstantsTR from '../../../constants/uiConstantsTR';

const CryptoCurrencyCard: React.FC = () => {
    const [cryptoData, setCryptoData] = useState<any>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchCryptoData = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd,eur');
                const data = await response.json();

                setCryptoData(data);
            } catch (err) {
                setError('Error fetching data');
            }
        };

        fetchCryptoData();
    }, []);

    return (
        <Paper sx={{ p: 2, m: 2 }}>
            <Typography variant="h6" color="text.primary">{uiConstantsTR.HOME_PAGE.CRYPTOCURRENCY_PRICES}</Typography>
            {error ? (
                <Typography color="text.secondary">{error}</Typography>
            ) : (
                <div>
                    <Typography color="text.secondary">{uiConstantsTR.HOME_PAGE.BITCOIN_LABEL}{cryptoData?.bitcoin?.usd}</Typography>
                    <Typography color="text.secondary">{uiConstantsTR.HOME_PAGE.ETHEREUM_LABEL}{cryptoData?.ethereum?.usd}</Typography>
                </div>
            )}
        </Paper>
    );
};

export default CryptoCurrencyCard;
