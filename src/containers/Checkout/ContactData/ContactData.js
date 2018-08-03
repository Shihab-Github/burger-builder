import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Aux from '../../../hoc/Aux';
import BlockUi from 'react-block-ui';
import Input from '../../../components/UI/Input/Input';
import * as orderActions from '../../../store/actions/exportedActions';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name',
                    label: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email',
                    label: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                    label: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            zipcode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code',
                    label: 'Zipcode'
                },
                value: '',
                validation: {
                    required: true,
                    maxlength: 5 
                },
                valid: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your country',
                    label: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ],
                    label: 'Select Delivery Method'
                },
                valid: true,
                value: 'fastest'
            },
        },
        formIsValid: false,
        blocking: false
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value !== '';
        }
        if(rules.maxlength){
            isValid = isValid && value.length <= 5;
        }
        return isValid;
    };

    orderHandler = () => {
        var contact = {
            name: this.state.orderForm.name.value,
            email: this.state.orderForm.email.value,
            street: this.state.orderForm.street.value,
            zipcode: this.state.orderForm.zipcode.value,
            country: this.state.orderForm.country.value,
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        };
        var order = {
            ingridients: this.props.ings,
            totalPrice: this.props.price,
            contact: contact
        };
        this.props.onPurchaseBurger(order, this.props.token);
    };

    valueChangedHandler = (event, formElementIdentifier) => {
        let updatedOrderForm = JSON.parse(JSON.stringify(this.state.orderForm));
        updatedOrderForm[formElementIdentifier].value = event.target.value;
        let element = updatedOrderForm[formElementIdentifier];
        if(element.validation){
            element.valid = this.checkValidity(event.target.value, element.validation);
        }
        let formIsValid = true;
        for (const key in updatedOrderForm) {
           formIsValid = updatedOrderForm[key].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    };

    render() {
        let purchasedRedirect = null;
        if(this.props.purchased){
            purchasedRedirect = <Redirect to="/" />
        }

        let elementsArray =[];
        let formElements = [];
        for (const key in this.state.orderForm) {
            elementsArray.push({
                id: key,
                property: this.state.orderForm[key]
            });
        }

        for (let i = 0; i < elementsArray.length; i++) {
            const element = <Input key={elementsArray[i].id} 
                            elementType={ elementsArray[i].property.elementType } 
                            elementConfig={elementsArray[i].property.elementConfig} 
                            value={elementsArray[i].property.value}
                            changed={(event) => this.valueChangedHandler(event, elementsArray[i].id)} />
            formElements.push(element);
        }

        let confirmOrder = (
            <button disabled={!this.state.formIsValid} 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={this.orderHandler}>Confirm Order</button>
        );

        return (
            <Aux>
                {purchasedRedirect}
                <div className="panel panel-default row">
                    <div className="panel-body">
                        <h4>Enter your contact details</h4>
                        <BlockUi blocking={this.props.blocking}>
                            {formElements}
                            {this.props.token ? confirmOrder : null}
                        </BlockUi>
                    </div>
                </div>
            </Aux>
        )
    };
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingridients,
        price: state.burgerBuilder.totalPrice,
        blocking: state.order.blocking,
        purchased: state.order.purchased,
        token: state.auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onPurchaseBurger: (orderData, token) => {
            dispatch(orderActions.purchaseBurger(orderData, token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);