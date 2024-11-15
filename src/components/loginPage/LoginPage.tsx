import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import '../../styles/LoginPage.scss';
import uiConstantsTR from '../../constants/uiConstantsTR';
import TextFieldView from '../common/TextFieldView';
import ButtonView from '../common/ButtonView';
import { UserController } from '../../controllers/UserController';
import { LoginRequest } from '../../models/loginRequest';
import { useDispatch } from 'react-redux';
import userActions from '../../actions/userActions';

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState<LoginRequest>({
        email: '',
        password: '',
    });

    useEffect(() => {
        setUserInfo({
            email: '',
            password: '',
        });
        dispatch(userActions.isAuthenticated(false));
    }, []);

    const onClickLogin = () => {
        UserController.login(userInfo, dispatch)
            .then((response) => {
                navigate('/home');
            })
            .catch((error) => {
                console.error(error);
                alert('Giriş başarısız!');
            });
    };

    const onClickRegister = () => {
        navigate('/register');
    };

    const onChangeCallback = (type: keyof LoginRequest, e: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo({
            ...userInfo,
            [type]: e.target.value,
        });
    };

    return (
        <div className="login-page">
            <Grid justifyContent="center" container spacing={2}>
                <Grid item xs={12} sm={8} md={6} lg={4}>
                    <Paper className="login-form">
                        <TextFieldView
                            fullWidth={true}
                            label={uiConstantsTR.LOGIN_PAGE.MAIL_ADDRESS_LABEL}
                            name="mailAddress"
                            value={userInfo.email}
                            onChange={(e) => onChangeCallback('email', e)}
                        />
                        <TextFieldView
                            fullWidth={true}
                            label={uiConstantsTR.LOGIN_PAGE.PASSWORD_LABEL}
                            type="password"
                            name="password"
                            value={userInfo.password} 
                            onChange={(e) => onChangeCallback('password', e)}
                        />
                        <ButtonView
                            label={uiConstantsTR.LOGIN_PAGE.LOGIN_LABEL}
                            onClickCallback={onClickLogin}
                        />
                        <span
                            onClick={onClickRegister}
                            className='register-text'
                        >
                            {uiConstantsTR.LOGIN_PAGE.REGISTER_LABEL}
                        </span>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginPage;
