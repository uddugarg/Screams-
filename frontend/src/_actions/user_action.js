import axios from 'axios';
import {
    LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER,
} from './types';


export function registerUser(submit) {
    const request = axios.post('/api/user/register', submit)
        .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(submit) {
    const request = axios.post('/api/user/login', submit)
        .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/user/auth')
        .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logout() {
    const request = axios.get('/api/user/logout')
        .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}