// pages/api/users/logout.js
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const logoutUser = () => {
    localStorage.removeItem('authToken'); // إزالة التوكن من localStorage
    cookies.remove('authToken', { path: '/' });
    window.location.href = '/auth/signIn';
};

export  { logoutUser };
