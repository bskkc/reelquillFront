// src/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import '../../styles/LoginPage.scss';
import uiConstantsTR from '../../constants/uiConstantsTR';
import TextFieldView from '../common/TextFieldView';
import ButtonView from '../common/ButtonView';
import { UserController } from '../../controllers/UserController';
import { RegisterRequest } from '../../models/registerRequest';

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState<RegisterRequest>({
        username: '',
        email: '',
        password: '',
    });

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    const onClickRegister = () => {
        if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
            alert('Geçersiz e-posta adresi!');
            return;
        }
        UserController.createUser(userInfo);
        navigate('/home');
    };
    

    return (
        <div className="login-page">
            <Grid justifyContent="center" container spacing={2}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper className="login-form">
                        <TextFieldView
                            fullWidth={true}
                            label={uiConstantsTR.REGISTER_PAGE.USERNAME_LABEL}
                            name="username" 
                            value={userInfo.username}
                            onChange={onChangeHandler} 
                        />
                        <TextFieldView
                            fullWidth={true}
                            label={uiConstantsTR.REGISTER_PAGE.MAIL_ADDRESS_LABEL}
                            name="email"
                            value={userInfo.email}
                            onChange={onChangeHandler} 
                        />
                        <TextFieldView
                            fullWidth={true}
                            label={uiConstantsTR.REGISTER_PAGE.PASSWORD_LABEL}
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={onChangeHandler} 
                        />
                        <ButtonView
                            label={uiConstantsTR.REGISTER_PAGE.LOGIN_LABEL}
                            onClickCallback={onClickRegister}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default RegisterPage;