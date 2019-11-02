import * as actionTypes from './actions';

/* Initial State */
const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};


const reducer = ( state = initialState, action ) => {
    /* state = initialState sets a default value for the state 
     * Used when state is undefined in the function  call 
     * Has to case over each of the action types
     * You would need an action for each of the handlers that updates the state 
     * e.g addIngredient and removeIngredient
     */

    switch ( action.type ) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state, // Copy the old state
                ingredients: {
                    //Copy the old ingredients
                    // the ...state only shallow copies the ingredients object inside state 
                    ...state.ingredients, 
                    // action should provide ingredient name in the payload
                    // [action.ingredientName] will update the value of the action.ingredientName
                    // with the new values of state.ingredients[action.ingredientName] + 1
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return {
                // Same as Add, with + replaced by -
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
};

export default reducer;