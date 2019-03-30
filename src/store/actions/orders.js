import * as actionType from './actionType';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id,orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionType.PURCHASE_BURGER_START
    };
};


export const asyncPurchaseBurger = (orderData,token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData) // async method
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            })
            .catch( error => {
                dispatch(purchaseBurgerFail(error));
            });
    }
};

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    };
};

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionType.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersInit = () => {
    return {
        type: actionType.FETCH_ORDERS_INIT
    };
};

export const fetchOrders = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrdersInit());
        // Firebase query using API
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json'+queryParams)
            .then(response => {
                const fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({
                        id: key,
                        ...response.data[key]
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};