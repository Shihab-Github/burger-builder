import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import ContactData from './ContactData/ContactData';
import Aux from '../../hoc/Aux';
class Checkout extends Component {
    state = {
        ingridients: null
    };
    
    componentDidMount() { 
        if(!this.props.ings){
            this.props.history.push("/");
        }
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        return (
            <Aux>
                <CheckoutSummary ingridients={this.props.ings}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
                {/* <Route path={this.props.match.path + '/contact-data'} render={(props) => (<ContactData ingridients={this.state.ingridients} {...props} />)}  /> */}
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}  />
            </Aux>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingridients, 
        price: state.burgerBuilder.totalPrice 
    }
};

export default connect(mapStateToProps)(Checkout);