import React, { useEffect, useState } from 'react';
import { Box, TextField, Typography, Button, Divider } from '@mui/material';
import { User } from '../../models/user';
import { UserController } from '../../controllers/UserController';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePage: React.FC = () => {
    const dispatch = useDispatch();
    const userInfo = useSelector((state: any) => state.userInfo);
    
    const [profile, setProfile] = useState<User>({
        id: 1,
        username: 'your_username',
        email: 'your_email@example.com',
        password: 'password123',
        creationDate: '2022-01-01',
        updateDate: '2022-01-01'
    });

    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        username: profile.username,
        email: profile.email,
        password: ''
    });

    useEffect(() => {
        if (userInfo.data) {
            setProfile(userInfo.data);
            setFormData({
                username: userInfo.data.username,
                email: userInfo.data.email,
                password: userInfo.data.password
            });
        }
    }, [userInfo]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        UserController.updateUser({ ...formData, id: userInfo.data.id }, dispatch);
        setProfile({ ...profile, ...formData, updateDate: new Date().toISOString() });
        setEditMode(false);
    };

    return (
        <Box sx={{ width: '50%', margin: 'auto', mt: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>Profile</Typography>
            <Divider sx={{ my: 2 }} />

            <Typography variant="body1" color="text.secondary">Kullanıcı ID: {profile.id}</Typography>
            <Typography variant="body1" color="text.secondary">Oluşturulma Tarihi: {profile.creationDate}</Typography>
            <Typography variant="body1" color="text.secondary">Son Güncellenme Tarihi: {profile.updateDate}</Typography>

            <Divider sx={{ my: 2 }} />

            {editMode ? (
                <>
                    <TextField
                        label="Kullanıcı Adı"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Yeni Şifre"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        fullWidth
                        margin="normal"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button variant="contained" onClick={handleSave}>Kaydet</Button>
                        <Button variant="outlined" color="error" onClick={() => setEditMode(false)}>İptal</Button>
                    </Box>
                </>
            ) : (
                <>
                    <Typography variant="body1" color="text.secondary">Kullanıcı Adı: {profile.username}</Typography>
                    <Typography variant="body1" color="text.secondary">Email: {profile.email}</Typography>
                    <Button variant="contained" onClick={() => setEditMode(true)} sx={{ mt: 2 }}>
                        Profili Düzenle
                    </Button>
                </>
            )}
        </Box>
    );
};

export default ProfilePage;
