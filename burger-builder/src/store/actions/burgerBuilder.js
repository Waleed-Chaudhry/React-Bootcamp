/* Use the actions to call the actions */
/* One per container */
// Action just sets up the function call and the body, reducer implements it

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    console.log('remove ing action')
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredients = ( my_ingredients ) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        // ingredients is the name of the var we're passing to the reducer
        // my_ingredients is the argument passed by the initIngredients function
            // could have called it anything
        ingredients: my_ingredients
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    };
};

export const initIngredients = () => {
    /* Available through Redux Thunk */
    return dispatch => {
        axios.get('https://burger-buider.firebaseio.com/ingedients.json')
            .then( response => {
                // Defined in this file
               dispatch(setIngredients(response.data));
            } )
            // Adjust our error state in case it fails
            .catch( error => {
                // Defined in this file
                dispatch(fetchIngredientsFailed());
            } );
    };
};