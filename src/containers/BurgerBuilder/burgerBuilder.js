import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { connect } from 'react-redux';
import Burger from '../../components/Burger/Burger';
import { Button, Modal } from 'react-bootstrap';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummry from '../../components/Burger/OrderSummary/OrderSummary';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import * as burgerBuilderActions from '../../store/actions/exportedActions';


class BurgerBuilder extends Component {
    state = {
        showModal: false,
        blocking: false
    };

    componentDidMount() {
        this.props.onInitIngridient();
    };

    modalOpenHandler = () => {
        this.setState({ showModal: true });
    };
    modalCloseHandler = () => {
        this.setState({ showModal: false });
    };

    checkOutHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    loginAndProceedToCheckout = () => {
        this.props.onBuildingBurger();
        this.props.history.push('/auth');
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let fullBurger = null;
        if (this.props.error) {
            fullBurger = "Failed to load burger ingridients";
        } else {
            fullBurger = (
                <Aux>
                    <Burger ingridients={this.props.ings} />
                    <BlockUi tag="div" blocking={this.state.blocking}>
                        <BuildControls ingridientAdded={this.props.onIngridientAdd}
                            ingridientRemoved={this.props.onIngridientRemove}
                            disabled={disabledInfo} price={this.props.price} />
                        {this.props.authenticated ? <Button bsStyle="primary" onClick={this.modalOpenHandler} disabled={this.props.ings && this.props.ings.meat === 0}>Order Now!</Button>
                            : <Button bsStyle="primary" onClick={this.loginAndProceedToCheckout} disabled={this.props.ings && this.props.ings.meat === 0}>Login to Order Now!</Button>}
                    </BlockUi>
                </Aux>
            );
        }
        return (
            <Aux>
                <Modal show={this.state.showModal} onHide={this.modalCloseHandler}>
                    <BlockUi blocking={this.props.blocking}>
                        <Modal.Header closeButton>
                            <Modal.Title>Your Order Summary</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <OrderSummry ingridients={this.props.ings} />
                            <p><strong>Total price: {this.props.price}</strong></p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button bsStyle="success" onClick={this.checkOutHandler}>Checkout</Button>
                            <Button bsStyle="danger" onClick={this.modalCloseHandler}>Cancel</Button>
                        </Modal.Footer>
                    </BlockUi>
                </Modal>

                <BlockUi blocking={this.state.blocking}>
                    {fullBurger}
                </BlockUi>
            </Aux>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        buidling: state.burgerBuilder.buidling,
        authenticated: state.auth.token ? true : false
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngridientAdd: (ingName) => {
            return dispatch(burgerBuilderActions.addIngridient(ingName));
        },
        onIngridientRemove: (ingName) => {
            return dispatch(burgerBuilderActions.removeIngridient(ingName));
        },
        onInitIngridient: () => {
            return dispatch(burgerBuilderActions.initIngridients())
        },
        onInitPurchase: () => {
            return dispatch(burgerBuilderActions.initPurchase());
        },
        onBuildingBurger: () => {
            return dispatch(burgerBuilderActions.buildingBurger());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);