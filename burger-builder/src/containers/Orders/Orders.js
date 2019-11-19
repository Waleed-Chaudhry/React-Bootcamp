import React, { Component } from 'react';
import { connect } from 'react-redux'; // new import

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index'; // new import
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        // Note use of this.props to access the onFetchOrders method
        this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;
        // Note use of this.props to access orders and loading
        if ( !this.props.loading ) {
            orders = this.props.orders.map( order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ) )
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => {
    // state.orders.orders is the what we're getting from the reducer
    // And then storing it as orders inside this file
    // Within this file we'll use this.props.orders to refer to the orders object on the state
    return {
        // We're doing state.order.orders since we're using combined reducers
        // The order reducer is inside order object in index.js
        orders: state.order.orders,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch( actions.fetchOrders() )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( Orders, axios ) );