import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    blocking: false
};

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        blocking: true
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
        blocking: false
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        blocking: false
    };
};

const logOut = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state, action);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actionTypes.AUTH_FAIL:
            return authFail(state, action);
        case actionTypes.LOG_OUT:
            return logOut(state, action);
        default:
            return state;
    }
};

export default authReducer;