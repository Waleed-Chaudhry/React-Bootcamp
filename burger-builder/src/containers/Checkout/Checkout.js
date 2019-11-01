import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1
        },
        price: 0
    }

    componentWillMount () {
        const query = new URLSearchParams( this.props.location.search );
        console.log(query.entries())
        const ingredients = {};
        let price = 0;
        for ( let param of query.entries() ) {
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState( { ingredients: ingredients, totalPrice: price } );
    }

    checkoutCancelledHandler = () => {
        // Go to the previous page
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        // Go to a different route
        this.props.history.replace( '/checkout/contact-data' );
    }

    render () {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} 
                    />
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    // Pass whatever url you're on. Path would be /checkout
                    render={(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />)} 
                    // A way to pass the state to the Contact Data form
                    // Contact data can then call this.props.history.push('/') to get you back to the home page
                />
            </div>
        );
    }
}

export default Checkout;