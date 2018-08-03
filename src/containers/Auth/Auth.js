import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import BlockUi from 'react-block-ui';
import * as exportedActions from '../../store/actions/exportedActions';
import { connect } from 'react-redux';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address',
                    label: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                errorMessage: ''
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                    label: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7
                },
                valid: false,
                errorMessage: ''
            }
        },
        formIsValid: false,
        blocking: false,
        accountExists: false,
        formText: 'Already have an account ?'
    };

    componentDidMount(){
        console.log('[Auth.js Mounted]');
    };

    componentWillUnmount(){
        console.log('[Auth.js un-mounted]');
    };

    validateEmail = (email) => { 
        var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
        return re.test(email);
    };

    checkValidity = (value, rules) => {
        let isValid = true;
        if(rules.required){
            isValid = value !== '';
        }
        if(rules.isEmail){
            let isValidEmail = this.validateEmail(value);
            isValid = isValid && isValidEmail;
        }
        if(rules.minLength){
            isValid = isValid && value.trim().length >= 6;
        }
        return isValid;
    };

    valueChangedHandler = (event, formElementIdentifier) => {
        let updatedControls = JSON.parse(JSON.stringify(this.state.controls));
        updatedControls[formElementIdentifier].value = event.target.value;
        let element = updatedControls[formElementIdentifier];
        if(element.validation){
            element.valid = this.checkValidity(event.target.value, element.validation);
        }
        let formIsValid = true;
        for (const key in updatedControls) {
           formIsValid = updatedControls[key].valid && formIsValid;
        }
        console.log("form valid: ", formIsValid);
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    };

    switchAuthForm = () => {
        if(this.state.accountExists){
            this.setState({accountExists: false, formText: 'Already have an account ?'});
        }else{
            this.setState({accountExists: true, formText: 'Don/t have an account ?' });
        }
    };

    authUser = () => {
        this.props.auth(this.state.controls.email.value, this.state.controls.password.value, 'login');
    };  

    render(){
        let elementsArray =[];
        let formElements = [];
        for (const key in this.state.controls) {
            elementsArray.push({
                id: key,
                property: this.state.controls[key]
            });
        }

        for (let i = 0; i < elementsArray.length; i++) {
            const element = <Input key={elementsArray[i].id} 
                            elementType={ elementsArray[i].property.elementType } 
                            elementConfig={elementsArray[i].property.elementConfig} 
                            rules={elementsArray[i].property.validation}
                            valid={elementsArray[i].property.valid}
                            value={elementsArray[i].property.value}
                            changed={(event) => this.valueChangedHandler(event, elementsArray[i].id)} />
            formElements.push(element);
        }
        let errorMessage = null, authRedirect = null;
        if(this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }

        if(this.props.token && !this.props.building){
            authRedirect = <Redirect to="/" />
        }

        if(this.props.token && this.props.building){
            authRedirect = <Redirect to="/checkout" />
        }


        return (
            <Aux>
                {authRedirect}
                <div className="panel panel-default row">
                    <div className="panel-body">
                        {errorMessage}
                        <h3>{this.state.accountExists ? 'Login' : 'Sign up'}</h3>
                        <BlockUi blocking={this.props.blocking}>
                            <form noValidate>
                                {formElements}
                                <button disabled={!this.state.formIsValid} type="button" className="btn btn-primary" onClick={() => this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.accountExists)}>{this.state.accountExists ? 'Login' : 'Sign-up'}</button>
                            </form>
                            <hr />
                            <p>{this.state.formText}</p> <button onClick={this.switchAuthForm} className="btn btn-primary">Switch to {!this.state.accountExists ? 'Login' : 'Sign-up'}</button>
                        </BlockUi>
                    </div>
                </div>
            </Aux>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        blocking: state.auth.blocking,
        error: state.auth.error,
        token: state.auth.token,
        building: state.burgerBuilder.building
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, isLogin) => { 
            dispatch(exportedActions.auth(email, password, isLogin));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
