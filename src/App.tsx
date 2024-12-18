import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/loginPage/LoginPage';
import RegisterPage from './components/registerPage/RegisterPage';
import HomePage from './components/homePage/HomePage';
import MainContainer from './components/MainContainer';
import ProfilePage from './components/profilePage/ProfilePage';
import MovieDetailPage from './components/movieDetailPage/MovieDetailPage';
import UserProfilePage from './components/userProfilePage/UserProfilePage';
import { useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';
import { applicationEnum } from './constants/applicationEnum';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HeaderView } from './components/common/HeaderView';
import Messaging from './components/common/Messaging';
import Inbox from './components/common/Inbox';
import NotificationList from './components/common/NotificationList';

function App() {
  const currentTheme = useSelector((state: any) => state.ui.theme);
  const isAuthenticated = useSelector((state: any) => state.userInfo.isAuthenticated);

  return (
    <Router>
      <ThemeProvider theme={currentTheme === applicationEnum.THEME_ENUM.DARK ? darkTheme : lightTheme}>
        <CssBaseline />
        <MainContainer>
          {isAuthenticated ?
            <HeaderView />
            : ""}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/movieDetail" element={<MovieDetailPage />} />
            <Route path="/userProfile" element={<UserProfilePage />} />
          </Routes>
          <Inbox />
          <Messaging />
          <NotificationList />
        </MainContainer>
      </ThemeProvider>
    </Router>
  );
}

export default App;
