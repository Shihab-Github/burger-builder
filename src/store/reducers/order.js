import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    orders: [],
    blocking: false,
    purchased: false
};

const purchaseBurgerSuccess = (state, action) => {
    return {
        ...state,
        blocking: false,
        purchased: true
    };  
};

const purchaseBurgerFail = (state,action) => {
    return {
        ...state,
        blocking: false,
        purchased: false
    };
};

const purchaseBurgerStart = (state,action) => {
    return {
        ...state,
        blocking: true
    };
};

const initPurchase = (state,action) => {
    return{
        ...state,
        purchased: false
    };
};

const fetchOrdersStart = (state,action) => {
    return {
        ...state,
        orders: [],
        blocking: true
    };
};

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        blocking: false
    };
};

const fetchOrderFail = (state,action) => {
    return {
        ...state,
        blocking: false
    };
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state,action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state,action);
        case actionTypes.PURCHASE_BURGER_START: 
            return purchaseBurgerStart(state,action);
        case actionTypes.INIT_PURCHASE:
            return initPurchase(state,action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state,action);
        case actionTypes.FETCH_ORDERS_SUCCESS: 
            return fetchOrdersSuccess(state,action);
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrderFail(state,action);
        default:
            return state;
    }
};

export default orderReducer;