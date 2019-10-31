import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null // To manage error
        }

        componentWillMount () {
            // WillMount, instead of DidMount so it can run before the child components
            this.reqInterceptor = axios.interceptors.request.use(req => {
                /* Whenever you send a request you've cleared the error */
                this.setState({error: null});
                return req; //Required
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                // res => res returns the response
                // Whenever you get an error back from a response, you set the error on the state
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        /* Handler to remove the error condition with */
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </React.Fragment>
            );
        }
    }
}

export default withErrorHandler;

/* BurgerBuilder.js has been wrapped in withErrorHandler component */