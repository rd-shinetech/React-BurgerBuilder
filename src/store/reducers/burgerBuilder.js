import * as actionType from '../actions/actionType';
import { updateObject } from "../../shared/utility";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
    building: false
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const burgerBuilder = (state = initialState, action) => {
    let localState;

    switch (action.type) {
        case actionType.ADD_INGREDIENT:
            localState = updateObject(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] + 1 // That is amazing way to change property value in an JS object
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building: true
            });
            break;
        case actionType.REMOVE_INGREDIENT:
            localState = updateObject(state, {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName] - 1 // That is amazing way to change property value in an JS object
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building: true
            });
            break;
        case actionType.SET_INGREDIENT:
            localState = updateObject(state, {
                ingredients: action.ingredients,
                totalPrice: 4,
                error: false,
                building: false
            });
            break;
        case actionType.FETCH_INGREDIENT_ERROR:
            localState = updateObject(state,{error: true});
            break;
        default:
            return state;
    }

    return localState;
};

export default burgerBuilder;