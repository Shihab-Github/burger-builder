import * as actionTypes from './actionsTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: authData.idToken,
        userId: authData.localId,
        
    };
};

export const authError = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.LOG_OUT
    }
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logOut());
        }, expirationTime * 1000);
    }
};  

export const auth = (email, password, isLogin) => {
    return (dispatch) => {
        dispatch(authStart());
        let authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCbwrh1yCNSOBNXwRwA-vRa8HTLbEzv8Bc';
        if(isLogin){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCbwrh1yCNSOBNXwRwA-vRa8HTLbEzv8Bc'
        }
        axios.post(url, authData)
        .then((response) => {
            var expirationDate = new Date( new Date().getTime() + response.data.expiresIn * 1000 );
            localStorage.setItem('token', response.data.idToken);
            localStorage.setItem('expirationTime', expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch((error) => {
            console.error(error);
            dispatch(authError(error.response.data.error));
        });
    }
};

export const checkAuthState = () => {
    return (dispatch) => {
        let expirationTime = null;
        let userId = null;
        let token = localStorage.getItem('token');
        if(token){
            expirationTime = (new Date( localStorage.getItem('expirationTime') ).getTime() - new Date().getTime()) / 1000;
            userId = localStorage.getItem('userId');
            var authData = {
                idToken: token,
                localId: userId,
            };  
            dispatch(authSuccess(authData));
            dispatch(checkAuthTimeout(expirationTime));
        }else{
            dispatch(logOut());
        }
    };
};