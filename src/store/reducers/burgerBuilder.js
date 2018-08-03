import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    ingridients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGRIDIENT_PRICES = {
    salad: 1,
    bacon: 1,
    meat: 3,
    cheese: 2
};

const addIngridient = (state, action) => {
    return {
        ...state,
        ingridients: {
            ...state.ingridients,
            [action.ingridientName]: state.ingridients[action.ingridientName] + 1
        },
        building: false,
        totalPrice: state.totalPrice + INGRIDIENT_PRICES[action.ingridientName]
    };
};

const removeIngridient = (state, action) => {
    return {
        ...state,
        ingridients: {
            ...state.ingridients,
            [action.ingridientName]: state.ingridients[action.ingridientName] - 1
        },
        building: false,
        totalPrice: state.totalPrice - INGRIDIENT_PRICES[action.ingridientName]
    };
};

const setIngridient = (state, action) => {
    if(!action.ingridients){
        action.ingridients = {};
    }
    return {
        ...state,
        ingridients: action.ingridients,
        building: false,
        error: false
    }
};

const fetchIngridientFailed = (state, action) => {
    return {
        ...state,
        error: true
    }
};

const buildingBurger = (state, action) => {
    return {
        ...state,
        building: true
    };
};  

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGRIDIENT:
            return addIngridient(state,action);
        case actionTypes.REMOVE_INGRIDIENT:
            return removeIngridient(state,action);
        case actionTypes.SET_INGRIDIENTS: 
            return setIngridient(state,action);
        case actionTypes.FETCH_INGRIDIENTS_FAILED: 
            return fetchIngridientFailed(state,action);
        case actionTypes.ON_BUILDING_BURGER:
            return buildingBurger(state,action); 
        default:
            return state;
    }
};

export default reducer;