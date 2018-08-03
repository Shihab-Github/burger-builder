import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const addIngridient = (name) => {
    return {
        type: actionTypes.ADD_INGRIDIENT,
        ingridientName: name
    }
};

export const removeIngridient = (name) => {
    return {
        type: actionTypes.REMOVE_INGRIDIENT,
        ingridientName: name
    }
};

export const fetchIngridientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGRIDIENTS_FAILED
    }
};  

export const setIngridients = (ingridients) => {
    return {
        type: actionTypes.SET_INGRIDIENTS,
        ingridients: ingridients
    }
};

export const buildingBurger = () => {
    return {
        type: actionTypes.ON_BUILDING_BURGER
    }
};  

export const initIngridients = () => {
    return (dispatch) => {
        axios.get('https://react-my-burger-33e2e.firebaseio.com/ingridients.json').then((response) => {
            dispatch(setIngridients(response.data));
        }).catch((err) => {
            console.error(err);
            dispatch(fetchIngridientsFailed());
        });
    }
};