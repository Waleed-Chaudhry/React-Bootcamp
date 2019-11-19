import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/* Sync Actions i.e. actions that don't need an async axios call to update the state */

export const addIngredient = ( name ) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient = ( name ) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

/* Async Handlers */

// The set and failed is standard pattern for async handlers
// Both of these setIngredients and fetchIngredientsFailed is called by the async initIngredients action
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
    return dispatch => {  // Available through Redux Thunk
        axios.get('https://burger-buider.firebaseio.com/ingedients.json')
            .then( response => {
               dispatch(setIngredients(response.data));
            } )
            // Adjust our error state in case it fails
            .catch( error => {
                dispatch(fetchIngredientsFailed());
            } );
    };
};