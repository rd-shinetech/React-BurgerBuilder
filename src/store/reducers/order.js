import * as actionType from '../actions/actionType';
import { updateObject } from "../../shared/utility";

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const reducer = (state = initialState,action) => {
    let localState;

    switch (action.type) {
        case actionType.PURCHASE_BURGER_START:
            localState = updateObject(state,{loading: true});
            break;
        case actionType.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.id
            };
            localState = updateObject(state,{
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            });
            break;
        case actionType.PURCHASE_BURGER_FAIL:
            localState = updateObject(state,{loading: false});
            break;
        case actionType.PURCHASE_INIT:
            localState = updateObject(state,{purchased: false});
            break;
        case actionType.FETCH_ORDERS_INIT:
            localState = updateObject(state,{loading: true});
            break;
        case actionType.FETCH_ORDERS_SUCCESS:
            localState = updateObject(state,{orders: action.orders,loading: false});
            break;
        case actionType.FETCH_ORDERS_FAIL:
            localState = updateObject(state,{loading: false});
            break;
        default:
            return state;
    }

    return localState;
};

export default reducer;
