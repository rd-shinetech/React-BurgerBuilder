import * as actionType from './actionType';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {type: actionType.ADD_INGREDIENT,ingredientName: ingredientName};
};

export const removeIngredient = (ingredientName) => {
    return {type: actionType.REMOVE_INGREDIENT,ingredientName: ingredientName};
};

export const setIngredients = (ingredients) => {
    return {
        type: actionType.SET_INGREDIENT,
        ingredients: ingredients
    }
};

export const fetchIngredientError = () => {
    return {
        type: actionType.FETCH_INGREDIENT_ERROR
    };
};

export const asyncFetchIngredient = () => {
    return dispatch => {
        axios.get('/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch( e => {
                dispatch(fetchIngredientError());
            });
    };
};