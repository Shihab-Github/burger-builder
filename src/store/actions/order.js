import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const startPurchasingBurger = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(startPurchasingBurger());
        axios.post(`orders.json?auth=${token}`, orderData).then((response) => {
            dispatch(purchaseBurgerSuccess(response.data, orderData));
        }).catch((error) => {
            console.error("Something went wrong. ", error);
            dispatch(purchaseBurgerFail(error));
        });
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
};

export const fetchOrders = (token) => {
    return (dispatch) => {
        dispatch(fetchOrdersStart());
        axios.get('orders.json?auth=' + token).then((response) => {
            let items = [];
            for (let key in response.data) {
                items.push(response.data[key].ingridients);
            }
            dispatch(fetchOrdersSuccess(items));
        }).catch((err) => {
            dispatch(fetchOrdersFail(err));
        }); 
    }
};

export const initPurchase = () => {
    return {
        type: actionTypes.INIT_PURCHASE
    }
};